import { Component } from '@angular/core';
import { Message } from './interface/message';
import { SocketIoService } from './socket-io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nickName: string;
  message: string

  constructor(
    private socketService: SocketIoService
  ) { }

  ngOnInit(){
    this.socketService.mensagens().subscribe((msg: Message) =>{
      console.log(msg);
    })
  }

  enviar(){
    this.socketService.enviarMensagem({
      from: this.nickName,
      message: this.message
    });
    this.message = '';
  }
}
