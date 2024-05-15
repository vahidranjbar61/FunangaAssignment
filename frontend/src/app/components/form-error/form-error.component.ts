import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.css'
})
export class FormErrorComponent {
  @Input() errorMessage: string | null = null;
  @Input() form!: FormGroup;
  @Input() controlName!: string;

  private emailErrors = {
    required: 'Email is required.',
    email: 'Invalid email address.'
  };

  private passwordErrors = {
    required: 'Password is required.',
    minlength: 'Password must be at least {{ requiredLength }} characters long.',
    pattern: 'Password must contain a mix of uppercase, lowercase letters, numbers and special characters.'
  };

  public getFormControlError(): string | null {
    const control = this.form.get(this.controlName);
    if (control?.invalid && control?.touched) {
      if (this.controlName === 'email') {
        if (control.errors?.['required']) {
          return this.emailErrors['required'];
        } else if (control.errors?.['email']) {
          return this.emailErrors['email'];
        }
      } else if (this.controlName === 'password') {
        if (control.errors?.['required']) {
          return this.passwordErrors['required'];
        }
      }
    }
    return null;
  }
}
