import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from './interface/message';
import { SocketIoService } from './socket-io.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nickName: string;
  message: string;
  mensagens: Message[] = [];
  private sub: Subscription

  constructor(
    private socketService: SocketIoService
  ) { }

  ngOnInit(){
    this.sub = this.socketService.mensagens().subscribe((msg: Message) =>{
      console.log(msg);
      this.mensagens.push(msg);
    })
  }

  enviar(){
    this.socketService.enviarMensagem({
      nome: this.nickName,
      message: this.message
    });
    this.message = '';
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
