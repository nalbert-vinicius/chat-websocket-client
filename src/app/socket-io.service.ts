import { Injectable } from '@angular/core';
import { Message } from './interface/message';
import socketIO from 'socket.io-client';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  private url = 'http://localhost:5000';
  private t = '';
  private socket = socketIO(this.url);
  private subMessages: Subject<Message> = new Subject<Message>(); // observable

  constructor() {
    //recebe as mensagens enviadas do servidor
    this.socket.on('message', (m: Message) =>{
      this.subMessages.next(m);
    })
  }

  //envio de mensagens para servidor
  enviarMensagem(msg: Message){
    this.socket.emit('message', msg);  
  }

  mensagens(){
    return this.subMessages.asObservable();
  }

}
