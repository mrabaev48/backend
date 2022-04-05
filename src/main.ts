import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const PORT = process.env.PORT || 9666;
    app.enableCors();
    await app.listen(PORT, () => {
      console.log(`Server started on port = ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
