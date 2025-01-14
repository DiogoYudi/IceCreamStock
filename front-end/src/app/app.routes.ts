import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsComponent } from './products/products.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductResolver } from './guards/product.resolver';
import { SaleListComponent } from './sale-list/sale-list.component';

export const routes: Routes = [
    { path:'', component:SaleListComponent },
    { path:'product', component:ProductsComponent },
    { path:'product/new', component:ProductFormComponent, resolve: { product: ProductResolver } },
    { path:'product/edit/:id', component:ProductFormComponent, resolve: { product: ProductResolver } },
];
