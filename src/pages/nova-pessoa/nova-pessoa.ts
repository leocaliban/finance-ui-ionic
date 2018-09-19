import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-nova-pessoa',
  templateUrl: 'nova-pessoa.html',
})
export class NovaPessoaPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtlr: AlertController) {

      this.formGroup = this.formBuilder.group({//Definir as validações dos campos do form
        nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        bairro: ['', [Validators.required]],
        cep: ['', [Validators.required]],
        estado: ['', [Validators.required]],
        cidade: ['', [Validators.required]]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovaPessoaPage');
  }

}
