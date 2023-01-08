import { Pensamento } from './../../../pensamento';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

   pagina: number = 1

  private readonly baseUrl = 'http://localhost:3000/pensamentos';

  constructor(private htpp: HttpClient ) { }

  listar(pagina: number, filtro: string, favoritos: boolean): Observable<Pensamento[]>{

    const itemLimitePorPagina = 6

    let params = new HttpParams()
    .set('_page', pagina)
    .set('_limit', itemLimitePorPagina)

    if(filtro.trim().length > 2){
      params = params.set('q', filtro)
    }

    if(favoritos){
      params = params.set('favorito', true)
    }

    return this.htpp.get<Pensamento[]>(this.baseUrl, {params})

  }

  listarPensamentosFavoritos2(pagina: number, filtro: string): Observable<Pensamento[]>{

    const itemLimitePorPagina = 6

    let params = new HttpParams()
    .set('_page', pagina)
    .set('_limit', itemLimitePorPagina)
    .set('favorito', false)

    if(filtro.trim().length > 2){
      params = params.set('q', filtro)
    }

    return this.htpp.get<Pensamento[]>(this.baseUrl, {params})

  }

  criar(pensamento: Pensamento): Observable<Pensamento>{
    return this.htpp.post<Pensamento>(this.baseUrl, pensamento)
  }

  editar(pensamento: Pensamento): Observable<Pensamento>{
    const url = `${this.baseUrl}/${pensamento.id}`
    return this.htpp.put<Pensamento>(url, pensamento)
  }

  mudarFavorito(pensamento: Pensamento): Observable<Pensamento>{
    pensamento.favorito = !pensamento.favorito
    return this.editar(pensamento)
  }

  excluir(id: number): Observable<Pensamento>{
    const url = `${this.baseUrl}/${id}`
    return this.htpp.delete<Pensamento>(url)
  }

  buscarPorId(id: number): Observable<Pensamento>{
    const url = `${this.baseUrl}/${id}`
    return this.htpp.get<Pensamento>(url)
  }

}
