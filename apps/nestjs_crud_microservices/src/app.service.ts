import { Injectable } from '@nestjs/common';
import { MessagePattern, ClientProxy, ClientProxyFactory,Transport } from '@nestjs/microservices';


@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }

  postData(data:any) {
    console.log('post data from producer',data)
  }


  sendMsgData() {
    //asume get data from db db.getData()

   const data = {
      name:'Abc',
      addr:'Kamasin'
    }
    
    console.log('get data message pattern example ')
    return data
  }


}
