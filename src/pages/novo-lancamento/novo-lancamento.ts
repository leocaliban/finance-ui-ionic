import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../../services/domain/categoria.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@IonicPage()
@Component({
  selector: 'page-novo-lancamento',
  templateUrl: 'novo-lancamento.html',
})
export class NovoLancamentoPage {

  formGroup: FormGroup;
  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];

  pessoas = [
    { label: 'Aline Silva', value: '1' },
    { label: 'Nina Myers', value: '2' },
    { label: 'Kim Bauer', value: '3' }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtlr: AlertController,
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService) {

    this.formGroup = this.formBuilder.group({//Definir as validações dos campos do form
      tipo: ['', [Validators.required]],
      vencimento: ['', [Validators.required]],
      descricao: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      valor: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      pessoa: ['', [Validators.required]]
    });
  }

  ionViewDidLoad() {
    this.carregarCategorias();
  }

  carregarCategorias() {
    return this.categoriaService.pesquisarTodos()
      .then(response => {
        this.categorias = response.map(elemento => {
          return { label: elemento.nome, value: elemento.codigo };
        });
      })
      // this.categorias = response.map(c => ({label:c.nome, value: c.codigo}))
      .catch(erro => this.errorHandler.handle(erro));
  }

}
