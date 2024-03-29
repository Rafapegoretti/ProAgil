import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './Eventos.component.html',
  styleUrls: ['./Eventos.component.css']
})
export class EventosComponent implements OnInit {

  _filtroLista: string;
  get filtroLista(): string{
    return this._filtroLista;
  }
  set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.FiltraEvento(this.filtroLista) : this.eventos;
  }

  eventosFiltrados: any = [];
  eventos: any = [];
  imagemLargura = 50;
  imagemMargin = 2;
  mostrarImagem = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEventos();
  }

  FiltraEvento(filtrarPor: string): any{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  alternarImagem(){
    this.mostrarImagem = !this.mostrarImagem;
  }

  getEventos(){
    this.http.get('http://localhost:5000/api/values').subscribe(response => {
       this.eventos = response;
      }, error =>{
        console.log(error);
      });
  }

}
