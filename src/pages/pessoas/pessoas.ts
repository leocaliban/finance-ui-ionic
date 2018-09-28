import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PessoaFiltro } from '../../services/domain/pessoa.service';

@IonicPage()
@Component({
  selector: 'page-pessoas',
  templateUrl: 'pessoas.html',
})
export class PessoasPage {

  filtro = new PessoaFiltro();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PessoasPage');
  }

  public pesquisar() {
    this.navCtrl.push('ListaPessoasPage',{ filtro: this.filtro });
  }

  public criar() {
    this.navCtrl.push('NovaPessoaPage');
  }

}
