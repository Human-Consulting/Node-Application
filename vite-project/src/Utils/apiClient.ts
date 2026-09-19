export interface ApiRequestOptions extends Omit<RequestInit, 'body' | 'headers'> {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
}

export interface ApiResult<T = unknown> {
  response: Response;
  data: T | null;
}

const getToken = (): string | null => {
  try {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
  } catch {
    return null;
  }
};

const buildHeaders = (customHeaders: Record<string, string> = {}): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(customHeaders || {}),
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

export const apiRequest = async <T = unknown>(
  path: string,
  { method = 'GET', body, headers, ...options }: ApiRequestOptions = {}
): Promise<ApiResult<T>> => {
  const url = `${import.meta.env.VITE_ENDERECO_API}${path}`;

  const response = await fetch(url, {
    method,
    headers: buildHeaders(headers),
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  });

  let data: T | null = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  return { response, data };
};

export const apiRequestFormData = async <T = unknown>(
  path: string,
  formData: FormData,
  { method = 'POST', headers, ...options }: ApiRequestOptions = {}
): Promise<ApiResult<T>> => {
  const url = `${import.meta.env.VITE_ENDERECO_API}${path}`;
  const token = getToken();

  const response = await fetch(url, {
    method,
    headers: {
      ...(headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
    ...options,
  });

  let data: T | null = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  return { response, data };
};
