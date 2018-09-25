import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LancamentoService, LancamentoFiltro } from '../../services/domain/lancamento.service';


@IonicPage()
@Component({
  selector: 'page-lista-lancamentos',
  templateUrl: 'lista-lancamentos.html',
})
export class ListaLancamentosPage {

  filtro: LancamentoFiltro;
  lancamentos = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private lancamentoService: LancamentoService) {

    this.filtro = this.navParams.get('filtro');
  }

  ionViewDidLoad() {
    this.pesquisar();
  }

  public criar() {
    this.navCtrl.push('NovoLancamentoPage');
  }

  pesquisar() {
    this.lancamentoService.pesquisar(this.filtro).then(lancamentos => this.lancamentos = lancamentos);
  }

  getCorValor(evento: any) {
    if (evento === 'DESPESA') {
      return 'red';
    } else {
      return 'blue';
    }
  }

}
