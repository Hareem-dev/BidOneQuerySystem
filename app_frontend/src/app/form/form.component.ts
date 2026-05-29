import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { formatEnumValue } from '../utils/general-utils';
import { API_ENDPOINTS } from '../utils/api-constants';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{
  firstName: string = '';
  lastName: string = '';
  // feature to allow users to select the type of issue they are dealing with.
  issue: string = '';
  //Start with an empty array. We populate it using the GET request.
  issueTypes: { label: string; value: string }[] = [];
  description: string = '';
  message: string = '';
  isError: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Fetch issue types from the backend when the component initializes.
    this.http.get<string[]>(API_ENDPOINTS.GET_ISSUE_TYPES)
      .subscribe({
        next: (data) => {
          this.issueTypes = data.map(value => ({ label: formatEnumValue(value), value: value }));
        },
        error: () => {
          // If this fails, we respond back with failed to load resources.
          this.message = 'Failed to load resources. Please try again later.';
          this.isError = true;
        }
      });
  }


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
    this.http.post(API_ENDPOINTS.SUBMIT_FORM, payload)
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
