## Deployment

To deploy this project, navigate to the root folder of the project where docker-compose.yml file resides and run

```bash
  docker-compose up --build
```

### Side note
I've developed both the backend API (using Symfony) and the frontend application (using Angular) for this project. 
I've also set up the infrastructure using Docker Compose, Nginx as a reverse proxy and MySQL database.

Majority of my time, sadly, spent on environment setup and making front-end and backend communicate with each other.
I tried to have a clean code as much as possible with left-over time which I had to literally do the coding :)

- These routes are available here http://localhost:3000:
```bash
  /login
  /register
  /home
  /logout
  /
```
- I have implemented ``` json-login``` method of user authentication
