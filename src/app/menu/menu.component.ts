import { Component, OnInit } from '@angular/core';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
  //,providers:[MenuService]
})
export class MenuComponent implements OnInit {

  public menuItems:any;
  constructor(private mns:MenuService) {
    
  this.menuItems = mns.getMenuitemList();

   }
   
   isLoginFormVisible = false;

   toggleLoginForm() {
     this.isLoginFormVisible = !this.isLoginFormVisible;
   }

  ngOnInit(): void {
  }

}
