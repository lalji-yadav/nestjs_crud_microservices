import { Controller, Get } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { EventPattern, MessagePattern, Ctx, RmqContext } from '@nestjs/microservices';

@Controller()
export class ConsumerController {
  constructor(private readonly consumerService: ConsumerService) {}

  @Get()
  getHello(): string {
    console.log("consumer controller")
    return this.consumerService.getHello();
  }

  @EventPattern('getDataFromProducerData') // pattern name
	async handleOrderCreated(data: Record<string, unknown>) {
		console.log('getDataFromProducerData created', data);
		// Send mail to users
	}

  @MessagePattern('anubhav_queue_two') // 'write queue name here
  async getDatafromProducerMessagePattern(data: Record<string, unknown>, @Ctx() context: RmqContext) {

    console.log(`Pattern: ${context.getPattern()}`);
    console.log("context.getMessage", context.getMessage());
    console.log("context.getChannelRef", context.getChannelRef());

    console.log('getDatafromProducerMessagePattern your_message_pattern', data, context)

  }

}
