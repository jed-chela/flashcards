import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3001); // Specify the port for your app to listen on
  
  const microservice = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://dggxuetr:wvA14D4L_6zpwB3o6wIOmdyOwXjE2Px2@albatross.rmq.cloudamqp.com/dggxuetr'],
      queue: 'flashcards_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.startAllMicroservices(); // Start listening to microservices

  console.log('App and microservices are running');
}
bootstrap();

