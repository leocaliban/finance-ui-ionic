import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovaPessoaPage } from './nova-pessoa';

@NgModule({
  declarations: [
    NovaPessoaPage,
  ],
  imports: [
    IonicPageModule.forChild(NovaPessoaPage),
  ],
})
export class NovaPessoaPageModule {}
