import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './exceptions/prisma-client-exception/prisma-client-exception.filter';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });

    // CORS
    app.enableCors({
        credentials: true,
        origin: 'http://localhost:8080',
        methods: 'GET, POST, PUT, PATCH, DELETE',
    });

    // PIPES
    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, transform: true }),
    );

    // SWAGGWER
    const config = new DocumentBuilder()
        .setTitle('Studium API')
        .setDescription('API used by Studium app')
        .setVersion('1.0')
        .addCookieAuth('connect.sid')
        .addServer('http://localhost:4000/api/studium', 'Development')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);

    app.setGlobalPrefix('api/studium');
    app.use(cookieParser(process.env.COOKIE_SECRET));

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
    await app.listen(process.env.PORT);
}
bootstrap();
