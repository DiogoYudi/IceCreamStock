import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductResolver{
  constructor(private service: ProductService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product>{
    if(route.params && route.params['id']) return this.service.loadById(route.params['id']);
    return of({id: 0, name: '', price: 0, category: ''});
  }
}
