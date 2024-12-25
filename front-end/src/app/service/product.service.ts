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
}
