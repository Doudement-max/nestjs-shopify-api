import {ArgumentsHost, Catch, ExceptionFilter,} from '@nestjs/common';
import {ZodError} from "zod";
@Catch(ZodError)
export class ZodErrorFilter<T extends ZodError> implements ExceptionFilter {
    catch(exception: T, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const status = 400;
        response.status(status).json({
            error: 'Bad Request',
            message: exception.errors.map(err => err.message).join(', '),
            statusCode: status,
        });
    }
}