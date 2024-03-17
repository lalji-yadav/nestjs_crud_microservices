import { Controller, Get, Post,Body, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject('CRUD_SERVICE') private client: ClientProxy) {}

  @Get()
  getHello(): string {
    console.log("data")
    return this.appService.getHello();
  }

  @Post('/sendData')
  sendData(@Body() data){

    console.log('data producer', data)

    this.client.emit('getDataFromProducerData', data); // pattern name
    this.appService.postData({ message: 'data has been send to consumer' });

    return data
  }

  @Get('/sendMsgData')
  async sendMsgData(@Body() newData) {
   // this.appService.sendMsgData()

   console.log("new data", newData)
   return this.client.send('anubhav_queue_two', newData) // write queue name here
   

  // return 'data get successfullly'

  }
  
}
