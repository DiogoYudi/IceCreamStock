import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { catchError, concatMap, from, map, Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { ProductService } from '../service/product.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Sale } from '../models/sale';
import { SaleProduct } from '../models/saleproduct';
import { MatTableModule } from '@angular/material/table';

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
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatTableModule
  ],
  templateUrl: './sale-form.component.html',
  styleUrl: './sale-form.component.scss'
})
export class SaleFormComponent implements OnInit {
  form: FormGroup;
  products$: Observable<{ category: string, products: Product[] }[]> | null = null;
  productsSale$: Observable<SaleProduct[]> = new Observable<SaleProduct[]>();
  productNames: { [key: number]: string } = {};
  productAux: Product[] = [];
  total_Price: number = 0;
  readonly displayedColumns = ['name', 'actions'];
  constructor(private formBuilder: NonNullableFormBuilder, private service: SaleService, private snackBar: MatSnackBar, private location: Location, private route: ActivatedRoute, private productService: ProductService, private changeDetectorRef: ChangeDetectorRef){
    this.form = this.formBuilder.group({
      id: [0],
      tableNum: [ [Validators.required]],
      status: [ [Validators.required]],
      totalprice: [ [Validators.required]],
      date: [Validators.required],
    });

    this.refresh();
  }

  ngOnInit(): void {
    const sale: Sale = this.route.snapshot.data['sale'];
    if(sale.id == 0) sale.id = NaN;
    this.form.setValue({
      id: sale.id,
      tableNum: +sale.tableNum,
      status: true,
      totalprice: sale.totalprice,
      date: new Date()
    });

    if(sale.id) this.loadSaleProducts(sale.id);
  }

  loadSaleProducts(saleId: number){
    this.productsSale$ = this.service.loadByIdSale(saleId);
    this.loadProductName();
    this.updateTotalPrice();
  }

  loadProductName(){
    this.productsSale$.subscribe((saleProducts: SaleProduct[]) => {
      saleProducts.forEach(product => {
        for(let i = 0; i < product.qtd; i++){
          this.productService.loadById(product.id_product).subscribe((productData: Product) => {
            this.productAux.push(productData);
          })
        }
      })
    })
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

  onAdd(product: Product){
    this.productAux.push(product);
    this.updateTotalPrice();
  }

  onCancel(){
    this.location.back();
  }

  saveSale(){
    this.onSubmit();
  }

  finishSale(){
    const sale: Sale = this.route.snapshot.data['sale'];
    sale.status = false;
    this.service.update(sale).subscribe(result => {
      console.log(result);
    });
    this.service.deleteSaleProduct(sale.id).subscribe(result => {
      console.log(result);
    });
    this.onCancel();
  }

  onRemove(id: number){
    const sale: Sale = this.route.snapshot.data['sale'];
    console.log(this.service.deleteProduct(id, sale.id).subscribe((response) => {
      console.log("Produto deletado", response);
    },
    (error) => {
      console.log("Erro ao deletar", error);
    }
  ));
    const index = this.productAux.findIndex(products => products.id === id);
    if(index !== -1){
      this.productAux.splice(index, 1);
    }
    this.updateTotalPrice();
  }

  onSubmit(){
    this.updateTotalPrice();
    this.service.save(this.form.value).pipe(
      concatMap(result => {
        return this.service.deleteSaleProduct(result.id).pipe(
          concatMap(() => {
            const products = Object.values(this.groupProductsByQuantity(this.productAux));
            return from(products).pipe(
              concatMap(product => this.service.saveSaleProduct(result, product))
            );
          })
        );
      })
    ).subscribe({
      next: () => this.onSucess(),
      error: (error) => this.onError("Erro ao iniciar venda!")
    });
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

  updateTotalPrice(){
    if (this.productAux.length > 0){
      console.log(this.productAux.length);
      this.total_Price = this.productAux.reduce((total, product) => total + product.price, 0);
    }else{
      this.productsSale$.subscribe((saleProducts: SaleProduct[]) => {
        this.total_Price = saleProducts.reduce((sum, saleProduct) => {
          return sum + saleProduct.total_price;
        }, 0);
      });
    }
    this.form.patchValue({ totalprice: this.total_Price });
  }

  groupProductsByQuantity(products: Product[]): { [id: number]: { qtd: number, totalPrice: number } } {
    const productMap: { [id: number]: { qtd: number, totalPrice: number } } = {};
  
    products.forEach(product => {
      if (productMap[product.id]) {
        productMap[product.id].qtd += 1;
      } else {
        productMap[product.id] = {
          qtd: 1,
          totalPrice: product.price
        };
      }
    });
    return Object.values(productMap).map((product, index) => ({
      id_product: Object.keys(productMap)[index],
      qtd: product.qtd,
      totalPrice: product.totalPrice
    }));
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
}
