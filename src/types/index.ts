export interface IError {
  description?: string;
  errors?: any;
  status?: number;
  isOperational?: boolean;
  name?: string;
  message?: string;
  stack?: string;
  code?: string;
  cause?: any;
}
