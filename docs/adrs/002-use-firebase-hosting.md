# 2. Use Firebase App Hosting for Frontend Deployment

## Status

Accepted

## Context

We need a reliable, scalable, and easy-to-manage solution for hosting and deploying the frontend of the Cloud Coffee Corner application. The frontend consists of static assets (HTML, CSS, JavaScript) that need to be delivered globally with low latency. Key requirements include a streamlined developer experience, integration with a CI/CD pipeline, and built-in features like SSL and CDN.

## Decision

We will use **Firebase App Hosting** to serve the frontend of the application.

## Consequences

### Positive

*   **Simplicity and Speed:** Firebase Hosting is designed for simplicity. Deploying the frontend is typically a single command (`firebase deploy`), which simplifies the CI/CD pipeline.
*   **Global CDN:** All deployed assets are automatically cached on Firebase's global CDN, ensuring fast delivery to users anywhere in the world.
*   **Zero-Config SSL:** SSL certificates are provisioned and renewed automatically, ensuring the application is secure without manual configuration.
*   **Tight Integration:** Firebase is tightly integrated with other Google Cloud services, which aligns with our overall technology stack.
*   **Versioning and Rollbacks:** Firebase Hosting keeps a history of deployments, allowing for easy one-click rollbacks to a previous version if a bug is discovered.

### Negative

*   **Platform Lock-in:** While it integrates well with Google Cloud, it is a proprietary service. Migrating to another hosting provider in the future would require changes to the deployment process.
*   **Limited Server-Side Logic:** Firebase Hosting is primarily for static assets. While it can be integrated with Cloud Functions for server-side logic, it is not a traditional server environment. This is acceptable for our architecture, as all dynamic logic is handled by our backend microservices.
