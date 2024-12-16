/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class CustomErrorHandlerService {
  handleError(error: Error): void {
    console.error(error);
    if (error instanceof InternalServerErrorException) {
      // Handle internal server errors
      // For example, log the error to a database
      this.logErrorToDatabase(error);
    }
  }

  private logErrorToDatabase(_error: Error): void {
    // Log the error to a database
    // For example, using a database library like TypeORM
    // You can also add additional information to the log entry, such as the user ID or IP address
    // Insert the log entry into the database
  }
}
