import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const allowedDomains = process.env.CORS_ALLOWED_DOMAINS;
    const port = process.env.BACKEND_PORT;

    if (!allowedDomains || !port) {
      throw new Error(
        'Environment variables CORS_ALLOWED_DOMAINS and BACKEND_PORT must be defined',
      );
    }

    const allowedDomainsArray = allowedDomains
      .split(',')
      .map((domain) => domain.trim());

    const app = await NestFactory.create(AppModule);

    app.enableCors({
      origin: function (origin, callback) {
        if (!origin || allowedDomainsArray.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      credentials: true,
      methods: ['GET', 'PUT'],
    });

    // Swagger
    const config = new DocumentBuilder()
      .setTitle('Countries API')
      .setDescription('The Countries API API')
      .setVersion('1.0')
      .addTag('Countries API')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document, {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    });

    await app.listen(port, () =>
      console.log(`Server started on port = ${port}`),
    );
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

bootstrap();
