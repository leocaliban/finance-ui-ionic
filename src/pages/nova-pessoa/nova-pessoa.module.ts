import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovaPessoaPage } from './nova-pessoa';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    NovaPessoaPage,
  ],
  imports: [
    IonicPageModule.forChild(NovaPessoaPage),
    BrMaskerModule
  ],
})
export class NovaPessoaPageModule {}
