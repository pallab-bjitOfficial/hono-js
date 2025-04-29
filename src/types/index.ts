export interface IError {
    cause?: any;
    code?: string;
    description?: string;
    errors?: any;
    isOperational?: boolean;
    message?: string;
    name?: string;
    stack?: string;
    status?: number;
}
