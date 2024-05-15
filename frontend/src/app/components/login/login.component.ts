import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpService, LoginRequest, LoginResponse} from "../../services/http.service";
import {Router} from "@angular/router";
import {emailErrors, passwordErrors} from "../../common/util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public userIsLoggedIn = false;
  public loginForm: FormGroup;
  constructor(
    private readonly httpService: HttpService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators['required'], Validators.email]],
      password: ['', [ Validators['required'], Validators.minLength(8)]],
      rememberMe: [false]
    });
  }

  public getFormControlError(controlName: string): string | null {
    const control = this.loginForm.get(controlName);
    if (control?.invalid && control?.touched) {
      if (controlName === 'email') {
        if (control.errors?.['required']) {
          return emailErrors['required'];
        } else if (control.errors?.['email']) {
          return emailErrors['email'];
        }
      } else if (controlName === 'password') {
        if (control.errors?.['required']) {
          return passwordErrors['required'];
        }
      }
    }
    return null;
  }


  public onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const requestBody: LoginRequest = {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value,
      rememberMe: this.loginForm.controls['rememberMe'].value,
    };

    this.httpService.login(requestBody).subscribe((response: LoginResponse) => {
      if (response.statusCode === 200 && response.email) {
        this.userIsLoggedIn = true;
        this.router.navigate(['home']);
      }
    });
  }
}
