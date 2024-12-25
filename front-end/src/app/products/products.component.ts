import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from '../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    ProductListComponent,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
  products$: Observable<Product[]> | null = null;
  constructor(private productService: ProductService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar){
    this.refresh();
  }

  refresh(){
    this.products$ = this.productService.list().pipe(
      catchError(error => {
        this.onError("Erro ao carregar curso.");
        return of([])
      })
    );
  }

  onError(errorMsg: string){
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {  
  }

  onAdd(){}

  onEdit(product: Product){
    console.log("A");
  }

  onDelete(product: Product){}

  click(){
    console.log("A");
  }
}
