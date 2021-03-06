import { Pessoa } from './../../../../finance-ui-material/src/app/core/domain/pessoa';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { PessoaFiltro, PessoaService } from '../../services/domain/pessoa.service';
import { ErrorHandlerService } from '../../services/error-handler.service';

@IonicPage()
@Component({
  selector: 'page-lista-pessoas',
  templateUrl: 'lista-pessoas.html',
})
export class ListaPessoasPage {

  filtro: PessoaFiltro;
  pessoas = [] = [];
  loader: any;
  pagina: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private pessoaService: PessoaService,
    public loadingController: LoadingController,
    private toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private errorHandler: ErrorHandlerService) {

    this.filtro = this.navParams.get('filtro');
  }

  ionViewDidLoad() {
    this.loader = this.loading();
    this.pesquisar();
  }

  pesquisar() {
    this.pessoaService.pesquisarPorNome(this.filtro, this.pagina, 5).then(response => {
      this.pessoas = this.pessoas.concat(response);
      this.loader.dismiss();
    })
      .catch(erro => {
        this.loader.dismiss(),
          this.errorHandler.handle(erro)
      });
  }

  excluir(pessoa: any) {
    this.loader = this.loading();
    this.pessoaService.excluir(pessoa.codigo)
      .then(() => {
        let mensagem = 'Pessoa excluída com sucesso!';
        this.mensagemSucesso(mensagem);
        this.pagina = 0;
        this.pessoas = [];
        this.pesquisar();
      })
      .catch(erro => {
        this.loader.dismiss(),
          this.errorHandler.handle(erro)
      });
  }

  mudarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.ativo = novoStatus;
        let mensagem = `Pessoa ${acao} com sucesso!`;
        this.mensagemSucesso(mensagem);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  confirmarExclusao(pessoa: any) {
    const confirm = this.alertCtrl.create({
      title: 'Confirmação',
      message: 'Tem certeza que deseja excluir?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.excluir(pessoa);
          }
        },
        {
          text: 'Não',
          handler: () => { }
        }
      ]
    });
    confirm.present();
  }

  atualizar(refresher) {
    setTimeout(() => {
      this.pagina = 0;
      this.pessoas = [];
      this.pesquisar();
      refresher.complete();
    }, 1500);
  }

  loading() {
    let loader = this.loadingController.create({
      spinner: 'hide',
      content:
        `
      <img src="assets/imgs/load.gif" alt="logo">
      `
    });
    loader.present();
    return loader;
  }

  doInfinite(infiniteScroll) {
    this.pagina++;
    this.pesquisar();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

  mensagemSucesso(mensagem: string) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.onDidDismiss(() => {
    });
    toast.present();
  }

  editarPessoa(pessoa: Pessoa) {
    const codigo = pessoa.codigo;
    this.navCtrl.push('NovaPessoaPage', { codigo: codigo });
  }

  public criar() {
    this.navCtrl.push('NovaPessoaPage');
  }

}
