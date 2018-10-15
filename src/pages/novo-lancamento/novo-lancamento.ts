import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { CategoriaService } from '../../services/domain/categoria.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { PessoaService } from '../../services/domain/pessoa.service';
import { LancamentoService } from '../../services/domain/lancamento.service';
import { Lancamento } from '../../models/lancamento';

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
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtlr: AlertController,
    private categoriaService: CategoriaService,
    private errorHandler: ErrorHandlerService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService) {
  }

  ionViewDidLoad() {
    const codigoLancamento = this.navParams.get('codigo');
    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }

    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar() {
    this.lancamentoService.salvar(this.lancamento)
      .then(() => {
        this.showInsertOk();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(response => {
        this.lancamento = response;
      }).catch(erro => this.errorHandler.handle(erro));
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

  carregarPessoas() {
    return this.pessoaService.pesquisarTodos()
      .then(response => {
        this.pessoas = response.map(elemento => {
          return { label: elemento.nome, value: elemento.codigo };
        });
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  showInsertOk() {
    let alert = this.alertCtlr.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {//função anônima
            this.navCtrl.pop();//desempilhar a página
          }
        }
      ]
    });
    alert.present();
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

}
