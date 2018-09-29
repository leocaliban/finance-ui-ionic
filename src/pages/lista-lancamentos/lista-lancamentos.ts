import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { LancamentoService, LancamentoFiltro } from '../../services/domain/lancamento.service';


@IonicPage()
@Component({
  selector: 'page-lista-lancamentos',
  templateUrl: 'lista-lancamentos.html',
})
export class ListaLancamentosPage {

  filtro: LancamentoFiltro;
  lancamentos = [] = [];
  loader: any;

  pagina: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private lancamentoService: LancamentoService,
    public loadingController: LoadingController,
    private toastCtrl: ToastController) {

    this.filtro = this.navParams.get('filtro');
  }

  ionViewDidLoad() {
    this.loader = this.loading();
    this.pesquisar();
  }


  pesquisar() {
    this.lancamentoService.pesquisar(this.filtro, this.pagina, 5).then(lancamentos => {
      this.lancamentos = this.lancamentos.concat(lancamentos);
      this.loader.dismiss();
    });
  }

  excluir(lancamento: any) {
    this.loader = this.loading();
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        this.mensagemSucesso();
        this.pagina = 0;
        this.lancamentos = [];
        this.pesquisar();

      });
  }

  /**
   * Configura o refresh da lista
   * @param refresher ionRefresh
   */
  atualizar(refresher) {
    setTimeout(() => {
      this.pesquisar();
      refresher.complete();
    }, 1500);
  }

  /**
   * Configura o loading ao entrar na página
   */
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

  /**
   * Configura infiniteScroll para paginação
   * @param infiniteScroll infiniteScroll
   */
  doInfinite(infiniteScroll) {
    this.pagina++;
    this.pesquisar();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

  mensagemSucesso() {
    let toast = this.toastCtrl.create({
      message: 'Lançamento excluído com sucesso!',
      duration: 3000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }

  /**
   * Navega para a página NovoLancamentoPage
   */
  public criar() {
    this.navCtrl.push('NovoLancamentoPage');
  }

  getCorValor(evento: any) {
    if (evento === 'DESPESA') {
      return 'red';
    } else {
      return 'blue';
    }
  }


}
