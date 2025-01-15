import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Sale } from '../models/sale';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sale',
  imports: [MatTableModule, 
      MatIconModule, 
      MatButtonModule,
      MatInputModule,
      MatFormFieldModule,
      CommonModule
    ],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent implements OnInit, OnChanges{
  @Input() sales: Sale[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  filteredSales: Sale[] = [];

  readonly displayedColumns = ['table', 'totalprice', 'date','actions'];
  
  constructor(){}
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['sales']){
      this.filteredSales = this.sales.filter(sale => sale.status !== false);
    }
  }

  onAdd(){
    this.add.emit(true);
  }

  onEdit(sale: Sale){
    this.edit.emit(sale);
  }

  onDelete(sale: Sale){
    this.delete.emit(sale);
  }
}
