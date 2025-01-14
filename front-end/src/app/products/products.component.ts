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
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-products',
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    ProductListComponent,
    CommonModule
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

  onAdd(){
    console.log("A");
    this.router.navigate(['new'], { relativeTo:this.route });
  }

  onEdit(product: Product){
    this.router.navigate(['edit', product.id], { relativeTo:this.route });
  }

  onDelete(product: Product){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Deseja deletar esse produto?",
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.productService.delete(product.id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open("Produto removido!", "X", {
              duration: 2000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          error => this.onError("Erro ao remover produto")
        );
      }
    })
  }
}
