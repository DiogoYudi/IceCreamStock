import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sale } from '../models/sale';
import { lastValueFrom, Observable } from 'rxjs';
import { SaleProduct } from '../models/saleproduct';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private readonly API = 'http://localhost:8080/sale';
  private readonly API2 = 'http://localhost:8080/sale-product';

  constructor(private httpClient: HttpClient){}

  list(){
    return this.httpClient.get<Sale[]>(this.API);
  }

  loadById(id: number){
    return this.httpClient.get<Sale>(`${this.API}/${id}`);
  }

  loadByIdSale(id: number){
    return this.httpClient.get<SaleProduct[]>(`${this.API2}/${id}`);
  }

  save(sale: Partial<Sale>){
    if(sale.id) return this.update(sale);
    return this.create(sale);
  }

  async saveSaleProduct(sale: Sale, product: any){
    const body = {
      id_product: product.id_product,
      id_sale: sale.id,
      qtd: product.qtd,
      total_price: product.totalPrice * product.qtd
    };
    return this.createSaleProduct(body);
  }

  private create(sale: Partial<Sale>){
    return this.httpClient.post<Sale>(this.API, sale);
  }

  private createSaleProduct(body: any){
    this.httpClient.post<SaleProduct>(this.API2, body).subscribe({
      next: (response) => {
        console.log('Produto Adicionado', response);
      },
      error: (err) => {
        console.error('Erro ao tentar adicionar produto', err);
      }
    });
  }

  update(sale: Partial<Sale>){
    return this.httpClient.put<Sale>(`${this.API}/${sale.id}`, sale);
  }

  delete(id: number){
    return this.httpClient.delete<Sale>(`${this.API}/${id}`);
  }

  deleteSaleProduct(id: number){
    return this.httpClient.delete<Sale>(`${this.API2}/${id}`); 
  }

  deleteProduct(idProduct: number, idSale: number){
    return this.httpClient.delete<SaleProduct>(`${this.API2}/${idProduct}/${idSale}`);
  }
}
