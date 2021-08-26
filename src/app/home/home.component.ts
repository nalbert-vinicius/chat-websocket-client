import { Component, OnInit } from '@angular/core';
import { SocketIoService } from '../socket-io.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private socketIoService: SocketIoService,
    private formBuilder: FormBuilder,
    private route: Router,
  ) { }

  formulario: FormGroup = this.formBuilder.group({
    nomeUsuario: [''],
    nomeSala: ['']
  })

  formulario2: FormGroup = this.formBuilder.group({
    nameUser: [''],
    nameRoom: ['']
  })

  ngOnInit(): void {
  }

  criarSala(){
    var a = {
      nomeUsuario: this.formulario.value.nomeUsuario,
      nomeSala: this.formulario.value.nomeSala
    }
    this.socketIoService.criarSala(a)
    this.route.navigate([`room/${this.formulario.value.nomeSala}`])
  }



  entrarSala(){
    var a = {
      nomeUsuario: this.formulario2.value.nameUser,
      nomeSala: this.formulario2.value.nameRoom
    }
    this.socketIoService.entrarSala(a)
    this.route.navigate([`room/${this.formulario2.value.nameRoom}`]);
  }


    uuid() {
    return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
