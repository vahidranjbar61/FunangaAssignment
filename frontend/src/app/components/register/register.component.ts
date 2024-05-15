import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthResponse, HttpService, RegisterRequest} from "../../services/http.service";
import {Router} from "@angular/router";
import {emailErrors, passwordErrors} from "../../common/util";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  public registerForm: FormGroup;

  constructor(
    private readonly httpService: HttpService,
    private readonly fb: FormBuilder,
    private readonly router: Router,
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators['required'], Validators.email]],
      password: ['', [ Validators['required'], Validators.minLength(8)]],
    });
  }

  public getFormControlError(controlName: string): string | null {
    const control = this.registerForm.get(controlName);
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
    if (this.registerForm.invalid) {
      return;
    }
    const requestBody: RegisterRequest = {
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
    };

    this.httpService.register(requestBody).subscribe((response: AuthResponse) => {
      if (response.statusCode === 201) {
        this.router.navigate(['login']);
      }
    });
  }
}
