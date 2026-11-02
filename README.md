# NovaMart Platform

[![CI Pipeline](https://github.com/takwahafyen/novamart-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/takwahafyen/novamart-platform/actions/workflows/ci.yml)
[![Docker](https://img.shields.io/badge/Docker-Multi--stage-blue.svg?logo=docker)](https://www.docker.com/)
[![Next.js](https://img.shields.io/badge/Next.js-13%2B-black?logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg?logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

NovaMart is a modern full-stack e-commerce ecosystem composed of a responsive customer storefront, a merchant administration dashboard, and a containerized Node.js/Express REST API backed by MongoDB.

---

## 🏛️ Architecture Overview

The repository is organized as a modular monorepo:

```text
├── backend/            # Express.js REST API, Mongoose Models, Business Logic
├── frontend/           # Next.js Customer Storefront (SSR / CSR)
├── admin-dash/         # Next.js Merchant Analytics & Catalog Dashboard
├── .github/workflows/  # CI/CD Workflows (Lint, Build, Automated Docker Publishing)
├── Dockerfile          # Multi-stage production container build for backend
└── docker-compose.yml  # Local multi-service orchestration (Backend + MongoDB)
```

### Architecture Diagram

```mermaid
graph TD
    Client[Customer Browser] -->|HTTPS| Storefront[Next.js Storefront (Vercel)]
    Admin[Merchant Browser] -->|HTTPS| Dashboard[Next.js Admin Dashboard]
    Storefront -->|REST API| API[Express API (Docker Container)]
    Dashboard -->|REST API| API
    API -->|Mongoose Driver| DB[(MongoDB Atlas / Local)]
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or later)
- [Docker & Docker Compose](https://www.docker.com/) (Optional for containerized run)
- [Git](https://git-scm.com/)

### 1. Clone & Configure Environment

```bash
git clone https://github.com/<your-username>/novamart-platform.git
cd novamart-platform

# Copy the environment file template
cp .env.example .env
```
Fill in your credentials in `.env` (MongoDB URI, JWT secret, etc.).

### 2. Run with Docker Compose (Recommended)

To launch the backend API and a local MongoDB instance with persistent volumes in one command:

```bash
docker compose up -d
```
The API is live at `http://localhost:5000` with the healthcheck available at `http://localhost:5000/api/health`.

### 3. Run Manually

```bash
# Install root dependencies
npm install

# Run backend
npm run backend

# In a separate terminal: Run customer storefront
cd frontend && npm install && npm run dev

# In another terminal: Run admin dashboard
cd admin-dash && npm install && npm run dev
```

---

## 🌳 Git & Branching Strategy (GitHub Flow)

This project strictly follows an enterprise Git branching model:

* **`main` (Production)** : 
  * Protected branch. Only merged via verified Pull Requests.
  * Triggers the production deployment on **Vercel** (frontend) and builds/pushes the Docker image to **GitHub Container Registry (GHCR)**.
* **`develop` (Staging / Integration)** :
  * Integration branch for pre-production testing and automated CI validation.
* **`feature/<name>`** :
  * Feature branches branched from `develop` and merged back using PRs.

```text
feature/* ──(PR)──> develop ──(PR / Release)──> main ──> Vercel & Docker Build
```

---

## ⚙️ CI/CD Pipeline

| Pipeline | Trigger | Role |
| :--- | :--- | :--- |
| **CI Validation** (`ci.yml`) | Push / PR on `main`, `develop` | Syntax validation, dependency check, Next.js build verification |
| **Docker Release** (`backend-docker.yml`) | Merge into `main` | Multi-stage build and publish to GitHub Container Registry |
| **Vercel Deployment** | Git Push / Webhook | Automatic preview (develop) and production release (main) |

---

## 🛡️ Security Features
- **Zero Secrets in VCS**: `.gitignore` strictly configured for all environment files.
- **Docker Least Privilege**: Container runs under a non-root `appuser` (UID 1001).
- **Automated Healthchecks**: Built-in `/api/health` monitoring memory and database connection state.
- **CORS & JSON Sanitation**: Middlewares configured to prevent payload injection.

---

## 📄 License
Distributed under the MIT License.
