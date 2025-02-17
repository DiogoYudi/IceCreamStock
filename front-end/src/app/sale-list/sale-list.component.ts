import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, Observable, of } from 'rxjs';
import { Sale } from '../models/sale';
import { SaleService } from '../service/sale.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../shared/error-dialog/error-dialog.component';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { SaleComponent } from '../sale/sale.component';

@Component({
  selector: 'app-sale-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    SaleComponent

],
  templateUrl: './sale-list.component.html',
  styleUrl: './sale-list.component.scss'
})
export class SaleListComponent implements OnInit{
  sales$: Observable<Sale[]> | null = null;
  constructor(private saleService: SaleService, public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar){
    this.refresh();
  }
  
  refresh(){
    this.sales$ = this.saleService.list().pipe(
      catchError(error => {
        this.onError("Erro ao carregar as vendas!");
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
    this.router.navigate(['new'], { relativeTo:this.route });
  }

  onEdit(sale: Sale){
    this.router.navigate(['edit', sale.id], { relativeTo:this.route });
  }

  onDelete(sale: Sale){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Deseja deletar essa venda?",
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.saleService.delete(sale.id).subscribe(() => {
          this.saleService.deleteSaleProduct(sale.id).subscribe(result => {
            console.log(result);
          });
          this.refresh();
          this.snackBar.open("Venda deletada!", "X", {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        },
          error => this.onError("Erro ao remover venda")
        );
      }
    })
  }
}
