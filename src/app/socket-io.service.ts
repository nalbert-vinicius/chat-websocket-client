import { Injectable } from '@angular/core';
import { Message } from './interface/message';
import socketIO from 'socket.io-client';
import { Subject } from 'rxjs';
import { createOfflineCompileUrlResolver } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class SocketIoService {

  private url = 'http://localhost:5000';
  private socket = socketIO(this.url);
  private subMessages: Subject<Message> = new Subject<Message>(); // observable

  constructor() {
    //recebe as mensagens enviadas do servidor
    this.socket.on('message', (m: Message) =>{
      this.subMessages.next(m);
    })
  }

  criarSala(sala){
    return new Promise((resolve, reject) =>{
      this.socket.emit('criarSala', sala)
    })
  }

  uuidv4() {
    return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  //envio de mensagens para servidor
  enviarMensagem(msg: Message){
    this.socket.emit('message', msg);  
  }

  entrarSala(room){
    return new Promise((resolve, reject) =>{
      this.socket.emit('entrarSala', room)
    })
  }


  mensagens(){
    return this.subMessages.asObservable();
  }

}
