import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoLancamentoPage } from './novo-lancamento';

@NgModule({
  declarations: [
    NovoLancamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(NovoLancamentoPage),
  ],
})
export class NovoLancamentoPageModule {}
