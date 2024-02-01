import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username = '';
  public password = '';

  constructor(private authService: AuthenticationService) { }

  onLogin() {
    console.log("submit button clicked");

    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        // Handle successful login (e.g., redirect to another page)
      },
      (error) => {
        console.error('Login failed:', error);
        // Handle login error (e.g., display error message)
      }
    );
  }


  ngOnInit(): void {
  }

}
