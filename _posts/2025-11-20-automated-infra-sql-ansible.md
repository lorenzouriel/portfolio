---
layout: inner
position: left
title: "Automated SQL Server Infra with Proxmox, Ansible and CI/CD"
date: 2025-11-20 12:00:00
categories: devops infrastructure automation
tags: Proxmox Ansible Azure-DevOps SQL-Server Docker IaC Flyway
featured_image: '/img/posts/automated-infra-sql-ansible.png'
project_link: 'https://medium.com/@lorenzouriel/automated-sql-server-infraestructure-with-proxmox-ansible-and-ci-cd-6e6484de90df'
button_icon: 'medium'
button_text: 'Visit Project'
lead_text: "Complete infrastructure automation for SQL Server deployment on Proxmox using Makefile, Ansible, and Azure DevOps CI/CD pipelines."
---

This is one of the best projects I've ever worked on, and my passion for DevOps and IaC only grows stronger. In DevOps automating infrastructure is necessity, that's why we have tools like Terraform, Vagrant, Ansible, etc.

In this article I'll walk through how I automated SQL Server deployment on Proxmox for my homelab, using a combination of:

- **Makefile** — To provision and configure a VM on Proxmox
- **Ansible** — For automated server configuration and SQL deployment
- **Azure DevOps CI/CD Agent** — For pipeline provisioning

## Architecture Overview

Here's what we set up:

- Proxmox VM Creation via Makefile
- Cloud-Init preconfigured (SSH, IP, credentials)
- Ansible provisioning for Docker, firewall, and SQL setup
- Azure DevOps Agent installed on the machine for CI/CD automation
- SQL Server in Docker fully managed and configured

## Repository Structure

```
.
├── Makefile
├── provision/
│   ├── files/
│   ├───── sql/
│   ├─────── docker-compose.yml
│   ├── group_vars/
│   ├───── all.yml
│   ├── deploy.yml
│   ├── inventory
└─  └── sql.yml
```

## Key Takeaways

This project demonstrates:

1. **Complete Infrastructure as Code** - From VM creation to application deployment
2. **Reproducible Environments** - Entire setup can be recreated with a single `make all` command
3. **Automated Configuration** - Ansible handles all server configuration and application deployment
4. **Integrated CI/CD** - Self-hosted Azure DevOps agent for database migrations
5. **Production-Ready** - Includes firewall configuration, data persistence, and resource limits

The combination of Makefile for infrastructure provisioning, Ansible for configuration management, and Azure DevOps for CI/CD creates a powerful automation pipeline that showcases modern DevOps practices.
