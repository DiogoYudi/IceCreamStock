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
    MatFormFieldModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{
  @Input() products: Product[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() delete = new EventEmitter(false);

  productsAux: Product[] = [];

  readonly displayedColumns = ['name', 'price', 'actions'];
  constructor(){}

  ngOnInit(): void {
    this.productsAux = this.products;
  }

  onAdd(){
    this.add.emit(true);
  }

  onEdit(product: Product){
    this.edit.emit(product);
  }

  onDelete(product: Product){
    this.delete.emit(product);
  }

  filterResults(event: Event) {
    this.products = this.productsAux;
    const text = (event.target as HTMLInputElement).value;

    this.products = this.products.filter(
      housingLocation => housingLocation?.name.toLowerCase().includes(text.toLowerCase())
    );
  }
}
