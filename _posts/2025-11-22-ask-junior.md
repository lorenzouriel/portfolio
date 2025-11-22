---
layout: inner
position: right
title: 'Ask Junior'
date: 2025-11-22 12:00:00
categories: development ai
tags: RAG Chainlit Weaviate Airflow Observability
featured_image: '/img/posts/ask-junior.png'
project_link: 'https://github.com/lorenzouriel/ask-junior'
button_icon: 'github'
button_text: 'Visit Project'
lead_text: 'A RAG (Retrieval-Augmented Generation) system that provides an intelligent conversational AI interface with full observability, automated knowledge base ingestion, and enterprise-grade infrastructure.'
---

## Ask Junior

Ask Junior is a production-ready RAG (Retrieval-Augmented Generation) system built as a microservices architecture with five core services that work together to deliver an end-to-end AI-powered knowledge assistant.

## Architecture Overview

The system consists of:
- **Integrations (Apache Airflow)**: Document extraction, smart chunking, vectorization pipeline, and scheduled syncs
- **Vector Database (Weaviate)**: Semantic search with OpenAI embeddings
- **Agent (Chainlit)**: Chat interface with RAG retrieval and GPT-4
- **Monitor (Grafana Stack)**: Full observability with Prometheus, Loki, and Tempo
- **Traefik**: Reverse proxy routing all services

## Services

| Service | Description | Port | Technology |
|---------|-------------|------|------------|
| Agent | Conversational AI chat interface with RAG | 8000 | Chainlit, OpenAI |
| Monitor | Full observability stack | 3000 | Grafana, Prometheus, Loki, Tempo |
| Integrations | ETL & RAG pipeline for document processing | 8080 | Apache Airflow |
| Traefik | Reverse proxy and load balancer | 80/443 | Traefik v3.0 |
| Vector Database | Semantic search engine | 8081 | Weaviate |

## Data Flow

1. **Knowledge Ingestion**: Documents from Azure DevOps or local files are processed by Airflow
2. **Vectorization**: Documents are chunked, embedded via OpenAI, and stored in Weaviate
3. **User Query**: User asks a question through the Chainlit interface
4. **Semantic Search**: Weaviate retrieves relevant document chunks
5. **Response Generation**: OpenAI GPT-4 generates a response using retrieved context
6. **Observability**: All operations are traced, logged, and metrified

## Key Features

### Agent (Chainlit)
- Adjustable chunk retrieval (1-20)
- Certainty thresholds
- Conversation memory
- Full OpenTelemetry integration (traces, logs, metrics)
- SQLite for conversation history and analytics

### Monitor (Observability Stack)
Complete three-pillars observability:
- **OpenTelemetry Collector**: Central telemetry hub
- **Prometheus**: Metrics storage
- **Loki**: Log aggregation
- **Tempo**: Distributed tracing
- **Grafana**: Unified visualization

### Integrations (Apache Airflow)
ETL pipelines for knowledge base management:
- Azure DevOps sync every 3 hours
- Document ingestion every 4 hours
- Supports Markdown, PDF, TXT formats
- Smart chunking strategies (header-aware for Markdown)

### Vector Database (Weaviate)
- OpenAI embeddings (text2vec-openai)
- API key-based authentication
- QnA module integration

## Prerequisites

- Docker and Docker Compose
- OpenAI API key
- 16GB RAM minimum
- 4 CPU cores recommended
