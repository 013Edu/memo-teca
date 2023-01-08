import { EditarPensamentosComponent } from './components/pensamentos/editar-pensamentos/editar-pensamentos.component';
import { ExcluirPensamentosComponent } from './components/pensamentos/excluir-pensamentos/excluir-pensamentos.component';
import { ListarPensamentoComponent } from './components/pensamentos/listar-pensamento/listar-pensamento.component';
import { CriarPensamentosComponent } from './components/pensamentos/criar-pensamentos/criar-pensamentos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'listarPensamento', pathMatch:'full'},
  { path: 'criarPensamento', component: CriarPensamentosComponent },
  { path: 'listarPensamento', component: ListarPensamentoComponent },
  { path: 'pensamentos/excluirPensamento/:id', component: ExcluirPensamentosComponent },
  { path: 'pensamentos/editarPensamento/:id', component: EditarPensamentosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
