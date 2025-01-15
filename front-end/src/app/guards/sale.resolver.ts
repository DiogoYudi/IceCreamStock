import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { SaleService } from '../service/sale.service';
import { Observable, of } from 'rxjs';
import { Sale } from '../models/sale';

@Injectable({
  providedIn: 'root'
})

export class SaleResolver{
  constructor(private service: SaleService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Sale>{
    if(route.params && route.params['id']) return this.service.loadById(route.params['id']);
    return of({id: 0, table: 0, status: false, totalprice: 0, date: new Date()});
  }
}
