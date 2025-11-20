---
layout: inner
position: left
title: 'Observability Stack'
date: 2025-11-12 12:00:00
categories: devops monitoring
tags: OpenTelemetry Prometheus Grafana Loki Tempo Observability
featured_image: '/img/posts/observability-stack.png'
project_link: 'https://github.com/lorenzouriel/observability-stack'
button_icon: 'github'
button_text: 'Visit Project'
lead_text: 'Complete observability stack implementing the three pillars (metrics, logs, traces) using OpenTelemetry, Prometheus, Loki, Tempo, and Grafana.'
---

## Observability Stack

A production-ready observability stack that implements the three pillars of observability using modern open-source tools.

## Architecture

This stack covers all three pillars of observability:

- **Metrics**: Prometheus for metrics storage and querying
- **Logs**: Loki for log aggregation and searching
- **Traces**: Tempo for distributed tracing

### Core Components

1. **OpenTelemetry Collector** - Central telemetry data hub
   - Receives metrics, logs, and traces via OTLP
   - Routes data to appropriate backends
   - Ports: 4317 (gRPC), 4318 (HTTP), 9464 (metrics)

2. **Prometheus** - Metrics storage and alerting
   - Scrapes metrics from applications and services
   - Web UI: http://localhost:9090

3. **Loki** - Log aggregation system
   - Stores and indexes logs efficiently
   - API: http://localhost:3100

4. **Tempo** - Distributed tracing backend
   - Stores and queries traces
   - API: http://localhost:3200

5. **Grafana** - Unified visualization platform
   - Pre-configured datasources for all backends
   - Web UI: http://localhost:3000

## Quick Start

### Prerequisites

- Docker and Docker Compose installed
- At least 4GB of available RAM
- Ports 3000, 3100, 3200, 4317, 4318, 8000, 9090, 9464 available

### Start the Stack

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Check service health
docker-compose ps
```

### Access Services

- **Grafana**: http://localhost:3000 (admin/admin)
- **Prometheus**: http://localhost:9090
- **Loki**: http://localhost:3100
- **Tempo**: http://localhost:3200

## Using Grafana

Datasources are pre-configured:
- **Prometheus** - Default datasource for metrics
- **Loki** - Log queries and exploration
- **Tempo** - Trace visualization with correlation to logs and metrics

### Exploring Data

#### Metrics (Prometheus)
```promql
rate(app_requests_total[5m])
```

#### Logs (Loki)
```logql
{service_name="greenhouse-app"}
```

#### Traces (Tempo)
Search traces by service name, duration, or tags, and click on a trace to see span timeline, correlated logs, and related metrics.

## Instrumenting Applications

### Python with OpenTelemetry

```python
from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter

# Setup
trace.set_tracer_provider(TracerProvider())
tracer = trace.get_tracer(__name__)
span_exporter = OTLPSpanExporter(endpoint="http://localhost:4317", insecure=True)
trace.get_tracer_provider().add_span_processor(BatchSpanProcessor(span_exporter))

# Use
with tracer.start_as_current_span("operation_name"):
    # Your code here
    pass
```

### Prometheus Metrics Endpoint

```python
from prometheus_client import start_http_server, Counter

# Start metrics server
start_http_server(8000)

# Define metrics
requests = Counter('my_app_requests_total', 'Total requests')
requests.inc()
```

## Maintenance

### Common Operations

```bash
# View logs for specific service
docker-compose logs -f grafana

# Restart specific service
docker-compose restart otel-collector

# Recreate after config changes
docker-compose up -d --force-recreate otel-collector
```

### Backup Data

```bash
# Backup Prometheus data
docker run --rm -v monitor_prometheus-data:/data -v $(pwd):/backup ubuntu tar czf /backup/prometheus-backup.tar.gz /data

# Backup Loki data
docker run --rm -v monitor_loki-data:/data -v $(pwd):/backup ubuntu tar czf /backup/loki-backup.tar.gz /data

# Backup Grafana data
docker run --rm -v monitor_grafana-data:/data -v $(pwd):/backup ubuntu tar czf /backup/grafana-backup.tar.gz /data
```
