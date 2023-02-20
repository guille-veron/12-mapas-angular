import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Marcador } from 'src/app/classes/marcador.class';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  
  marcadores: Marcador[] =[];
  
  lat = 51.678418;
  lng = 7.809007;

  constructor(private _snackBar: MatSnackBar,
              public dialog: MatDialog) {
    if(localStorage.getItem('marcadores')){
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
    
   }

  ngOnInit(): void {
  }

  agregarMarcador(evento: any){
    const nuevoMarcador = new Marcador(evento.coords.lat,evento.coords.lng);
    this.marcadores.push(nuevoMarcador);
    this.guardarStorage();
    this.openSnackBar("Ha agregado un nuevo Marcador");  
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "Cerrar", {
      duration: 2000
    });
  }

  borrarMarcador(i: number){
    this.marcadores.splice(i,1);
    this.guardarStorage();
    this.openSnackBar("Ha borrado un Marcador");    
  }

  editarMarcador(marca: Marcador){    
      const dialogRef = this.dialog.open(MapaEditarComponent, {
        width: '250px',
        data: {titulo: marca.titulo, desc: marca.desc},
      });
      dialogRef.afterClosed().subscribe(result => {
        
        if(!result){ return;}

        marca.titulo = result.titulo;
        marca.desc = result.desc;

        this.guardarStorage();

        this.openSnackBar("Marcador actualizado");
      });    
  }

  guardarStorage(){
    localStorage.setItem('marcadores',JSON.stringify(this.marcadores))
  }

}
