import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
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
  private sub: Subscription;
  private Lista: Subscription;

  @ViewChild(MatList, {read: ElementRef, static: true}) List: ElementRef
  @ViewChildren(MatListItem) listItems: QueryList<MatListItem>

  constructor(
    private socketService: SocketIoService
  ) { }

  ngAfterViewInit(){
    this.Lista = this.listItems.changes.subscribe((event) =>{
      this.List.nativeElement.scrollTop = this.List.nativeElement.scrollHeight
    })
  }

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
    this.Lista.unsubscribe();
  }
}
