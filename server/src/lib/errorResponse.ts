interface Error {
  status?: number;
  message: string;
}

class ErrorResponse extends Error {
  constructor(message: string, statusCode: number) {
    super(message);
    this.status = statusCode;
  }
}

module.exports = ErrorResponse;
