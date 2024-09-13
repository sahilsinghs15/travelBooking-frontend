# Travel Booking Web Application

A full-stack travel booking web application built using **React**, **Redux**, **TypeScript**, **Tailwind CSS**, and **Node.js**. The application allows users to explore, search, and book travel packages, manage their profiles, and view their bookings.

## Features
- Travel package listings with search and filters
- Authentication (Sign up, Log in, Log out, Profile Management)
- Booking flow with traveler details
- Redux state management for authentication and booking
- Unit testing with Jest and React Testing Library
- Responsive design using Tailwind CSS and DaisyUI

## Installation and Setup

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```
   https://github.com/sahilsinghs15/travelBooking-frontend.git 

### Navigate into the project directory:

  ```
    cd frontend
    Install dependencies:

  ```
    npm install
  Start the development server:

  ```
    npm run dev
  To run the tests:

  ```
    npm run test
  To build the application for production:

  ```
    npm run build
  
  ### API Integration
  This project uses mock data for testing purposes, but it is structured to integrate with a Node.js/Express backend for dynamic data.

  ### Scripts

  npm run dev: Starts the development server using Vite.
  npm run build: Builds the application for production.
  npm run test: Runs the Jest tests.
  npm run lint: Runs ESLint to analyze the code for potential errors.

### Testing
  Unit tests are written using Jest and React Testing Library. To run the tests:

npm run test

  You can also run individual test suites or watch the tests during development.

```
### Imports Overview
  Key imports used across the project include:

// React-related imports
```
  import React from 'react';
  import ReactDOM from 'react-dom';
  import { BrowserRouter } from 'react-router-dom';

```
// Redux-related imports

```
  import { Provider } from 'react-redux';
  import store from './Redux/store';
```

// Tailwind CSS
```
  import 'tailwindcss/tailwind.css';
```
// Axios for API calls
```
  import axios from 'axios';
```
  
### Contribution
  If you'd like to contribute to the project, feel free to fork the repository, create a new branch, and submit a pull request. Any contributions are welcome! 

