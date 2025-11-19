---
layout: inner
position: left
title: 'Apache Airflow 3.0 - Setup Collection'
date: 2025-11-05 12:00:00
categories: development data-engineering
tags: Apache-Airflow Docker Python ETL Data-Engineering Orchestration
featured_image: '/img/posts/airflow3-setup.png'
project_link: 'https://github.com/lorenzouriel/airflow3-setup'
button_icon: 'github'
button_text: 'Visit Project'
lead_text: 'Comprehensive collection of Apache Airflow 3.0 configurations and production-ready setups for different use cases, from lightweight deployments to enterprise-grade distributed orchestration.'
---

## Apache Airflow 3.0 - Setup Collection

A complete collection of Apache Airflow 3.0 configurations designed as both a learning resource and quick-start template for various deployment scenarios. From minimal local setups to production-grade distributed systems with SSO authentication.

## What Is This?

This repository provides **5 production-ready Airflow setups** covering the most common deployment scenarios:
- **Quick Development** — Lightweight configurations for fast local testing
- **Production Single-Machine** — Full-featured LocalExecutor with monitoring
- **Distributed Execution** — Scalable CeleryExecutor with worker pools
- **Alert Systems** — Multi-channel notifications (Email, Slack, Teams)
- **Enterprise Security** — SSO integration with OAuth 2.0 providers

Each setup is fully dockerized, documented, and ready to deploy in minutes.

## 🏗️ Repository Structure

```
airflow3/
├── setup-basic-pocket/          # Lightweight Airflow + PostgreSQL
├── setup-basic-local-executor/  # Full-featured LocalExecutor setup
├── setup-celery-executor/       # Production-grade CeleryExecutor
├── setup-notifications/         # Email, Slack, and Teams alerts
└── setup-sso/                   # SSO authentication integration
```

## 📦 Available Setups

### 1. Setup Basic Pocket
**Lightweight Airflow for Quick Deployments**

Minimal Apache Airflow setup with PostgreSQL, perfect for:
- Local development and testing
- CI/CD experimentation
- Lightweight servers or VPS environments
- Learning Airflow basics

**Key Features:**
- Apache Airflow 2.10.2 with LocalExecutor
- PostgreSQL backend
- Minimal configuration
- Fast startup time

---

### 2. Setup Basic Local Executor
**Complete LocalExecutor Configuration**

Full-featured Airflow 3.0 setup with advanced capabilities:
- Apache Airflow 3.0 with LocalExecutor
- SMTP email notifications
- Custom configurations via `airflow.cfg`
- Execution API for improved performance
- Health checks and monitoring

**Ideal For:**
- Production single-machine deployments
- Teams needing email notifications
- Custom configuration requirements
- API-driven integrations

---

### 3. Setup Celery Executor
**Production-Grade Distributed Execution**

Enterprise-ready Airflow setup with CeleryExecutor for distributed task processing:
- Horizontal scaling with worker pools
- Redis as message broker
- Flower for worker monitoring
- High availability configuration
- Advanced metrics and monitoring

**Ideal For:**
- Production environments
- High-volume task processing
- Distributed workloads
- Enterprise deployments

---

### 4. Setup Notifications
**Multi-Channel Alert System**

Airflow setup demonstrating integration with multiple notification channels:
- Email notifications via SMTP
- Slack webhooks integration
- Microsoft Teams alerts
- Custom notification callbacks
- Failure monitoring examples

**Ideal For:**
- Team collaboration
- Real-time failure alerts
- Multi-channel communication
- DevOps monitoring workflows

---

### 5. Setup SSO
**Enterprise Authentication Integration**

Airflow with Single Sign-On (SSO) authentication:
- OAuth 2.0 integration (Google, GitHub, Azure AD, Okta)
- Role-based access control
- Custom webserver configuration
- Enterprise security features
- Auto-user registration

**Ideal For:**
- Enterprise environments
- Organizations using SSO
- Advanced security requirements
- Multi-team deployments

## 🚀 Quick Start Guide

### Choose Your Setup

1. **Just Learning?** → Start with `setup-basic-pocket`
2. **Need Email Alerts?** → Use `setup-basic-local-executor`
3. **Scaling for Production?** → Deploy `setup-celery-executor`
4. **Want Notifications?** → Try `setup-notifications`
5. **Enterprise SSO?** → Configure `setup-sso`

### Basic Installation Steps

Each setup follows a similar pattern:

```bash
# 1. Clone the repository
git clone https://github.com/lorenzouriel/airflow3-setup.git
cd airflow3-setup/<setup-name>

# 2. Configure environment
cp .example-env .env  # If available
# Edit .env with your settings

# 3. Initialize Airflow
docker compose up airflow-init

# 4. Start services
docker compose up -d

# 5. Access Web UI
# Open http://localhost:8080
# Default credentials: admin/admin
```

## 📊 Feature Comparison

| Feature | Pocket | Local Executor | Celery Executor | Notifications | SSO |
|---------|--------|----------------|-----------------|---------------|-----|
| Airflow Version | 2.10.2 | 3.0 | 3.0 | 3.0 | 3.0 |
| Executor | Local | Local | Celery | Local | Local |
| PostgreSQL | ✅ | ✅ | ✅ | ✅ | ✅ |
| Redis | ❌ | ❌ | ✅ | ❌ | ❌ |
| Email Alerts | ❌ | ✅ | ✅ | ✅ | ❌ |
| Slack Integration | ❌ | ❌ | ❌ | ✅ | ❌ |
| Teams Integration | ❌ | ❌ | ❌ | ✅ | ❌ |
| SSO Auth | ❌ | ❌ | ❌ | ❌ | ✅ |
| Horizontal Scaling | ❌ | ❌ | ✅ | ❌ | ❌ |
| Worker Monitoring | ❌ | ❌ | ✅ (Flower) | ❌ | ❌ |
| Metrics & Stats | ❌ | ❌ | ✅ (StatsD) | ❌ | ❌ |
| API Server | ❌ | ✅ | ✅ | ✅ | ✅ |

## 🛠️ Common Operations

### View Logs
```bash
docker logs airflow-webserver -f
docker logs airflow-scheduler -f
```

### Access Airflow CLI
```bash
docker exec -it airflow-webserver airflow <command>
```

### Stop Services
```bash
docker compose down
```

### Remove All Data
```bash
docker compose down -v
```

## 🔧 Customization

### Adding Python Dependencies

Add packages to `requirements.txt`:
```txt
pandas==2.0.0
requests==2.31.0
apache-airflow-providers-amazon
```

Then rebuild:
```bash
docker compose up -d --build
```

### Custom DAGs

Place DAG files in the `dags/` directory:
```python
from airflow import DAG
from airflow.operators.bash import BashOperator
from datetime import datetime

with DAG(
    dag_id="my_dag",
    start_date=datetime(2025, 1, 1),
    schedule="@daily",
    catchup=False,
) as dag:
    task = BashOperator(
        task_id="my_task",
        bash_command="echo 'Hello Airflow!'"
    )
```

### Environment Variables

Common configuration variables in `.env` files:

```bash
# PostgreSQL
POSTGRES_USER=airflow
POSTGRES_PASSWORD=airflow
POSTGRES_DB=airflow

# Airflow
AIRFLOW_UID=50000
AIRFLOW__CORE__FERNET_KEY=<generate-key>
```

Generate Fernet key:
```bash
python3 -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

## 💡 Repository Purpose

This collection is designed to:
- **Learn** — Understand different Airflow configurations and architectures
- **Compare** — Evaluate trade-offs between different setups
- **Deploy** — Quick-start production-ready configurations
- **Customize** — Use as templates for your own deployments

## 🎯 Use Cases

### Development & Learning
- Experiment with Airflow features locally
- Learn DAG development patterns
- Test integrations before production

### Production Deployments
- Single-machine production setup (LocalExecutor)
- Distributed task processing (CeleryExecutor)
- Enterprise authentication (SSO)

### Team Collaboration
- Multi-channel notifications for alerts
- Role-based access control
- Centralized workflow orchestration

### CI/CD Integration
- Automated data pipeline testing
- ETL workflow validation
- Integration testing environments

## 🔍 Troubleshooting

### Permission Errors
```bash
sudo chown -R 50000:0 logs
sudo chmod -R 775 logs
```

### Database Connection Issues
```bash
docker logs postgres
docker exec -it postgres psql -U airflow -d airflow
```

### Port Conflicts
If port 8080 is in use, modify `docker-compose.yaml`:
```yaml
ports:
  - "8081:8080"  # Change to preferred port
```

## 🌟 Key Benefits

- **Zero Configuration** — Works out of the box with sensible defaults
- **Fully Dockerized** — No local Python environment setup required
- **Production-Ready** — Battle-tested configurations for real deployments
- **Modular Design** — Pick only what you need for your use case
- **Well-Documented** — Comprehensive README for each setup
- **Active Maintenance** — Updated with Airflow best practices

## 📚 Learning Resources

### Official Documentation
- [Apache Airflow](https://airflow.apache.org/)
- [Docker Compose](https://docs.docker.com/compose/)

### Community Resources
- [Airflow Summit Videos](https://www.youtube.com/c/Airflow)
- [Astronomer Academy](https://academy.astronomer.io/)
- [Airflow Best Practices](https://airflow.apache.org/docs/apache-airflow/stable/best-practices.html)

## 🙏 Inspirations & Credits

Built from community knowledge and examples:
- [matsudan/airflow-dag-examples](https://github.com/matsudan/airflow-dag-examples)
- [FabioCantarimM/airflow3](https://github.com/FabioCantarimM/airflow3)
- [Apache Airflow Documentation](https://airflow.apache.org/docs/)

---

**Ready to orchestrate your workflows?** Visit the [GitHub repository](https://github.com/lorenzouriel/airflow3-setup) to explore all setups and start deploying Airflow in minutes.

**Note**: These setups are designed for learning and development. For production deployments, implement proper security measures, backups, monitoring, and follow your organization's best practices.
