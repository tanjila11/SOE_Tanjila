import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Operationalunit } from '../models/operationalunit.model';


@Injectable({
  providedIn: 'root'
})
export class OperationalUnitService {
  baseUrl = environment.apiUrl;
 //5176

// private urlUser = "http://localhost:9002/api/OperationalUnits/Get_All";
// http://localhost:9000/gw/budget/GetAllOperationalUnit

  constructor(private http:HttpClient) { 
    }

    //*************************
    listOperationalUnit:Operationalunit[] = [];
    operationalUnitData:Operationalunit = new Operationalunit(); // for post data
    
    getList(): Observable<any> {
         return this.http.post<any>(this.baseUrl + 'budget/GetAllOperationalUnit', {});
        //return this.http.post('http://localhost:9002/api/OperationalUnits/GetFullList',{});

        // return this.client.get('http://localhost:9000/gw/budget/GetAllOperationalUnit');
    }

    
  
    getSerialNumberByOrganization(organizationId:number): Observable<any>{

      const url =  this.baseUrl +`budget/GetMaxSerial`;
      //const url = `http://localhost:9002/api/OperationalUnits/GetMaxSerial`;
      const body = { OrganizationId: organizationId }; // Request body

      return this.http.post(url, body, { });
    }
  
    add(data: any) {
      console.log("enter add service method");
      return this.http.post (this.baseUrl +'budget/SaveOperationalUnit', data);
   
     // return this.http.post('http://localhost:5176/api/OperationalUnits/Save', data);
      
    }

    update(id: number, data: any){
      return this.http.post( this.baseUrl +`budget/UpdateOperationalUnit`, data);
     // return this.http.post(`http://localhost:9002/api/OperationalUnits/Update`, data);
    
    }


/*
    delete(id: number) {
      //return this.client.delete(`http://localhost:9002/api/OperationalUnits/Remove/${id}`);
      return this.http.post(`http://localhost:9002/api/OperationalUnits/Remove/`,{id});
    }
*/
    delete2(id: number,data: any){
      console.log("enter delete service method");
      console.log(id,data);
      return this.http.post(this.baseUrl  +`budget/DeleteOperationalUnit`,data);
     // return this.http.post(`http://localhost:5176/api/OperationalUnits/Remove`,data);
      //return this.http.post(`http://localhost:9000/gw/budget//DeleteOperationalUnit`,data);
    }
}




