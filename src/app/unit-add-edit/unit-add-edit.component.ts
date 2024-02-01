import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OperationalUnitService } from '../services/operationalunit.service';

@Component({
  selector: 'app-unit-add-edit',
  templateUrl: './unit-add-edit.component.html',
  styleUrls: ['./unit-add-edit.component.css']
})
export class UnitAddEditComponent implements OnInit {
  operationalUnitForm: FormGroup;
  
  constructor(private fb: FormBuilder, private service: OperationalUnitService) { 
    this.operationalUnitForm = this.fb.group({
      operationalUnitId: '',
      organizationId: '',
      unitNameEn: '',
      unitNamBn: '',
      majorGoodsOrService: '',
      remarks: '',
      unitOpenDate: '',
      active: '',
      unitClosedDate: '',
     address: '',
      serialNo: '',
      unitType: ''
      });

  }

  ngOnInit(): void {
  }

  onFormSubmit() {

  }

}
