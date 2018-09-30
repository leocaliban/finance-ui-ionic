import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaLancamentosPage } from './lista-lancamentos';
import { ErrorHandlerService } from '../../services/error-handler.service';

@NgModule({
  declarations: [
    ListaLancamentosPage
  ],
  imports: [
    IonicPageModule.forChild(ListaLancamentosPage)

  ],
  providers: [ErrorHandlerService]
})
export class ListaLancamentosPageModule {}
