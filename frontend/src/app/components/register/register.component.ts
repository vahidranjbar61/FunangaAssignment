import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthResponse, HttpService, RegisterRequest} from "../../services/http.service";
import {Router} from "@angular/router";

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
