import { environment } from '../../environments/environment';

// Centralized API endpoints for easy management and consistency across the application.
// I noticed that API endpoints were being fairly re-used across the application
// In game development, programmers try not to use hardcoded values so I think this is my take on the concept.

export const API_ENDPOINTS = {
    GET_ISSUE_TYPES: `${environment.apiUrl}/api/form/Resources`,
    SUBMIT_FORM: `${environment.apiUrl}/api/form`,
    GET_SUBMISSIONS: `${environment.apiUrl}/api/form/Submissions`
};