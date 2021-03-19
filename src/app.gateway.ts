import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(public readonly jwtService: JwtService) {}

  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('joinRoom')
  joinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ): void {
    this.logger.log(`Client: [${client.id}] join room: [${roomId}]`);
    client.join(roomId);
  }

  afterInit(server: Server) {
    this.logger.log('Init websocket');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: [${client.id}]`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake?.query?.token;
    if (!token) {
      this.logger.log(`No token, client will be disconnected`);
      client.disconnect(true);
    } else {
      try {
        const verify = this.jwtService.verify(
          token.replace('Bearer ', '').trim(),
        );
        this.logger.log(`Client connected: [${client.id}]`);
        client.join(verify.id);
      } catch (e) {
        this.logger.log(`Invalid token: [${token}]`);
        client.disconnect(true);
      }
    }
  }
}
