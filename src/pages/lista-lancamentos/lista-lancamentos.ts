import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LancamentoService } from '../../services/domain/lancamento.service';


@IonicPage()
@Component({
  selector: 'page-lista-lancamentos',
  templateUrl: 'lista-lancamentos.html',
})
export class ListaLancamentosPage {

  descricao: string;
  lancamentos = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private lancamentoService: LancamentoService) {

    this.descricao = this.navParams.get('descricao');
  }

  ionViewDidLoad() {
    this.pesquisar();
  }

  public criar() {
    this.navCtrl.push('NovoLancamentoPage');
  }

  pesquisar() {
    this.lancamentoService.pesquisar({ descricao: this.descricao }).then(lancamentos => this.lancamentos = lancamentos);

  }

  getCorValor(evento: any) {
    if (evento === 'DESPESA') {
      return 'red';
    } else {
      return 'blue';
    }
  }

}
