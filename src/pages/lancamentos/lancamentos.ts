import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lancamentos',
  templateUrl: 'lancamentos.html',
})
export class LancamentosPage {

  descricao: string;
  lancamentos =[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LancamentosPage');
  }

  public pesquisar() {
    this.navCtrl.push('ListaLancamentosPage', { descricao: this.descricao });
  }

  public criar() {
    this.navCtrl.push('NovoLancamentoPage');
  }

}
