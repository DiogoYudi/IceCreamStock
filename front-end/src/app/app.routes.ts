import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
    { path:'', component:ProductsComponent },
    { path:'product', component:ProductListComponent }
];
