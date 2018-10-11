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
    console.log('ionViewDidLoad NovaPessoaPage');
  }

  salvar() {
    this.pessoaService.salvar(this.pessoa)
      .then(() => {
        this.showInsertOk();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  showInsertOk() {
    let alert = this.alertCtlr.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
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

}
