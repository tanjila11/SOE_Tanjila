import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  /*
  getMenuItems(): Observable<string[]> {
    return of(['Home', 'About', 'Contact']);
  }
  */
  getMenuitemList(){
return ['Home', 'About', 'Contact', 'Login'];

  }
}
