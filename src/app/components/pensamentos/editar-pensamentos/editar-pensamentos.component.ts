import { Router, ActivatedRoute } from '@angular/router';
import { Pensamento } from './../../../pensamento';
import { Component } from '@angular/core';
import { PensamentoService } from '../pensamento/pensamento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-pensamentos',
  templateUrl: './editar-pensamentos.component.html',
  styleUrls: ['./editar-pensamentos.component.css']
})
export class EditarPensamentosComponent {

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: 'modelo1',
    favorito: false
  }

  formulario!: FormGroup

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
    ) {}

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.formulario = this.formBuilder.group({
        id: [pensamento.id],
        conteudo: [pensamento.conteudo, Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/)
        ])],
        autoria: [pensamento.autoria, Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])],
        modelo: [pensamento.modelo],
        favorito: [pensamento.favorito]
      })
    })
  }


  cancelarPensamento(){
    this.router.navigate(['/listarPensamento'])
  }

  editarPensamento(){
    this.service.editar(this.formulario.value).subscribe(() => {
      this.router.navigate(['/listarPensamento'])
    })
  }


  criarPensamento(){
    if(this.formulario.valid){
     this.service.criar(this.formulario.value).subscribe(() => {
       this.router.navigate(['/listarPensamento'])
     })
    }
   }

   habilitarBotao(): string {
     if(this.formulario.valid){
       return 'botao'
     }else{
       return 'botao__desabilitado'
     }
   }


}

