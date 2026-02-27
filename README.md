# Oblenergo Fullstack

## Run with Docker Compose

```bash
docker compose up --build
```

The stack starts:
- MySQL on `localhost:3306`
- Backend on `localhost:8080`
- Frontend on `localhost:3000`

## Troubleshooting on Windows

If you see an error like:

- `open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified`

it means Docker Engine is not running (Docker Desktop is stopped) or CLI is pointing to a non-existing context.

1. Start **Docker Desktop** and wait until status becomes **Engine running**.
2. Verify in terminal:
   ```bash
   docker version
   docker info
   docker context ls
   docker context use default
   ```
3. Retry:
   ```bash
   docker compose up --build
   ```

## Login

Use these default credentials in the app login form:
- username: `admin`
- password: `admin123`
