import { PensamentoService } from './pensamento.service';
import { Pensamento } from './../../../pensamento';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent {
  @Input() pensamento: Pensamento = {
    id: 1,
    conteudo: 'I love Angular',
    autoria: 'Edu',
    modelo: 'modelo2',
    favorito: false
}

@Input() listaFavoritos: Pensamento[] = []

  constructor(private service: PensamentoService) {}

  larguraPensamento(): string {
    if(this.pensamento.conteudo.length >= 256){
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }

  mudarIconeFavorito(){
    if(this.pensamento.favorito == false){
      return 'inativo'
    }
    return 'ativo'
  }

  mudarFavorito(){
    this.service.mudarFavorito(this.pensamento).subscribe(() => {
      this.listaFavoritos.splice(this.listaFavoritos.indexOf(this.pensamento), 1)
    })
  }

}
