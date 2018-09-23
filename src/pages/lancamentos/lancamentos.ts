import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lancamentos',
  templateUrl: 'lancamentos.html',
})
export class LancamentosPage {

  lancamentos =[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LancamentosPage');
  }

  public pesquisar() {
    this.navCtrl.push('ListaLancamentosPage', {filtro: ''});
  }

  public criar() {
    this.navCtrl.push('NovoLancamentoPage');
  }

}
