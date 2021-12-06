import { ElementDialogComponent } from './../../shared/element-dialog/element-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, _closeDialogVia } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { AlimentoElement } from 'src/app/models/AlimentoElement';
import { AlimentoElementService } from 'src/app/services/AlimentoElement.service';

//Usado apenas no modo estático
/*const ELEMENT_DATA: AlimentoElement[] = [
  { codigo: 1, nome: 'Feijão', quantidade: 0 },
  { codigo: 2, nome: 'Arroz Parborizado', quantidade: 0 },
  { codigo: 3, nome: 'Flocão', quantidade: 0 },
  { codigo: 4, nome: 'Macarrão', quantidade: 0 },
  { codigo: 5, nome: 'Farinha', quantidade: 0 },
  { codigo: 6, nome: 'Óleo', quantidade: 0 },
  { codigo: 7, nome: 'Doce', quantidade: 0 },
  { codigo: 8, nome: 'Café', quantidade: 0 },
  { codigo: 9, nome: 'Açucar', quantidade: 0 },
  { codigo: 10, nome: 'Arroz Branco', quantidade: 0 },
];*/

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AlimentoElementService]
})
export class HomeComponent implements OnInit {
  @ViewChild(MatTable)
  table!: MatTable<any>;
  displayedColumns: string[] = ['codigo', 'nome', 'quantidade', 'ações'];
  dataSource!: AlimentoElement[];
  constructor(public dialog: MatDialog,
    public alimentoElementService: AlimentoElementService

    ) {
      this.alimentoElementService.getElements().subscribe((data: AlimentoElement[]) =>{
        this.dataSource = data;
      });
    }

  ngOnInit(): void {}

  openDialog(element: AlimentoElement | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width: '250px',
      data:
        element === null
          ? {
              codigo: null,
              nome: '',
              quantidade: null,
            }
          : {
              id: element.id,
              codigo: element.codigo,
              nome: element.nome,
              quantidade: element.quantidade,
          }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        console.log(result);
        if (this.dataSource.map(p => p.id).includes(result.id)) {
          this.alimentoElementService.editElement(result)
            .subscribe((data: AlimentoElement) => {
              const index = this.dataSource.findIndex(p => p.id === data.id);
              this.dataSource[index] = data;
              this.table.renderRows();
            });
        } else {
          this.alimentoElementService.createElement(result)
            .subscribe((data: AlimentoElement) => {
              this.dataSource.push(data);
              this.table.renderRows();
            });
        }
      }
    });
  }

  editElement(element: AlimentoElement): void {
    this.openDialog(element);
  }

  /*deleteElement(codigo: number): void {
    this.alimentoElementService.deleteElement(codigo)
    .subscribe(() => {
      this.dataSource = this.dataSource.filter(p => p.id !== codigo);
    });
  }*/
}
