import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PessoaFiltro, PessoaService } from '../../services/domain/pessoa.service';

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
    public loadingController: LoadingController) {

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

  public criar() {
    this.navCtrl.push('NovaPessoaPage');
  }

}
