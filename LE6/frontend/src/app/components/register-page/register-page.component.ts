import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: false,
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
    firstName: null,
    lastName: null
  }

  loading = false;
  error = '';

  constructor(private http: HttpClient,
    private route: Router,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const {
      username, password, firstName, lastName
    } = this.form

    this.loading = true;
    this.error = '';

    console.log(this.form);

    this.http.post("https://localhost:7161/api/Login/register", this.form, { responseType: 'text' }).subscribe({
      next: () => {
        this.route.navigate(['/login'])
      },
      error: () => {
        this.error = 'Could not create the account. Username and password must be 16 characters or fewer.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    })
  }

}
