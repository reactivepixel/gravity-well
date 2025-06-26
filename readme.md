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
- **Database**: PostgreSQL, hosted in a Docker container.
- **Frontend**:
  - **Web**: React with Ant Design (including Ant Motion for animated transitions and VFX), optimized for management tasks (event/task creation).
  - **Mobile**: React Native (iOS/Android) with Ant Design-inspired components (via community libraries like `react-native-ant-design`), focused on task updates and staff workflows.
  - **Desktop**: Tauri (Windows, macOS, Linux) with React and Ant Design, mirroring web functionality for management tasks, leveraging native WebViews for lightweight, secure apps.
- **Containerization**: Docker and docker-compose for services: Node.js microservices (e.g., CRM, inventory, task management), PostgreSQL, RabbitMQ, Nginx (production).
- **CI/CD**: GitHub Actions for linting (ESLint), testing (Jest, Cypress), building, and deploying to AWS ECS. Docker images stored in GitHub Container Registry. Tauri apps built using `tauri-action`.
- **Monitoring/Logging**: Winston for logging, Sentry for error tracking, Prometheus for metrics.

## Architecture

- **Microservices**: Separate services for core features (CRM, inventory, task management, event management) and modules (e.g., catering recipes, retail stock). Each service has its own Sequelize models and RESTful API endpoints.
- **Modularity**:
  - Modules are implemented as microservices or plugins within existing services, with configuration flags to enable/disable per client.
  - Custom modules are developed as isolated microservices, with access restricted via client-specific API keys or database schemas.
  - Use a module registry in PostgreSQL to track available modules and client permissions.
- **Event-Driven System**: RabbitMQ handles events (e.g., task creation triggers inventory updates). Modules subscribe to relevant events for integration.
- **API**: Each UI (web, mobile, desktop) connects to microservices via RESTful APIs, with module-specific endpoints exposed based on client configuration. Tauri uses `axios-tauri-adapter` for API calls.

## User Roles and Permissions

- **Super Admin**: Full access (our staff), including module management.
- **Owner**: Full access to their business account, can enable/disable modules.
- **Co-Owner**: Equal privileges as Owner.
- **Manager**: Create/edit events, assign tasks, manage staff and inventory within enabled modules.
- **Staff**: View/update assigned tasks, access "My Tasks" view, send messages, use GPS/time clock features within enabled modules.
- **Client**: Restricted access to view/sign off on contract/logistics details, communicate with the business, limited to relevant modules.
- **Implementation**: Use role-based access control (RBAC) with JWT authentication. Store roles and module permissions in PostgreSQL, enforce in API endpoints. Tauri’s permission system enhances security for desktop apps.

## Multi-Platform Details

- **Web**: React with Ant Design, optimized for management tasks (event creation, task assignment, inventory/module management). Ant Motion provides smooth transitions and VFX (e.g., modal animations).
- **Desktop**: Tauri with React and Ant Design, using native WebViews (WebView2, WKWebView, WebKitGTK) for lightweight, secure apps. Mirrors web functionality, with Ant Motion animations tested for WebView compatibility.
- **Mobile**: React Native for iOS/Android, focused on staff workflows (task updates, "My Tasks" view, messaging, GPS/time clock). Ant Design-inspired components via community libraries ensure consistent design.
- **Shared Codebase**: Use React Native for mobile with platform-specific optimizations. Share core API client logic and Ant Design components across platforms, with module-specific UI components loaded dynamically based on client configuration.

## Development Process

- **Kanban**: Use GitHub Projects with columns: Backlog, To Do, In Progress, Testing, Done. Prioritize tasks based on user impact and module dependencies.
- **Version Control**: Feature branches (e.g., `feature/catering-module`) merged into `main` via pull requests. Commit messages: `[type]: description` (e.g., `feat: add catering recipe endpoint`).
- **Testing**: Unit tests (Jest) and end-to-end tests (Cypress). Target 80% code coverage. Test microservices, modules, and Tauri apps independently, including API integrations, module enable/disable logic, and WebView rendering.

## Setup

- **Prerequisites**: Install Docker, Node.js v18, Rust (for Tauri), PostgreSQL client.
- **IDE**: Use VS Code with ESLint, Prettier, Sequelize, Rust, and Tauri extensions.
- **Local Development**: Run `docker-compose up` to start microservices, PostgreSQL, RabbitMQ. Use `create-tauri-app` to scaffold Tauri apps. Use `.env` files for configuration, including module settings.

## Security

- **Authentication**: JWT for role-based and module-based access, enforce HTTPS. Tauri’s permission system and Rust backend enhance desktop security.
- **Secrets**: Store in GitHub Secrets for CI/CD, `.env` files locally.
- **Compliance**: Ensure GDPR compliance for user data (e.g., client/staff info).
- **Module Isolation**: Use client-specific API keys and database schemas to restrict custom modules. Tauri’s IPC security (audited in 2024) ensures safe frontend-backend communication.

## Deployment

- **Target**: AWS ECS for microservices, RDS for PostgreSQL. Tauri apps distributed as signed binaries (Windows, macOS, Linux) via AWS S3 or client portals.
- **CI/CD Workflow**: GitHub Actions for linting, testing, building Docker images, and deploying. Use `tauri-action` for Tauri app builds. Use environment-specific docker-compose files (dev vs. prod).
- **Module Deployment**: Package modules as separate Docker containers or service extensions, deployed based on client configuration. Tauri apps bundle module-specific UI components dynamically.

## Monitoring and Logging

- **Logging**: Winston for application logs, stored in a Docker volume, with module-specific log tagging. Tauri logs managed via Rust’s logging framework.
- **Error Tracking**: Sentry for production error monitoring, including module and Tauri app errors.
- **Metrics**: Prometheus for microservice, module, and Tauri app health/performance.

## Development Notes

- Use Grok to generate boilerplate Node.js microservice code, Sequelize models, REST API endpoints, Tauri app scaffolding, and module configuration logic.
- Regularly update the Kanban board to reflect task and module development progress.
- Test event-driven workflows (e.g., task creation triggering inventory updates), module enable/disable functionality, and Tauri’s WebView rendering early to ensure RabbitMQ, configuration, and Ant Design animation integrity.
- Document module APIs, Tauri configurations, and Ant Design component usage in a central README for each module.
