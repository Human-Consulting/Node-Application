/**
 * Shared response/DTO shapes for the HumanCore API.
 *
 * These are intentionally loose: only fields observed being read/written by
 * the frontend are declared explicitly. An index signature is kept on each
 * DTO so that fields present in the real backend response but not (yet)
 * consumed here don't produce false "excess property" friction — this
 * avoids guessing at fields that aren't verifiable from usage alone.
 */

export interface UsuarioDto {
  idUsuario: number;
  nome?: string;
  email?: string;
  cargo?: string;
  cores?: string;
  senha?: string;
  idEmpresa?: number;
  projetosVinculados?: number[];
  [key: string]: unknown;
}

export interface EmpresaDto {
  idEmpresa: number;
  nome?: string;
  [key: string]: unknown;
}

export interface ProjetoDto {
  idProjeto: number;
  titulo?: string;
  nome?: string;
  descricao?: string;
  progresso?: number;
  idEmpresa?: number;
  [key: string]: unknown;
}

export interface SalaDto {
  idSala: number;
  nome?: string;
  idEmpresa?: number;
  [key: string]: unknown;
}

export interface SprintDto {
  idSprint: number;
  nome?: string;
  idProjeto?: number;
  [key: string]: unknown;
}

export interface TarefaDto {
  idTarefa?: number;
  idSprint?: number;
  comImpedimento?: boolean;
  comentario?: string;
  [key: string]: unknown;
}

export interface InvestimentoDto {
  idInvestimento?: number;
  [key: string]: unknown;
}

export interface MensagemDto {
  idMensagem?: number;
  idSala?: number;
  [key: string]: unknown;
}

export interface ApiMessageResponse {
  message?: string;
  [key: string]: unknown;
}

/** Generic paginated envelope used by several list endpoints (Spring Page<T>-like). */
export interface PagedResponse<T> {
  content?: T[];
  totalElements?: number;
  totalPages?: number;
  number?: number;
  size?: number;
  [key: string]: unknown;
}
