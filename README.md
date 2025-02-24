# Find Repository on GitHub

## Description
A simple web application for searching repositories on GitHub. Users can enter a repository name and get a list of relevant results with key information.

## Demo
The application is available at: [Find Repository on GitHub](https://valeriyalukovkina.github.io/find-repository-github/)

## Technologies
- HTML
- CSS (SCSS)
- JavaScript
- GitHub API

## Features
- Enter a repository name in the search field
- Validation (minimum query length is 3 characters)
- Sending a request to the GitHub API
- Displaying a list of found repositories (name, owner, language, description, link to the repository)
- Local caching of the last searched repositories in `localStorage`

## Installation and Running
1. Clone the repository:
   ```sh
   git clone https://github.com/valeriyalukovkina/find-repository-github.git
   ```
2. Open `index.html` in a browser or deploy it on a server.

## Development
- The main JavaScript code (`main.js`) is responsible for handling the form, making API requests, and rendering data.
- The CSS file (`style.css`) styles the interface.
- SCSS (`style.scss`) is used for more convenient styling.
