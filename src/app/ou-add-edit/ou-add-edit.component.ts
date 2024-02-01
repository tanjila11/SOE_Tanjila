import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
//import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { OperationalUnitService } from '../services/operationalunit.service';
import { CoreService } from '../services/core.service';

import { ValidationServiceComponent } from '../validationServiceComponent';

const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY', // Your custom date format goes here
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-ou-add-edit',
  templateUrl: './ou-add-edit.component.html',
  styleUrls: ['./ou-add-edit.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue:CUSTOM_DATE_FORMATS }, // Set any additional date formats or options here
  ],
})
export class OuAddEditComponent implements OnInit {
  operationalUnitForm: FormGroup;

  constructor(private fb: FormBuilder, private service: OperationalUnitService,
    private datePipe: DatePipe,
    private _dialogRef: MatDialogRef<OuAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _coreService: CoreService,) 
    { 
    
      this.operationalUnitForm = this.fb.group({
          operationalUnitId: [''],
          organizationId: [''],
          unitNameEn: ['', Validators.required],
          unitNameBn:  [''], // ['', [ValidationServiceComponent.banglaOnlyValidator]],
          majorGoodsOrService: [''],
          remarks: [''],
          unitOpenDate: [''],
          active: ['', Validators.required],
          unitClosedDate: [new FormControl('')],
          address: [''],
          serialNo: ['', Validators.required],
          unitType: ['', Validators.required]


     
    });

  }

  ngOnInit(): void {
   // this.operationalUnitForm.patchValue(this.data);
   
    //this.operationalUnitForm.patchValue(this.data);
  
    /*
    this.operationalUnitForm.patchValue({
     
      serialNo: this.data.value,
      
    });
    */
    //console.log("unitOpenDate : "+ this.data.value.unitOpenDate);

    this.operationalUnitForm.patchValue({
      operationalUnitId: this.data.operationalUnitId,
      organizationId: this.data.organizationId,
      unitNameEn: this.data.unitNameEn,
      unitNameBn: this.data.unitNameBn,
      majorGoodsOrService: this.data.majorGoodsOrService,
      remarks: this.data.remarks,
      unitOpenDate: this.data.unitOpenDate,
      active:  this.data.active == 1? '1' : '0' , //this.data.active.toString(),
      unitClosedDate: this.data.unitClosedDate,
      address: this.data.address,
      serialNo: this.data.serialNo,
      unitType: this.data.unitType == 1 ? '1': this.data.unitType == 2 ? '2': '3'  //this.data.unitType.toString()
    });
   
   // console.log("unitOpenDate : "+ this.operationalUnitForm.value.unitOpenDate);
       
    const formattedDate = this.operationalUnitForm.value.unitOpenDate ?
    this.datePipe.transform(this.operationalUnitForm.value.unitOpenDate, 'dd-MMM-yy') : null;
   // console.log('Formatted Date:'+ formattedDate);
  }
  compareFn(optionValue: any, formControlValue: any): boolean {
    return optionValue === formControlValue;
  }



/*
getErrorMessage(controlName: string): string | null {
  const control = this.operationalUnitForm.get(controlName);
  if (control && control.invalid && control.touched) {
    return Object.keys(control.errors)
      .map((key) => ValidationServiceComponent.getValidatorErrorMessage(key, control.errors[key]))
      .join(' ');
  }
  return null;
}
*/



  onFormSubmit() {
    if (this.operationalUnitForm.valid) {
      
      this.operationalUnitForm.value.organizationId = 2;
     // console.log(this.operationalUnitForm.value);
     //  console.log(this.data);
      if (this.data) {
        this.operationalUnitForm.value.operationalUnitId = this.data.operationalUnitId;


        //***********UPDATE************************/
      
        const formattedOpenDate = this.operationalUnitForm.value.unitOpenDate ?
        this.datePipe.transform(this.operationalUnitForm.value.unitOpenDate, 'yyyy-MM-ddTHH:mm:ss') : null;
       // console.log('Formatted Date:'+ formattedOpenDate);
       const formattedCloseDate = this.operationalUnitForm.value.unitClosedDate ?
        this.datePipe.transform(this.operationalUnitForm.value.unitClosedDate, 'yyyy-MM-ddTHH:mm:ss') : null;

        this.operationalUnitForm.value.unitOpenDate = formattedOpenDate;
        this.operationalUnitForm.value.unitClosedDate = formattedCloseDate;
      
        this.service.update(this.data.operationalUnitId, this.operationalUnitForm.value).subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Data updated successfully!');
             // alert("updated");
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.log(err);
            },
          });
        } 
        else {  //***********SAVE************************/
              this.operationalUnitForm.value.operationalUnitId = 0;
              this.operationalUnitForm.value.organizationId = 21;         
              this.operationalUnitForm.value.serialNo = 0;
             
             const formattedOpenDate = this.operationalUnitForm.value.unitOpenDate ?
             this.datePipe.transform(this.operationalUnitForm.value.unitOpenDate, 'yyyy-MM-ddTHH:mm:ss') : null;
            // console.log('Formatted Date:'+ formattedOpenDate);
            const formattedCloseDate = this.operationalUnitForm.value.unitClosedDate ?
             this.datePipe.transform(this.operationalUnitForm.value.unitClosedDate, 'yyyy-MM-ddTHH:mm:ss') : null;

             this.operationalUnitForm.value.unitOpenDate = formattedOpenDate;
             this.operationalUnitForm.value.unitClosedDate = formattedCloseDate;

              this.service.add(this.operationalUnitForm.value).subscribe({
                next: (val: any) => {
                // alert("added");
                  this._coreService.openSnackBar('Data added successfully');
                  this._dialogRef.close(true);
                },
                error: (err: any) => {
                  console.log(err);
                },
              });
      }
      
    }
    
  }




}
