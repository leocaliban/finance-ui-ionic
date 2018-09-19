import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-novo-lancamento',
  templateUrl: 'novo-lancamento.html',
})
export class NovoLancamentoPage {

  formGroup: FormGroup;
  tipos = [
    { label: 'Receita', value: 'RECEITA'},
    { label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [
    { label: 'Alimentação', value: '1'},
    { label: 'Transporte', value: '2'}
  ];

  pessoas = [
    { label: 'Aline Silva', value: '1'},
    { label: 'Nina Myers', value: '2'},
    { label: 'Kim Bauer', value: '3'}
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtlr: AlertController) {

      this.formGroup = this.formBuilder.group({//Definir as validações dos campos do form
        tipo: ['', [Validators.required]],
        vencimento: ['', [Validators.required]],
        descricao: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        valor: ['', [Validators.required]],
        categoria: ['', [Validators.required]],
        pessoa: ['', [Validators.required]]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NovoLancamentoPage');
  }

}
