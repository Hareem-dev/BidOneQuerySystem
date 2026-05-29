import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINTS } from '../utils/api-constants';
import { formatEnumValue } from '../utils/general-utils';

// Kept here for now, might move to utils or a separate file if needed later.
interface Query {
  id: number;
  firstName: string;
  lastName: string
  issue: string;
  description: string;
}

@Component({
  selector: 'app-query-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './query-list.component.html',
  styleUrl: './query-list.component.css'
})
export class QueryListComponent {
  // empty array to hold the list of queries from the backend.
  queries: Query[] = [];

  errorMessage: string = '';
  isError: boolean = false;

  constructor(private http: HttpClient) {}

  // When the component initializes, we want to fetch the list of queries from the backend.
  ngOnInit() {
    this.http.get<Query[]>(API_ENDPOINTS.GET_SUBMISSIONS)
      .subscribe({
        next: (data) => {
          this.queries = data.map(query => ({
            ...query,
            issue: formatEnumValue(query.issue) // Format the issue field for better display
          }));
        },
        error: () => {
          // Handle error, e.g., show a message to the user
          this.errorMessage = 'Failed to load queries. Please try again later.';
          this.isError = true;
        }
      });
    }
    
}
