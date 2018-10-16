import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { PessoaService } from '../../services/domain/pessoa.service';
import { Pessoa } from '../../models/pessoa';
import { ErrorHandlerService } from '../../services/error-handler.service';

@IonicPage()
@Component({
  selector: 'page-nova-pessoa',
  templateUrl: 'nova-pessoa.html',
})
export class NovaPessoaPage {

  pessoa = new Pessoa();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private pessoaService: PessoaService,
    public alertCtlr: AlertController,
    private errorHandler: ErrorHandlerService) {

  }

  ionViewDidLoad() {
    const codigoPessoa = this.navParams.get('codigo');
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  salvar() {
    if (this.editando) {
      this.atualizarPessoa();
    } else {
      this.adicionarPessoa();
    }
  }

  adicionarPessoa() {
    this.pessoaService.salvar(this.pessoa)
      .then(() => {
        this.showInsertOk('Cadastro efetuado com sucesso.');
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa() {
    this.pessoaService.atualizar(this.pessoa)
      .then(response => {
        this.showUpdateOk('Pessoa alterada com sucesso.');
        this.pessoa = response;
      }).catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(response => {
        this.pessoa = response;
      }).catch(erro => this.errorHandler.handle(erro));
  }

  showInsertOk(mensagem: string) {
    let alert = this.alertCtlr.create({
      title: 'Sucesso!',
      message: mensagem,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  showUpdateOk(mensagem: string) {
    let alert = this.alertCtlr.create({
      title: 'Sucesso!',
      message: mensagem,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('PessoasPage');
          }
        }
      ]
    });
    alert.present();
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

}
