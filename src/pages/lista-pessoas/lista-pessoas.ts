import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lista-pessoas',
  templateUrl: 'lista-pessoas.html',
})
export class ListaPessoasPage {

  pessoas = [
    {
      nome: 'Kelly Silva Andrade',
      cidade: 'Maturéia',
      estado: 'PB',
      ativo: true
    },
    {
      nome: 'Amanda Lins',
      cidade: 'João Pessoa',
      estado: 'PB',
      ativo: false
    },
    {
      nome: 'Fabiane Oliveira',
      cidade: 'Recife',
      estado: 'PE',
      ativo: true
    },
    {
      nome: 'Luana Torres',
      cidade: 'Natal',
      estado: 'RN',
      ativo: true
    },
    {
      nome: 'Yanne Lima',
      cidade: 'Patos',
      estado: 'PB',
      ativo: true
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaPessoasPage');
  }

}
