import { NestFactory } from '@nestjs/core';
import { ConsumerModule } from './consumer.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';


async function bootstrap() {


 const app = await NestFactory.create(ConsumerModule);

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(ConsumerModule, {
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://localhost:5672'],
  //     queue: 'cats_queue',
  //     queueOptions: {
  //       durable: false
  //     },
  //   },
  // });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'anubhav_queue_two',
      queueOptions: {
        durable: false
      },
    },
  });

  // Use the MicroservicesModule to connect to RabbitMQ
 // app.connectMicroservice(AppModule);

  // Start the application
  await app.startAllMicroservices()

  await app.listen(3001);
}
bootstrap();
