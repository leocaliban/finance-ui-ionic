import { Http, Headers, URLSearchParams } from '@angular/http';
import { Injectable } from "@angular/core";

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(public http: Http) {
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

  adicionarAuthorization(headers: Headers) {
    // tslint:disable-next-line:max-line-length
    headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJsZW9jYWxpYmFuQGZpbmFuY2UuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTM4MTg1OTk5LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIzMmY3OThkOS02ZjcxLTQ0YWQtOTQ2My01ZjVkYmNlODdjYmQiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.H7W2SHXppbbAeWMoKIQexiPN3gdL6qFXrCtalWlilrk');
  }
}
