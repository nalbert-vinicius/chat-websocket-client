import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Message } from '../interface/message';
import { SocketIoService } from '../socket-io.service';
import { MatList, MatListItem } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {

  nickName: string;
  message: string;
  mensagens: Message[] = [];
  private sub: Subscription;
  private Lista: Subscription;

  @ViewChild(MatList, {read: ElementRef, static: true}) List: ElementRef
  @ViewChildren(MatListItem) listItems: QueryList<MatListItem>


  constructor(
    private socketService: SocketIoService,
    private routeParam: ActivatedRoute
  ) { }

  ngAfterViewInit(){
    this.Lista = this.listItems.changes.subscribe((event) =>{
      this.List.nativeElement.scrollTop = this.List.nativeElement.scrollHeight
    })
  }

  ngOnInit(){
    this.routeParam.params.subscribe((data: any) =>{
      console.log(data);
    })
    this.sub = this.socketService.mensagens().subscribe((msg: Message) =>{
      console.log(msg);
      this.mensagens.push(msg);
    })
  }

  
  enviar(){
    this.socketService.enviarMensagem({
      nome: this.nickName,
      message: this.message,
      nomeSala: ''
    });
    this.message = '';
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
    this.Lista.unsubscribe();
  }

}
