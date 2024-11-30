import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ZodErrorFilter } from './zodfilter/zod.error';
import { patchNestjsSwagger } from '@anatine/zod-nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurações globais
  app.useGlobalPipes(new ValidationPipe({ transform: true })); // Opção transform para transformar objetos automaticamente
  app.useGlobalFilters(new ZodErrorFilter());

  // Patching Swagger com Zod para integrar esquemas de validação
  patchNestjsSwagger();

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API Shopify')
    .setDescription('Documentação da API Shopify')
    .setVersion('1.0')
    .addTag('Customer')
    .addTag('Product')
    .addTag('Order')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
