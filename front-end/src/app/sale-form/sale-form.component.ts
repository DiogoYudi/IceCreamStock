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
import { Sale } from '../models/sale';


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
    CommonModule
  ],
  templateUrl: './sale-form.component.html',
  styleUrl: './sale-form.component.scss'
})
export class SaleFormComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: NonNullableFormBuilder, private service: SaleService, private snackBar: MatSnackBar, private location: Location, private route: ActivatedRoute){
    this.form = this.formBuilder.group({
      id: [],
      tableNum: ['', [Validators.required]],
      status: [true, [Validators.required]],
      totalprice: [ [Validators.required]],
      date: [Validators.required],
    });
  }

  ngOnInit(): void {
    const sale: Sale = this.route.snapshot.data['sale'];
    if(sale.id == 0) sale.id = NaN;
    this.form.setValue({
      id: sale.id,
      tableNum: sale.table,
      status: true,
      totalprice: sale.totalprice,
      date: sale.date
    });
  }

  onSubmit(){
    this.service.save(this.form.value).subscribe(result => this.onSucess(), error => this.onError());
  }

  onCancel(){
    this.location.back();
  }

  private onSucess(){
    this.snackBar.open("Venda adicionado!", "", { duration: 2000 });
    this.onCancel();
  }

  private onError(){
    this.snackBar.open("Erro ao iniciar venda!", "", { duration: 2000 });
  }

  getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName);

    if(field?.hasError('required')) return "Campo Obrigatorio";
    return "Campo Inválido";
  }
}
