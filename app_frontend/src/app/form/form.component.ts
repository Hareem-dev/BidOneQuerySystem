import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

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
  // NEW feature to allow users to select the type of issue they are dealing with.
  // issue types is hard coded for now until I learn GET requests.
  issue: string = '';
  issuetypes: { label: string; value: string }[] = [
    { label: 'Lost Order', value: 'LostOrder' },
    { label: 'Wrong Item', value: 'WrongItem' },
    { label: 'Website Issue', value: 'WebsiteIssue' },
    { label: 'Other', value: 'Other' }
  ];

  description: string = '';
  message: string = '';
  isError: boolean = false;

  constructor(private http: HttpClient) {}

  // Im assubing onSubmit is like an event trigger from Unity C#.
  // I would attach this to buttons or UI elements back in game development.
  onSubmit() {
    // Basic Validation
    if (!this.firstName || !this.lastName || !this.issue || !this.description) {
      this.message = 'please fill in all fields.';
      this.isError = true;
      return;
    }

    const payload = {
      firstName: this.firstName,
      lastName: this.lastName,
      issue: this.issue,
      description: this.description
    };

    // post uses an address which can be changed in the environment file found in
    // src/environments/environment.ts if your backend is running on a different port, please change the apiUrl value in that file.
    this.http.post(`${environment.apiUrl}/api/form`, payload)
    .subscribe({
      next: () => {
        this.message = 'Form submitted successfully!';
        this.isError = false;
        this.firstName = '';
        this.lastName = '';
        this.issue = '';
        this.description = '';
      },
      error: () => {
        this.message = 'Something went wrong, ensure the backend is running.';
        this.isError = true;
      }
    });
  }
}
