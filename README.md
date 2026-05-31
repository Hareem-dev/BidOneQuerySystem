### **AAlvarez\_BidOneQuerySystem\_TechnicalInterview2026**



Query system designed and built for Bid One's stage 2 technical test. Features two-way communication between frontend web api and backend .NET architecture.

Users can submit and view existing help requests! Ideally, the view existing requests will be designated to an admin section for BidOne employees.



###### **Tech Stack**

Frontend: Angular 17

Backend: .NET Core Web API

Data Storage: JSON file



###### **Prerequisites**

Before running this project, make sure you have the following installed:

*Node.js v20 LTS*

*.NET Core SDK 8.0+*

*Angular CLI v17 — install with npm install -g @angular/cli*



###### **Features**

Submit a help request via a form with first name, last name, issue type and description fields.

Select an issue type from a dropdown populated dynamically from the backend.

View all previously submitted queries in a sorted query list (sorted by descending ID).

Navigate between components using the navigation bar.

***Submitted data is saved to submissions.json in the app\_backend folder.***



###### **Getting started**

This project requires two terminals running simultaneously.

Clone the repository:
```bash

git clone https://github.com/Hareem-dev/BidOneQuerySystem
cd BidOneQuerySystem

```



```bash

*Terminal 1 — Backend:*

cd app_backend

dotnet run

```



```bash

*Terminal 2 — Frontend:*

cd app_frontend

ng serve

```



Then open your browser and navigate to http://localhost:4200.

Note: If your backend runs on a different port than 5216, update the apiUrl in app\_frontend/src/environments/environment.ts to match.

Note: submissions.json will be created automatically on first submission.



###### **Extra**

API Endpoints (available through 'app\_frontend/src/app/utils/api-constants.ts'

Method: POST - '/api/form' - Submit a new query.

Method: GET - '/api/form/Submissions' - Retrieve all submitted queries.

Method: GET - '/api/form/Resources' - Retrieve available issue types.



Application backend can be explicitly tested through Postman or any API client. (I used Postman to test and verify backend)





*Made by Aliexis Alvarez 2026. Thank you Noel and Nitin for giving me this opportunity!*

