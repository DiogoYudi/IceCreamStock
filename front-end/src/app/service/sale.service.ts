import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sale } from '../models/sale';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private readonly API = 'http://localhost:8080/sale';

  constructor(private httpClient: HttpClient){}

  list(){
    return this.httpClient.get<Sale[]>(this.API);
  }

  loadById(id: number){
    return this.httpClient.get<Sale>(`${this.API}/${id}`);
  }

  save(sale: Partial<Sale>){
    if(sale.id) return this.update(sale);
    return this.create(sale);
  }

  private create(sale: Partial<Sale>){
    return this.httpClient.post<Sale>(this.API, sale);
  }

  private update(sale: Partial<Sale>){
    return this.httpClient.put<Sale>(`${this.API}/${sale.id}`, sale);
  }

  delete(id: number){
    return this.httpClient.delete<Sale>(`${this.API}/${id}`);
  }
}
