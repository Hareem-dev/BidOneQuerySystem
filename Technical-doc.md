# BidOne Query System

**Aliexis Alvarez | Technical Design Doc | 2026**





## Project Summary

BidOne Query System was designed from specifications given by the BidOne Technical Test. The goal is to create a system that mimics a helper form which can be used by members of any BidOne website. The extra functionalities include:

- ID, Issue type, and description parameters

- Existing submissions / query table

- Technical documentation



Once again, Thank you Noel and Nitin for this incredible opportunity!



## Architecture Overview

The default configured port is 5216 within the project. If the port needs to be reconfigured, it can be found in app\_frontend/src/environments/environment.ts.

Angular (Port 4200) → HTTP POST/GET → .NET API (Port 5216) → Submissions.json



## Project Structure

```

BidOneQuerySystem/

├── app\_backend/              ← .NET Core Web API

│   ├── Controllers/          ← API endpoints (POST \& GET)

│   ├── Models/               ← Data models (FormSubObj class)

│   └── Reference/            ← Enums and constants

└── app\_frontend/             ← Angular application

	 └── src/app/

	     ├── form/             ← Query submission form

	     ├── query-list/       ← Query list viewer

	     └── utils/            ← Shared utility functions

``` 



## Design Decisions

Angular 4+ frontend posting to a Web API backend (.NET Core) has been chosen after research and determining that this pipeline is more standard than an MVC application. Both Angular and .NET Core are new technologies except for the C# portions for .NET Core. Overall, Learning typescript and .NET POST GET operations were exciting and enjoyable within the one-week sprint.



## API Endpoints



Base URL: `http://localhost:5216`



---



### POST `/api/form`

Submits a new query and saves it to `submissions.json`.



**Request Body:**

```json

{

       "firstName": "John",

       "lastName": "Doe",

       "issue": "LostOrder",

       "description": "My order has not arrived."

}

```



**Response:**

```json

{

       "message": "Submission received and saved."
       
}

```



---



### GET `/api/form/Submissions`

Retrieves all submitted queries sorted by ID in descending order (newest first).



**Response:**

```json

[

       {

         "id": 2,

         "firstName": "John",

         "lastName": "Doe",

         "issue": "LostOrder",

         "description": "My order has not arrived."

       }

]

```



---



### GET `/api/form/Resources`

Retrieves all available issue types dynamically from the backend enum.



**Response:**

```json

[

       "LostOrder",

       "WrongItem",

       "WebsiteIssue",

       "Other"

]

```



## Future Improvements

### Basic HTML \& CSS design

The HTML and CSS design of the website can be improved greatly for UI / UX considerations.

### Database implementation

A database like MySQL can be implemented over .JSON files as a major improvement.

### No authentication

An admin system can easily be created and configured to hide the existing queries section.

### Sorting system

A sorting system for the view queries component can be created to display specific submissions.






