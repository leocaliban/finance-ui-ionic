import { Http, Headers } from '@angular/http';
import { Injectable } from "@angular/core";

@Injectable()
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(public http: Http){

  }

  pesquisar(): Promise<any> {
    const headers = new Headers();

    // tslint:disable-next-line:max-line-length
    headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJsZW9jYWxpYmFuQGZpbmFuY2UuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNTM3NzQ1ODU0LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiI2YTIwYzVhNC02NDBhLTQzYTAtYTIzNS1lYmZiNjk3ZDhhZjUiLCJjbGllbnRfaWQiOiJhbmd1bGFyIn0.yoYwkQAga40N_1MnsmOU9nfnnbggzOFvvMuxm13t7qs');

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers })
      .toPromise()
      .then(response => response.json().content);
  }

}
