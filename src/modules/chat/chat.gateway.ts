import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';

import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): WsResponse<any> {
    console.log('data: ', data);
    return { event: 'events', data: data };
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<WsResponse<number>> {
    return { event: 'identity', data };
  }
}
