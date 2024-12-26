import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductService } from '../service/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-form',
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit{
  form: FormGroup;
  constructor(private formBuilder:NonNullableFormBuilder, private service: ProductService, private snackbar: MatSnackBar, private location: Location, private route: ActivatedRoute){
    this.form = this.formBuilder.group({
      id: [],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      price: [ [Validators.required]],
      category: ['', [Validators.required]]
    });
  }
  
  ngOnInit(): void {
      const product: Product = this.route.snapshot.data['product'];
      if(product.id == 0) product.id = NaN;
      this.form.setValue({
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category
      });
  }

  onSubmit(){
    this.service.save(this.form.value).subscribe(result => this.onSucess(), error => this.onError());
  }

  onCancel(){
    this.location.back();
  }

  private onSucess(){
    this.snackbar.open("Produto adicionado!", "", { duration: 2000 });
    this.onCancel();
  }

  private onError(){
    this.snackbar.open("Erro ao adicionar produto!", "", { duration:2000 });
  }

  getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName);

    if(field?.hasError('required')) return "Campo Obrigatorio";
    if(field?.hasError('maxlength')){
      const requiredLength:number = field.errors ? field.errors['maxlength']['requiredLength'] : 5; 
      return `Tamanho máximo de caracteres: ${requiredLength}`;
    }
    return "Campo inválido";
  }
}
