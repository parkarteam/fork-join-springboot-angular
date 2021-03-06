import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bank } from '../components/bank/bank.component';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private  GET_BANKS_ENDPOINT = '/bankms/banks';

  constructor(private _http: HttpClient) { }

  getBanks(): Observable<Bank[]> {

    const url = 'gateway'.concat(this.GET_BANKS_ENDPOINT);
    console.log(' get banks url ',url);
    return this._http.get<Bank[]>(url);
  }

}
