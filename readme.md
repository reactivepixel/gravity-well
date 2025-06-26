# Grok Workspace Instructions: Gravity SaaS

## Project Overview

Gravity is a SaaS platform for businesses of various types (e.g., catering, retail, logistics) to manage operations, including CRM, inventory, and worker/resource tracking. Core features include:

- **Event Management**: Create events, specify locations, assign staff, select resources (e.g., recipes for catering), and define details (e.g., attendee count).
- **Resource and Inventory Management**: Store resources (e.g., recipes, products) and generate supply lists based on event needs (e.g., 50 chicken breasts for 100 attendees if a dish serves 10 with 5 breasts).
- **Task Management**: Auto-generate tasks for sourcing resources, assign tasks to staff, and provide a "My Tasks" view for staff to update statuses or ask questions.
- **Modularity**: Features are developed as modules (e.g., catering recipes, retail inventory) that can be enabled/disabled per client. Custom modules can be developed exclusively for a single client and restricted from other clients.
- **Target Audience**: Small to medium businesses with diverse operational needs.

## Tech Stack

- **Backend**: Node.js (no TypeScript), microservices architecture, RESTful APIs, Sequelize for PostgreSQL interactions, event-driven system using RabbitMQ.
- **Database**: PostgreSQL, hosted in a Docker container locally.
- **Frontend**:
  - **Web**: React.js with Material-UI (MUI) for UI components and styling, optimized for management tasks (event/task creation, inventory/module management). Uses **Vite** for fast development and static builds, **React Router** for client-side routing, and **Jotai** for lightweight state management.
- **Containerization**: Docker and docker-compose for services: Node.js microservices (e.g., CRM, inventory, task management), PostgreSQL, RabbitMQ, Nginx (for local hosting of the web app).
- **CI/CD**: GitHub Actions for linting (ESLint), testing (Jest, Cypress), building, and deploying Docker images. Images stored in GitHub Container Registry.
- **Monitoring/Logging**: Winston for logging, Sentry for error tracking, Prometheus for metrics.

## Architecture

- **Microservices**: Separate services for core features (CRM, inventory, task management, event management) and modules (e.g., catering recipes, retail stock). Each service has its own Sequelize models and RESTful API endpoints.
- **Modularity**:
  - Modules are implemented as microservices or plugins within existing services, with configuration flags to enable/disable per client.
  - Custom modules are developed as isolated microservices, with access restricted via client-specific API keys or database schemas.
  - Use a module registry in PostgreSQL to track available modules and client permissions.
- **Event-Driven System**: RabbitMQ handles events (e.g., task creation triggers inventory updates). Modules subscribe to relevant events for integration.
- **API**: The React.js web frontend connects to microservices via RESTful APIs, with module-specific endpoints exposed based on client configuration. Axios is used for API calls.

## User Roles and Permissions

- **Super Admin**: Full access (our staff), including module management.
- **Owner**: Full access to their business account, can enable/disable modules.
- **Co-Owner**: Equal privileges as Owner.
- **Manager**: Create/edit events, assign tasks, manage staff and inventory within enabled modules.
- **Staff**: View/update assigned tasks, access "My Tasks" view, send messages, use GPS/time clock features within enabled modules.
- **Client**: Restricted access to view/sign off on contract/logistics details, communicate with the business, limited to relevant modules.
- **Implementation**: Use role-based access control (RBAC) with JWT authentication. Store roles and module permissions in PostgreSQL, enforce in API endpoints.

## Platform Details

- **Web**: React.js with Material-UI, optimized for management tasks (event creation, task assignment, inventory/module management). Material-UI provides responsive components and animations (e.g., transitions for modals, slide-ins for task updates). Uses **Vite** for development and static builds, **React Router** for client-side routing, and **Jotai** for state management. The web app is hosted locally via Nginx in a Docker container or deployed statically (e.g., on AWS S3).

## Development Process

- **Kanban**: Use GitHub Projects with columns: Backlog, To Do, In Progress, Testing, Done. Prioritize tasks based on user impact and module dependencies.
- **Version Control**: Feature branches (e.g., `feature/catering-module`) merged into `main` via pull requests. Commit messages: `[type]: description` (e.g., `feat: add catering recipe endpoint`).
- **Testing**: Unit tests (Jest) and end-to-end tests (Cypress). Target 80% code coverage. Test microservices, modules, and React.js frontend independently, including API integrations, module enable/disable logic, Material-UI component rendering, React Router navigation, and Jotai state updates.

## Setup

- **Prerequisites**: Install Docker, Node.js v18, PostgreSQL client.
- **IDE**: Use VS Code with ESLint, Prettier, Sequelize, React, and Vite extensions.
- **Local Development**:
  - Run `docker-compose up` to start microservices, PostgreSQL, RabbitMQ, and Nginx (serving the React.js web app).
  - Use **Vite** to scaffold and run the React frontend: `npm create vite@latest` with the React template, then `npm install @mui/material @emotion/react @emotion/styled react-router-dom @jotai/core axios` for Material-UI, routing, state management, and API calls.
  - Configure Vite to bundle Material-UI’s styles and optimize for static output.
  - Use `.env` files for configuration, including module settings, API endpoints, and Vite’s base URL for static hosting.
  - Example Vite setup for Material-UI and React Router:
    ```bash
    npm create vite@latest my-app -- --template react
    cd my-app
    npm install @mui/material @emotion/react @emotion/styled react-router-dom @jotai/core axios
    npm run dev
    ```

## Security

- **Authentication**: JWT for role-based and module-based access, enforce HTTPS for local hosting. Implement secure API endpoints with client-side validation in React.
- **Secrets**: Store in GitHub Secrets for CI/CD, `.env` files locally.
- **Compliance**: Ensure GDPR compliance for user data (e.g., client/staff info) stored in PostgreSQL.
- **Module Isolation**: Use client-specific API keys and database schemas to restrict custom modules.

## Deployment

- **Target**: Local hosting using Docker containers for Node.js microservices, PostgreSQL, RabbitMQ, and Nginx (serving the React.js web app). For static hosting (e.g., AWS S3), use Vite’s `npm run build` to generate a `dist` folder with static assets (HTML, CSS, JS).
- **CI/CD Workflow**: GitHub Actions for linting, testing, building Docker images, and deploying to local Docker or S3. For S3, sync the `dist` folder using AWS CLI. Use environment-specific docker-compose files (dev vs. prod).
- **Module Deployment**: Package modules as separate Docker containers or service extensions, deployed based on client configuration. The React.js frontend dynamically loads module-specific Material-UI components based on API responses, using React Router for navigation and Jotai for state.
- **S3 Configuration**:
  - Configure the S3 bucket for static website hosting (set `index.html` as index and error document).
  - Use AWS CloudFront for CDN acceleration and redirect all routes to `index.html` for React Router support.
  - Example GitHub Actions workflow for S3:
    ```yaml
    name: Deploy to S3
    on:
      push:
        branches: [main]
    jobs:
      deploy:
        runs-on: ubuntu-latest
        steps:
          - uses: actions/checkout@v4
          - uses: actions/setup-node@v4
            with:
              node-version: 18
          - run: npm ci
          - run: npm run build
          - uses: aws-actions/configure-aws-credentials@v4
            with:
              aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
              aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
              aws-region: us-east-1
          - run: aws s3 sync dist/ s3://my-gravity-bucket --delete
    ```

## Monitoring and Logging

- **Logging**: Winston for application logs, stored in a Docker volume, with module-specific log tagging.
- **Error Tracking**: Sentry for production error monitoring, including module, frontend, and Jotai state errors.
- **Metrics**: Prometheus for microservice and frontend health/performance, monitored locally.

## Development Notes

- Use Grok to generate boilerplate Node.js microservice code, Sequelize models, REST API endpoints, React.js components with Material-UI, Vite configuration, React Router setup, and Jotai state management logic.
- Regularly update the Kanban board to reflect task and module development progress.
- Test event-driven workflows (e.g., task creation triggering inventory updates), module enable/disable functionality, Material-UI animations, React Router navigation, and Jotai state updates early to ensure RabbitMQ and UI integrity.
- Document module APIs, React.js component usage, Material-UI configurations, React Router routes, and Jotai atoms in a central README for each module.
