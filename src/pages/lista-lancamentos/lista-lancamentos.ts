import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-lista-lancamentos',
  templateUrl: 'lista-lancamentos.html',
})
export class ListaLancamentosPage {

  lancamentos = [
    {
      tipo: 'DESPESA',
      descricao: 'Compra de pão',
      dataVencimento: new Date(2017, 6, 30),
      dataPagamento: null,
      valor: 4.55,
      pessoa: 'Padaria Pão Novo'
    },
    {
      tipo: 'RECEITA',
      descricao: 'Aluguel',
      dataVencimento: new Date(2018, 3, 11),
      dataPagamento: new Date(2018, 3, 11),
      valor: 220.00,
      pessoa: 'Jack Bauer'
    },
    {
      tipo: 'DESPESA',
      descricao: 'Conta de Água',
      dataVencimento: new Date(2018, 5, 11),
      dataPagamento: null,
      valor: 100.00,
      pessoa: 'James Lancer'
    },
    {
      tipo: 'RECEITA',
      descricao: 'Salário',
      dataVencimento: new Date(2018, 9, 11),
      dataPagamento: new Date(2018, 6, 19),
      valor: 990.00,
      pessoa: 'Rafael Lima'
    },
    {
      tipo: 'DESPESA',
      descricao: 'Cervejas',
      dataVencimento: new Date(2018, 5, 4),
      dataPagamento: new Date(2018, 5, 4),
      valor: 90000.00,
      pessoa: 'Zeca'
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaLancamentosPage');
  }

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
