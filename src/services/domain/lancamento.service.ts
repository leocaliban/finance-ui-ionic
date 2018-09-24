import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from "@angular/core";

export interface LancamentoFiltro {
  descricao: string;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(public http: Http){
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new Headers();
    const parametros = new URLSearchParams();

    // tslint:disable-next-line:max-line-length
    headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJsZW9jYWxpYmFuQGZpbmFuY2UuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTM3ODY2MDIxLCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiJlNDFiNGQ5Ni0wMDA0LTRmZWMtYTY5Yi0zNDA2NTUzMzVjNzYiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.drjT_KJVj1dJZTx-dZKNwjPuxti6JbOB2gzkKlm-bQM');

    if (filtro.descricao) { // Se vier alguma informação no filtro
      parametros.set('descricao', filtro.descricao); // Adicine a informação do filtro no valor
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, search: parametros })
      .toPromise()
      .then(response => response.json().content);
  }

}
