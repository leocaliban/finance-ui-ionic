import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from "@angular/core";

import * as moment from 'moment';
import { Lancamento } from '../../models/lancamento';

export interface LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
}

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(public http: Http) {
  }

  salvar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new Headers();
    this.adicionarAuthorization(headers);
    headers.append('Content-Type', 'application/json');
     return this.http.post(this.lancamentosUrl, JSON.stringify(lancamento), { headers })
      .toPromise()
      .then(response => response.json());
   }

   buscarPorCodigo(codigo: number): Promise<Lancamento> {
    const headers = new Headers();
    this.adicionarAuthorization(headers);
     return this.http.get(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const lancamento = response.json() as Lancamento;
        this.converterStringsParaDatas([lancamento]);
        return lancamento;
      });
  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    const headers = new Headers();
    this.adicionarAuthorization(headers);
    headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.lancamentosUrl}/${lancamento.codigo}`,
      JSON.stringify(lancamento), { headers })
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response.json() as Lancamento;
        this.converterStringsParaDatas([lancamentoAlterado]);
        return lancamentoAlterado;
      });
  }

  pesquisar(filtro: LancamentoFiltro, pagina: number = 0, linhasPorPagina: number = 5): Promise<any> {
    const headers = new Headers();
    const parametros = new URLSearchParams();

    this.adicionarAuthorization(headers);

    if (filtro.descricao) {
      parametros.set('descricao', filtro.descricao);
    }

    if (filtro.dataVencimentoInicio) {
      parametros.set('dataVencimentoDe', moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoFim) {
      parametros.set('dataVencimentoAte', moment(filtro.dataVencimentoFim).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo&size=${linhasPorPagina}&page=${pagina}`,
      { headers, search: parametros })
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {

    const headers = new Headers();

    this.adicionarAuthorization(headers);

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();
       if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }

  adicionarAuthorization(headers: Headers) {
    // tslint:disable-next-line:max-line-length
    headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJsZW9jYWxpYmFuQGZpbmFuY2UuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoyNTM5NTU1MzU0LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiI3OTA1YjQwZC1mMTFkLTRjMGYtYTQ5Yy01OTc0MzNiN2M2MjQiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.lCn1ZyIt_zSv6-1-inEPfgR29GQ_ZV5pHH-UXsNGbmk');
  }

}
