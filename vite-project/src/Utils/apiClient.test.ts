import { apiRequest } from './apiClient';

const jsonOkResponse = (body: unknown = {}) => ({
  ok: true,
  status: 200,
  json: async () => body,
});

describe('apiClient / apiRequest', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubEnv('VITE_ENDERECO_API', 'https://api.example.com');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it('builds the URL as `${VITE_ENDERECO_API}${path}`', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonOkResponse({ foo: 'bar' }));
    vi.stubGlobal('fetch', fetchMock);

    await apiRequest('/usuarios');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe('https://api.example.com/usuarios');
  });

  it('attaches Authorization: Bearer <token> when a token exists in localStorage', async () => {
    localStorage.setItem('token', JSON.stringify('my-token'));
    const fetchMock = vi.fn().mockResolvedValue(jsonOkResponse());
    vi.stubGlobal('fetch', fetchMock);

    await apiRequest('/usuarios');

    const init = fetchMock.mock.calls[0][1] as RequestInit;
    const headers = init.headers as Record<string, string>;
    expect(headers.Authorization).toBe('Bearer my-token');
  });

  it('does not attach an Authorization header when no token is present', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonOkResponse());
    vi.stubGlobal('fetch', fetchMock);

    await apiRequest('/usuarios');

    const init = fetchMock.mock.calls[0][1] as RequestInit;
    const headers = init.headers as Record<string, string>;
    expect(headers.Authorization).toBeUndefined();
  });

  it('surfaces a non-ok response and the parsed data via { response, data }', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ message: 'x' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const { response, data } = await apiRequest('/usuarios');

    expect(response.ok).toBe(false);
    expect(response.status).toBe(401);
    expect(data).toEqual({ message: 'x' });
  });
});
