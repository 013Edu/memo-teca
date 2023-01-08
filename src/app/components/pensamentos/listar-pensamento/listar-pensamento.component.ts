import { Router } from '@angular/router';
import { PensamentoService } from './../pensamento/pensamento.service';
import { Pensamento } from './../../../pensamento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos: Pensamento[] = [
    {
      id: 1,
      conteudo: 'Teste',
      autoria: 'Teste',
      modelo: 'modelo1',
      favorito: false
    },

  ]

  filtro: string = ''
  titulo: string = 'Meu Mural'
  favoritos: boolean = false
  haMaisPensamentos: boolean = true
  paginaAtual: number = 1
  listaFavoritos: Pensamento[] = []

  constructor(private service: PensamentoService, private router: Router) {}

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe(listarPensamento => this.listaPensamentos = listarPensamento)
  }

  carregarMaisPensamentos(){
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos)
    .subscribe(listarPensamentos => {
      this.listaPensamentos.push(...listarPensamentos)
      if(!listarPensamentos.length){
        this.haMaisPensamentos = false
      }
    })
  }

  buscarPorPensamento(){
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
    .subscribe(listarPensamentos => {
      this.listaPensamentos = listarPensamentos
    })
  }

  buscarPorFavoritos(){
    this.titulo = 'Meus Favoritos'
    this.favoritos = true
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
    .subscribe(listarPensamentos => {
      this.listaPensamentos = listarPensamentos
      this.listaFavoritos = listarPensamentos
    })
  }

  voltarMeuMural(){
    this.favoritos = false
    this.paginaAtual = 1
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }

}
