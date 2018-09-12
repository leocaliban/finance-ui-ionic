import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PessoasPage } from './pessoas';

@NgModule({
  declarations: [
    PessoasPage,
  ],
  imports: [
    IonicPageModule.forChild(PessoasPage),
  ],
})
export class PessoasPageModule {}
