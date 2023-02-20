import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-mapa-editar',
  templateUrl: './mapa-editar.component.html',
  styles: [
  ]
})
export class MapaEditarComponent implements OnInit {
  
  forma: FormGroup;

  constructor(public dialogRef: MatDialogRef<MapaEditarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private _fb : FormBuilder) {
      
      this.forma = _fb.group({
        'titulo': data.titulo,
        'desc' : data.desc,
      })
        
     }

  ngOnInit(): void {
  }

  guardarCambios(){
    this.dialogRef.close(this.forma.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
