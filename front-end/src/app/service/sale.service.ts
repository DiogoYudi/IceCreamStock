import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sale } from '../models/sale';
import { Product } from '../models/product';
import { SaleProduct } from '../models/SaleProduct';
import { lastValueFrom, Observable } from 'rxjs';

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

  save(sale: Partial<Sale>){
    if(sale.id) return this.update(sale);
    return this.create(sale);
  }

  async saveSaleProduct(saleId: number, product: any){
    console.log(product.totalPrice);
    if(!saleId){
      try {
        const lastSale = await lastValueFrom(this.getLastSaleId());
        if (!lastSale) {
          console.error('Não foi possível encontrar a última venda.');
          return;
        }
        saleId = lastSale.id;
      } catch (error) {
        console.error('Erro ao buscar a última venda', error);
        return;
      }
    }
    
    const body = {
      id_product: product.id_product,
      id_sale: saleId,
      qtd: product.qtd,
      totalPrice: product.totalPrice * product.qtd
    };
    return this.createSaleProduct(body);
  }

  private create(sale: Partial<Sale>){
    return this.httpClient.post<Sale>(this.API, sale);
  }

  private createSaleProduct(body: any){
    this.httpClient.post<SaleProduct>(this.API2, body).subscribe({
      next: (response) => {
        console.log('SaleProduct created successfully:', response);
      },
      error: (err) => {
        console.error('Error occurred while creating SaleProduct:', err);
      }
    });
  }

  private update(sale: Partial<Sale>){
    return this.httpClient.put<Sale>(`${this.API}/${sale.id}`, sale);
  }

  delete(id: number){
    return this.httpClient.delete<Sale>(`${this.API}/${id}`);
  }

  getLastSaleId(): Observable<Sale> {
    return this.httpClient.get<Sale>(`${this.API}/last-sale`);
  }
}
