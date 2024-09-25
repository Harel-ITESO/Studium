import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';

/** Handle prisma errors globally */
@Catch(PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
    catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
        console.error(exception.message);

        const context = host.switchToHttp();
        const response = context.getResponse<Response>();
        const message = exception.message.replace('/\n/g', '');

        switch (exception.code) {
            /** Unique constraint violated */
            case 'P2002':
                const status = HttpStatus.BAD_REQUEST;
                response.status(status).json({
                    statusCode: status,
                    message: message,
                });
                break;
        }

        super.catch(exception, host);
    }
}
