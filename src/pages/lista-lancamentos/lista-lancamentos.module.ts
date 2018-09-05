import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaLancamentosPage } from './lista-lancamentos';

@NgModule({
  declarations: [
    ListaLancamentosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaLancamentosPage),
  ],
})
export class ListaLancamentosPageModule {}
