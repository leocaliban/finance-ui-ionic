import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoLancamentoPage } from './novo-lancamento';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    NovoLancamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(NovoLancamentoPage),
    BrMaskerModule

  ],
})
export class NovoLancamentoPageModule {}
