import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  firstName: string = '';
  lastName: string = '';
  description: string = '';
  message: string = '';
  isError: boolean = false;

  constructor(private http: HttpClient) {}

  onSubmit() {
    // Basic Validation
    if (!this.firstName || !this.lastName || !this.description) {
      this.message = 'please fill in both fields.';
      this.isError = true;
      return;
    }

    const payload = {
      firstName: this.firstName,
      lastName: this.lastName,
      description: this.description
    };

    this.http.post('http://localhost:5216/api/form', payload)
    .subscribe({
      next: () => {
        this.message = 'Form submitted successfully!';
        this.isError = false;
        this.firstName = '';
        this.lastName = '';
        this.description = '';
      },
      error: () => {
        this.message = 'Something went wrong, ensure the backend is running.';
        this.isError = true;
      }
    });
  }
}
