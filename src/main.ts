import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // const { apiReference } = await import('@scalar/nestjs-api-reference');

  app.use(
    '/api',
    apiReference({
      content: document,
      title: document.info.title,
      layout: 'modern',
      theme: 'alternate',
      defaultOpenAllTags: true,
      defaultHttpClient: {
        targetKey: 'node',
        clientKey: 'fetch',
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
