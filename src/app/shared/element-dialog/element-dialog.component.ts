import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlimentoElement } from 'src/app/models/AlimentoElement';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent implements OnInit {
  element!: AlimentoElement;
  isChange!: boolean;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: AlimentoElement,
    public dialogRef: MatDialogRef<ElementDialogComponent>,
  )  { }
  ngOnInit(): void {
    if(this.data.codigo != null){
      this.isChange = true;
    }
    else{
      this.isChange = false;
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
