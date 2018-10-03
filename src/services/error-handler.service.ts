import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Response } from '@angular/http';

@Injectable()
export class ErrorHandlerService {

  constructor(private toastCtrl: ToastController) { }

  handle(errorResponse: any) {
    let mensagem: string;

    if (typeof errorResponse === 'string') {
      mensagem = errorResponse;
    } else if (errorResponse instanceof Response && errorResponse.status >= 400 && errorResponse.status <= 499) {
      let erros;
      mensagem = 'Ocorreu um erro ao processar a sua solicitação.';
      try {
        erros = errorResponse.json();
        mensagem = erros[0].mensagemUsuario;
      } catch (error) {
        console.error('Ocorreu um erro.', errorResponse);
      }
    } else {
      mensagem = 'Desculpe, ocorreu um erro ao processar o serviço remoto.';
      console.error('Ocorreu um erro.', errorResponse._body);
    }

    this.mensagemErro(mensagem);

  }

  mensagemErro(mensagem) {
    let toast = this.toastCtrl.create({
      message: mensagem,
      duration: 4000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });

    toast.onDidDismiss(() => {

    });

    toast.present();
  }
}
