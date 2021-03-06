import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from "@angular/core";

import { Pessoa } from '../../models/pessoa';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(
    public http: Http
  ) { }

  salvar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new Headers();
    this.adicionarAuthorization(headers);
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa), { headers })
      .toPromise()
      .then(response => response.json());
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    const headers = new Headers();
    this.adicionarAuthorization(headers);
    return this.http.get(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise()
      .then(response => {
        const pessoa = response.json() as Pessoa;
        return pessoa;
      });
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    const headers = new Headers();
    this.adicionarAuthorization(headers);
    headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`,
      JSON.stringify(pessoa), { headers })
      .toPromise()
      .then(response => {
        const pessoaAlterada = response.json() as Pessoa;
        return pessoaAlterada;
      });
  }

  pesquisarPorNome(filtro: PessoaFiltro, pagina: number = 0, linhasPorPagina: number = 5): Promise<any> {
    const parametros = new URLSearchParams();
    const headers = new Headers();

    this.adicionarAuthorization(headers);

    if (filtro.nome) {
      parametros.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}?resumo&size=${linhasPorPagina}&page=${pagina}`,
      { headers, search: parametros })
      .toPromise()
      .then(response => response.json().content);
  }

  pesquisarTodos(): Promise<any> {
    const headers = new Headers();

    this.adicionarAuthorization(headers);

    return this.http.get(`${this.pessoasUrl}`, { headers })
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(codigo: number): Promise<void> {
    const headers = new Headers();
    this.adicionarAuthorization(headers);
    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers })
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new Headers();
    this.adicionarAuthorization(headers);
    headers.append('Content-Type', 'application/json');
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers }).toPromise().then(() => null);
  }

  adicionarAuthorization(headers: Headers) {
    // tslint:disable-next-line:max-line-length
    headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJsZW9jYWxpYmFuQGZpbmFuY2UuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoyNTM5NjY3MDA0LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiI4YjdmNWZkNy1lNmRjLTQ4MmEtYTg0Zi05MmUxMDAwMGM2ZjMiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.96O39pUgK0e3ZoeXy3cwDeqWZZoNp8WyPDFvw4Fxo5g');
  }
}
