export class ResponseDto<T> {
    success: boolean;
    data: T;
    message: string;
    errors: any;
    statusCode: number;
  
    constructor(success: boolean, data: T, message: string, statusCode: number, errors: any = null) {
      this.success = success;
      this.data = data;
      this.message = message;
      this.statusCode = statusCode;
      this.errors = errors;
    }
  }