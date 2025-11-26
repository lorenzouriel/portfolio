---
layout: inner
position: left
title: "Azure Data Platform with Terraform"
title_pt: "Plataforma de Dados Azure com Terraform"
date: 2025-11-16 12:00:00
categories: cloud infrastructure data-platform
tags: Terraform Azure IaC Data-Platform Databricks Synapse Event-Hub Data-Factory
featured_image: '/img/posts/azure-data-platform-terraform.png'
project_link: 'https://github.com/lorenzouriel/terraform-azure-data-platform'
button_icon: 'github'
button_text: 'Visit Project'
lead_text: "Complete Infrastructure-as-Code setup for deploying a comprehensive Azure data platform with Terraform, including Data Lake, Databricks, Synapse Analytics, and Event Hub."
lead_text_pt: "Configuração completa de Infraestrutura como Código para implantar uma plataforma de dados Azure abrangente com Terraform, incluindo Data Lake, Databricks, Synapse Analytics e Event Hub."
---

This project provides a complete Infrastructure-as-Code (IaC) setup for deploying a comprehensive Azure data platform using Terraform. It includes multiple data services and follows best practices for modularity, maintainability, and environment management.

Building a modern data platform requires orchestrating multiple services that work together seamlessly. This project demonstrates how to deploy a production-ready Azure data platform using Terraform, with proper separation of concerns, security best practices, and multi-environment support.

## Architecture Overview

The platform includes:

- **Data Lake Storage Gen2** - Hierarchical namespace storage for data ingestion and processing
- **Azure Key Vault** - Secure storage for secrets, keys, and certificates
- **Event Hub** - High-throughput event streaming and ingestion
- **Azure Data Factory** - Data orchestration and ETL pipeline execution
- **Databricks** - Collaborative Apache Spark analytics and ML
- **Synapse Analytics** - Enterprise data warehouse and analytics

## Project Structure

```bash
azure-data-platform-terraform/
├── main.tf                          # Root module configuration
├── provider.tf                      # Azure provider setup
├── variables.tf                     # Root module variables
├── outputs.tf                       # Root module outputs
├── terraform.tfvars                 # Default values (template)
├── backend.tf                       # Remote state configuration
├── modules/                         # Reusable modules
│   ├── storage_account_datalake/    # Data Lake Storage Gen2
│   ├── databricks/                  # Databricks workspace
│   ├── data_factory/                # Azure Data Factory
│   ├── key_vault/                   # Azure Key Vault
│   ├── event_hub/                   # Event Hub namespace & hubs
│   └── synapse/                     # Synapse Analytics workspace
└── envs/                            # Environment-specific configs
    ├── dev/                         # Development environment
    ├── staging/                     # Staging environment
    └── prod/                        # Production environment
```

## Key Components

### Storage Account (Data Lake)
- **Purpose**: Hierarchical namespace storage for data ingestion and processing
- **Features**: LRS replication, private containers, network rules
- **Containers**: Raw, Silver, Bronze, Gold (medallion architecture)

### Key Vault
- **Purpose**: Secure storage for secrets, keys, and certificates
- **Features**: Soft delete, purge protection, access policies
- **Integration**: Used by Data Factory and Synapse for credential management

### Event Hub
- **Purpose**: High-throughput event streaming and ingestion
- **Features**: Multiple event hubs, authorization rules, partitioning
- **Use Cases**: Real-time data ingestion, telemetry, monitoring

### Data Factory
- **Purpose**: Data orchestration and ETL pipeline execution
- **Features**: Linked services for storage and Key Vault, managed identity
- **Integration**: Connects to storage accounts and other data services

### Databricks
- **Purpose**: Collaborative Apache Spark analytics and ML
- **Features**: Premium tier workspace, managed cluster
- **Integration**: Integrates with storage accounts and Data Factory

### Synapse Analytics
- **Purpose**: Enterprise data warehouse and analytics
- **Features**: SQL pools, Spark pools, integrated analytics
- **Pools**:
  - SQL Pool (DW100c with auto-scaling)
  - Spark Pool (MemoryOptimized with auto-pause)

