import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products/products.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductResolver } from './guards/product.resolver';

export const routes: Routes = [
    { path:'', component:ProductsComponent },
    { path:'product', component:ProductListComponent },
    { path:'new', component:ProductFormComponent, resolve: { product: ProductResolver } },
    { path:'edit/:id', component:ProductFormComponent, resolve: { product: ProductResolver } },
];
