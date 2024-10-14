import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ZodValidationPipe } from './pipes/zod-validation.pipe';
import { createOrderSchema } from './order/dto/order.dto';
import { ZodErrorFilter } from './zodfilter/zod.error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); 
  app.useGlobalFilters(new ZodErrorFilter());
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
