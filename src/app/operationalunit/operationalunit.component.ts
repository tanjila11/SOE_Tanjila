import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OuAddEditComponent } from '../ou-add-edit/ou-add-edit.component';

import { OperationalUnitService } from '../services/operationalunit.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-operationalunit',
  templateUrl: './operationalunit.component.html',
  styleUrls: ['./operationalunit.component.scss']
})

export class OperationalunitComponent implements OnInit {
  displayedColumns: string[] = [
    'serialNo',
    'operationalUnitId',
    'unitNameEn',
    'unitNamBn',
    'majorGoodsOrService',
    'remarks',
    'unitOpenDate',
    'active',
    'unitClosedDate',
    'address',
   
    'unitType',
    'action',
  ];

  isOperationalUnitIdColumnHidden: boolean = true;

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private service: OperationalUnitService,
    private _coreService: CoreService) { 

      this.getList();
      this.getMaxSerailNumber();
      
    }

  openOU_AddEditForm() {
   // const data =  this.getMaxSerailNumber();

    const dialogRef = this._dialog.open(OuAddEditComponent,
      { 
       // data,
        height: 'auto',
        width: '800px',
      }
      );
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
        
         this.getList();
        }
      },
    });
  }


  
  ngOnInit(): void {
    console.log(this.getList());
    this.getList();
  }

  getList() {
    this.service.getList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  //****Get Max Serial number */

  getMaxSerailNumber()
  {
    const organizationId = 21;
    this.service.getSerialNumberByOrganization(organizationId).subscribe(
      response => {
        console.log('Max Serial Number:', response);
      },
      error =>{
        console.error('Error:', error);
      }
    ); 
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openEditForm(data: any) {
    //console.log("open edit form: " + data);
    const dialogRef = this._dialog.open(OuAddEditComponent, {
      data,
        height: 'auto',
        width: '800px',
      
        
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getList();
        }
      },
    });
  }


  deleteEmployee(id: number,data: any) {
    //console.log("enter delete");
    if(confirm("Are you sure want to delete this record?")){
        this.service.delete2(id,data).subscribe({
          next: (res) => {
            this._coreService.openSnackBar('Recored deleted', 'done');
            this.getList();
          },
          error: console.log,
      });
  }
}

  
}
