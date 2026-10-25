export type ErrorDetail = {
  field: string;
  message: string;
};

export class ResponseError extends Error {
  public status: number;
  public code: string;
  public details?: ErrorDetail[];

  constructor(
    status: number,
    code: string,
    message: string,
    details?: ErrorDetail[],
  ) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;

    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}
