import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  imports: [ MatDialogModule ],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss'
})
export class ErrorDialogComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: string){}

  ngOnInit(): void {
  }
}
