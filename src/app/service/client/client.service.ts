import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientModel } from 'src/app/views/client/client.model';
import { HttpParams } from '@angular/common/http';
import { CepResponse } from 'src/app/views/client/cep.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrlPost = "https://fep-back-790541d45c2b.herokuapp.com/api/participante/inserir";
  baseUrlGet = "https://fep-back-790541d45c2b.herokuapp.com/api/participante";
  cepUrl = "https://fep-back-790541d45c2b.herokuapp.com/api/util/buscar-cep";


  constructor(private http: HttpClient) { }

  createClient(client: ClientModel): Observable<ClientModel> {

    return this.http.post<ClientModel>(this.baseUrlPost, client)

  }


  readClient(codigo: number, cpf: string, nome: string): Observable<ClientModel[]> {

    var url = this.baseUrlGet;

    if (codigo != null) {
      url = url + `/ ${codigo}`

    } else if (!!cpf) {
      url = url + `/cpf?cpf= ${cpf}`

    } else if (!!nome) {
      url = url + `/nome?nome= ${nome}`
    }

    return this.http.get<ClientModel[]>(url)
  }

  getCep(cep: number): Observable<CepResponse> {
    var url = this.cepUrl;
    url = url + `/${cep}`

    return this.http.get<CepResponse>(url);
  }

  delete(codigo: number): Observable<any> {

    var url = this.baseUrlGet;
    url = url + `/${codigo}`

    return this.http.delete<any>(url)
  }


}
