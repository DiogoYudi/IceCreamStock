import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { SaleService } from '../service/sale.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from '../service/product.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-sale-form',
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MatGridListModule,
    MatIconModule
  ],
  templateUrl: './sale-form.component.html',
  styleUrl: './sale-form.component.scss'
})
export class SaleFormComponent implements OnInit {
  form: FormGroup;
  products$: Observable<{ category: string, products: Product[] }[]> | null = null;
  constructor(private formBuilder: NonNullableFormBuilder, private service: SaleService, private snackBar: MatSnackBar, private location: Location, private route: ActivatedRoute, private productService: ProductService){
    this.form = this.formBuilder.group({
      id: [],
      tableNum: ['', [Validators.required]],
      status: [true, [Validators.required]],
      totalprice: [ [Validators.required]],
      date: [Validators.required],
    });

    this.refresh();
  }

  refresh(){
    this.products$ = this.productService.list().pipe(
      map(products => this.groupByCategory(products)),
      catchError(error => {
        this.onError("Erro ao carregar produtos.");
        return of([])
      })
    );
  }

  groupByCategory(products: Product[]): { category: string, products: Product[] }[] {
    const grouped = products.reduce((groups, product) => {
      const category = product.category || 'Outras';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(product);
      return groups;
    }, {} as { [key: string]: Product[] });

    return Object.keys(grouped).map(category => ({
      category,
      products: grouped[category]
    }));
  }

  chunkArray(arr: any[], size: number): any[] {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }

  ngOnInit(): void {}

  onSubmit(){
    this.service.save(this.form.value).subscribe(result => this.onSucess(), error => this.onError("Erro ao iniciar venda!"));
  }

  onCancel(){
    this.location.back();
  }

  private onSucess(){
    this.snackBar.open("Venda adicionado!", "", { duration: 2000 });
    this.onCancel();
  }

  private onError(message: string){
    this.snackBar.open(message, "", { duration: 2000 });
  }

  getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName);

    if(field?.hasError('required')) return "Campo Obrigatorio";
    return "Campo Inválido";
  }

  onAdd(){

  }
}
