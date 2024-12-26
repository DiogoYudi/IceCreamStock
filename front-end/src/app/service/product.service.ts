import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly API = 'http://localhost:8080/product';

  constructor(private httpClient: HttpClient) {}

  list(){
    return this.httpClient.get<Product[]>(this.API).pipe(
      tap(courses => console.log(courses))
    );
  }

  loadById(id: string){
    return this.httpClient.get<Product>(`${this.API}/${id}`);
  }

  save(product: Partial<Product>){
    if(product.id) return this.update(product);
    return this.create(product);
  }

  private create(product: Partial<Product>){
    return this.httpClient.post<Product>(this.API, product);
  }

  private update(product: Partial<Product>){
    return this.httpClient.put<Product>(`${this.API}/${product.id}`, product);
  }

  delete(id: number){
    return this.httpClient.delete<Product>(`${this.API}/${id}`);
  }
}
