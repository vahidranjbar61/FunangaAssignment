## Deployment

To deploy this project, navigate to the root folder of the project where docker-compose.yml file resides and run

```bash
  docker-compose up --build
```

### Side note
I've developed both the backend API (using Symfony) and the frontend application (using Angular) for this project. I've also set up the infrastructure using Docker Compose, Nginx as a reverse proxy and MySQL database.

While each component functions independently, I could not establish the communication between the frontend and backend.

- These routes are available here http://localhost:3000:
```bash
  /login
  /register
  /home
  /logout
  /
```
- I have implemented ``` json-login``` method of user authentication
