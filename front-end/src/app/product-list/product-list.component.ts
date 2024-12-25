import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../models/product';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-product-list',
  imports: [
    MatTableModule, 
    MatIconModule, 
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{
  @Input() products: Product[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);
  
  readonly displayedColumns = ['name', 'price', 'actions'];
  dataSource = new MatTableDataSource(this.products);
  constructor(){}

  ngOnInit(): void {
      
  }

  onAdd(){
    this.add.emit(true);
  }

  onEdit(product: Product){
    console.log("A");
  }

  onDelete(product: Product){
    this.delete.emit(product);
  }

  applyFilter(event: Event) {
    console.log("a");
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  click(){
    console.log("A");
  }
}
