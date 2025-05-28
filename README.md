# MovieDiscovery

MovieDiscovery is a web application built with Angular that allows users to discover movies, view details, and explore content interactively. This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.19.

---

##  Features

- Search and discover movies using the TMDB API
- View detailed information about each movie
- Responsive and user-friendly UI
- Built with Angular best practices

---

##  Setup & Installation

1. **Clone the repository**  
   ```bash
   git clone <https://github.com/nishantmalik968/what-should-i-watch-tonight.git>
   cd what-should-i-watch-tonight
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Run the development server**  
   ```bash
   ng serve
   ```  
   Navigate to `http://localhost:4200/`. The app will reload automatically when you change any source files.

---

##  TMDB API Key Configuration

This project uses the TMDB API for fetching movie data.

The API key is already set in the project inside the file:

  ```ts
  export const environment = {
    production: false,
    tmdbApiKey: 'YOUR_TMDB_API_KEY',
    apiUrl: 'https://api.themoviedb.org/3'
  };
  ```

---

##  Running Tests & Code Coverage

Run the unit tests and generate a coverage report:

```bash
ng test --code-coverage
```

The coverage report will be generated in the `coverage/` folder. Open `coverage/index.html` in your browser to view the report.

---

## Project Structure

- `src/` – Main source code
- `angular.json` – Angular CLI configuration
- `package.json` – Project dependencies and scripts
- `tsconfig*.json` – TypeScript configurations

---

## CI/CD Deployment

This project uses **GitHub Actions** for continuous integration and deployment.  
On every push to the `main` branch:

- The Angular app is built using the production configuration
- It is automatically deployed to GitHub Pages using `angular-cli-ghpages`

You can find the workflow in `.github/workflows/deploy.yml`.

---

## Live Deployment

 View the deployed application here:  
 [https://nishantmalik968.github.io/what-should-i-watch-tonight/]
