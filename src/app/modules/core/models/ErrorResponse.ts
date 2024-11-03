export class ErrorResponse {
  constructor(
    public status: string,
    public messages: string[]
  ) {}

  public static isErrorResponse(err: unknown): err is ErrorResponse {
    return (
      typeof err === 'object' &&
      err !== null &&
      'status' in err &&
      'messages' in err &&
      typeof err.status === 'string' &&
      Array.isArray(err.messages) &&
      err.messages.every((msg: unknown) => typeof msg === 'string')
    );
  }
}
