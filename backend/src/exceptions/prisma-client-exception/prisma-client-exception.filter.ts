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

        const badRequest = HttpStatus.BAD_REQUEST;
        response.status(badRequest).json({
            statusCode: badRequest,
            message,
        });

        super.catch(exception, host);
    }
}
