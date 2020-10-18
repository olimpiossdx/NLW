import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErros {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {

  if (error instanceof ValidationError) {
    let errors: ValidationErros = {};
    error.inner.forEach(error => {
      errors[error.path] = error.errors;
    });

    return response.status(400).json(errors);
  }

  console.error('-----------------------------');
  console.error(`error ${Date.now()}\n`, error);
  console.error('-----------------------------\n');

  return response.status(500).json({ message: 'Interal server error' });
}

export default errorHandler;