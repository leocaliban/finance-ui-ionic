import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ErrorHandlerService {

  constructor(private toastCtrl: ToastController) { }

  handle(errorResponse: any) {
    let mensagem: string;

    if (typeof errorResponse === 'string') {
      mensagem = errorResponse;
    } else {
      mensagem = 'Desculpe, ocorreu um erro ao processar o serviço remoto.';
    }

    this.mensagemErro(mensagem);

  }

  mensagemErro(mensagem) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }
}
