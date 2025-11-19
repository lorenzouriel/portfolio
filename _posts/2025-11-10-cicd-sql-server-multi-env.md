---
layout: inner
position: left
title: "CI/CD for SQL Server Database Projects (Dev, QA and Prod)"
date: 2025-11-10 12:00:00
categories: devops cicd sql-server
tags: Azure-DevOps SQL-Server Pipelines CICD
featured_image: '/img/posts/cicd-database.png'
project_link: 'https://medium.com/@lorenzouriel/ci-cd-for-sql-server-database-projects-dev-qa-and-prod-1d121bc8161e'
button_icon: 'medium'
button_text: 'Visit Project'
lead_text: "Complete CI/CD pipeline for SQL Server database projects across multiple environments using Azure DevOps Pipelines."
---

In the last article, we developed a complete CI/CD pipeline. The goal of this article is to expand that pipeline to support multiple environments.

When managing Dev, QA, and Production environments, you will face isolated resources, configurations and credentials. For this example, I'll run everything using Docker. Each environment will have its own SQL Server container.

## Environment Setup

I will up three SQL Server container, one for each environment.

Example docker-compose.yml:

```yaml
services:
  mssql-dev:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: mssql-dev
    restart: unless-stopped
    environment:
      ACCEPT_EULA: "Y"
      MSSQL_PID: "Developer"
      SA_PASSWORD: "DevPassword123!"
      MSSQL_AGENT_ENABLED: "true"
    ports:
      - "14331:1433"
    volumes:
      - ./mnt/mssql-data/dev/data:/var/opt/mssql/data
      - ./mnt/mssql-data/dev/logs:/var/opt/mssql/log
      - ./mnt/mssql-data/dev/backups:/var/opt/mssql/backups
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'

  mssql-qa:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: mssql-qa
    restart: unless-stopped
    environment:
      ACCEPT_EULA: "Y"
      MSSQL_PID: "Standard"
      SA_PASSWORD: "QaPassword123!"
      MSSQL_AGENT_ENABLED: "true"
    ports:
      - "14332:1433"
    volumes:
      - ./mnt/mssql-data/qa/data:/var/opt/mssql/data
      - ./mnt/mssql-data/qa/logs:/var/opt/mssql/log
      - ./mnt/mssql-data/qa/backups:/var/opt/mssql/backups
    deploy:
      resources:
        limits:
          memory: 4G
          cpus: '2.0'

  mssql-prod:
    image: mcr.microsoft.com/mssql/server:2022-latest
    container_name: mssql-prod
    restart: unless-stopped
    environment:
      ACCEPT_EULA: "Y"
      MSSQL_PID: "Standard"
      SA_PASSWORD: "ProdPassword123!"
      MSSQL_AGENT_ENABLED: "true"
    ports:
      - "14330:1433"
    volumes:
      - ./mnt/mssql-data/prod/data:/var/opt/mssql/data
      - ./mnt/mssql-data/prod/logs:/var/opt/mssql/log
      - ./mnt/mssql-data/prod/backups:/var/opt/mssql/backups
    deploy:
      resources:
        limits:
          memory: 8G
          cpus: '4.0'
```

Running containers:

```bash
# For Dev, QA and Prod
docker compose up -d
```

Each environment gets its own container, data, logs, and backups, making it easier to isolate and manage resources.

## Per-Environment Pipelines

Originally, you may have set up three separate Azure DevOps YAML files:

- dev-pipeline.yml
- qa-pipeline.yml
- prod-pipeline.yml

Each pipeline should be responsible for:

**1. Building the solution:**

```yaml
steps:
- task: VSBuild@1
  inputs:
    solution: '**\*.sln'
    vsVersion: '17.0'
    configuration: 'Release'
```

**2. Publishing the DACPAC artifact:**

```yaml
- task: PublishBuildArtifacts@1
  inputs:
    pathToPublish: '$(Build.SourcesDirectory)\bin\$(configuration)'
    artifactName: 'dacpac'
```

**3. Deploying to the target environment using SqlDacpacDeploymentOnMachineGroup:**

```yaml
- task: SqlDacpacDeploymentOnMachineGroup@0
  inputs:
    TaskType: 'dacpac'
    DacpacFile: '$(Build.SourcesDirectory)\bin\$(configuration)\$(dacpacName)'
    TargetMethod: 'connectionString'
    ConnectionString: 'Server=$(sqlServerName);Database=$(databaseName);User ID=$(sqlUser);Password=$(sqlPassword);Encrypt=False;'
```

So, you'd need to follow the last article for each environment.

**But… that's sad!**

We can simplify this into just one unique pipeline.

## Multi-Stage Pipeline

Instead of three separate files, you can create one single YAML that handles all environments based on the branch name.

### Multi-Stage Pipeline Example

```yaml
trigger:
  branches:
    include:
      - dev
      - qa
      - main  # production

# -----------------------------
# Dev Stage
# -----------------------------
stages:
- stage: Dev
  displayName: 'Deploy to Dev'
  condition: eq(variables['Build.SourceBranchName'], 'dev')
  jobs:
  - job: Build_And_Deploy_Dev
    displayName: 'Build & Deploy to Dev'
    pool:
      name: 'cicd-windows'   # Dev-specific pool
    steps:
    - task: VSBuild@1
      inputs:
        solution: '**/*.sln'
        vsVersion: '17.0'
        configuration: '$(configuration)'

    - task: PublishBuildArtifacts@1
      inputs:
        pathToPublish: '$(Build.SourcesDirectory)\bin\$(configuration)'
        artifactName: 'dacpac'

    - task: SqlDacpacDeploymentOnMachineGroup@0
      inputs:
        TaskType: 'dacpac'
        DacpacFile: '$(Build.SourcesDirectory)\bin\$(configuration)/$(dacpacName)'
        TargetMethod: 'connectionString'
        ConnectionString: 'Server=$(sqlDevServerName);Database=$(databaseName);User ID=$(sqlDevUser);Password=$(sqlDevPassword);Encrypt=False;'

# -----------------------------
# QA Stage
# -----------------------------
- stage: QA
  displayName: 'Deploy to QA'
  condition: eq(variables['Build.SourceBranchName'], 'qa')
  jobs:
  - job: Build_And_Deploy_QA
    displayName: 'Build & Deploy to QA'
    pool:
      name: 'cicd-windows'   # QA-specific pool
    steps:
    - task: VSBuild@1
      inputs:
        solution: '**/*.sln'
        vsVersion: '17.0'
        configuration: '$(configuration)'

    - task: PublishBuildArtifacts@1
      inputs:
        pathToPublish: '$(Build.SourcesDirectory)\bin\$(configuration)'
        artifactName: 'dacpac'

    - task: SqlDacpacDeploymentOnMachineGroup@0
      inputs:
        TaskType: 'dacpac'
        DacpacFile: '$(Build.SourcesDirectory)\bin\$(configuration)/$(dacpacName)'
        TargetMethod: 'connectionString'
        ConnectionString: 'Server=$(sqlQAServerName);Database=$(databaseName);User ID=$(sqlQAUser);Password=$(sqlQAPassword);Encrypt=False;'

# -----------------------------
# Production Stage
# -----------------------------
- stage: Prod
  displayName: 'Deploy to Production'
  condition: eq(variables['Build.SourceBranchName'], 'main')
  jobs:
  - job: Build_And_Deploy_Prod
    displayName: 'Build & Deploy to Production'
    pool:
      name: 'cicd-windows' # Production-specific pool
    steps:
    - task: VSBuild@1
      inputs:
        solution: '**/*.sln'
        vsVersion: '17.0'
        configuration: '$(configuration)'

    - task: PublishBuildArtifacts@1
      inputs:
        pathToPublish: '$(Build.SourcesDirectory)\bin\$(configuration)'
        artifactName: 'dacpac'

    - task: SqlDacpacDeploymentOnMachineGroup@0
      inputs:
        TaskType: 'dacpac'
        DacpacFile: '$(Build.SourcesDirectory)\bin\$(configuration)/$(dacpacName)'
        TargetMethod: 'connectionString'
        ConnectionString: 'Server=$(sqlProdServerName);Database=$(databaseName);User ID=$(sqlProdUser);Password=$(sqlProdPassword);Encrypt=False;'
```

Let's talk about the main points now!

### Branch-based Triggers

```yaml
trigger:
  branches:
    include:
      - dev
      - qa
      - main
```

- The pipeline runs only when changes are pushed to dev, qa or main.
- Each branch maps naturally to its environment, ensuring that deployments happen in the correct stage automatically.

### Dedicated Jobs and Pools

Each job uses the same pool, cicd-windows, but you could assign different pools per environment if needed (Dev/QA/Prod).

```yaml
pool:
  name: 'cicd-windows'
```

### Use of Variables

All sensitive info and environment details (server, user, password) are stored as pipeline variables.

- Passwords aren't hardcoded.
- Easily swap out environment details without changing YAML.

### Now You Have

- Clear separation of Dev / QA / Prod.
- Safe deployments with branch conditions.
- Reusable DACPAC deployment task.
- Centralized build artifacts for multiple stages.
- Ready for scaling (add more environments or change pools).

## Let's Test!

Just create a commit for dev, merge with QA, and finally merge into production. Each stage will execute automatically based on the branch being updated.

That's it by now! In the next section we will improve this pipeline adding more security and removing repeated blocks.

## Improving with Templates and Production Restrictions

So, our azure-pipelines.yaml has three big copy-paste stages: Dev, QA and Prod. That worked but made the YAML long and error prone.

To solve this, we can add templates:

### templates/build.yml

It will handle our build and publish steps and call deploy.yml if successful.

```yaml
parameters:
  - name: environmentName
  - name: poolName
  - name: server
  - name: user
  - name: password

jobs:
- job: Build_And_Deploy_${{ parameters.environmentName }}
  displayName: 'Build & Deploy to ${{ parameters.environmentName }}'
  pool:
    name: ${{ parameters.poolName }}
  steps:
  - task: VSBuild@1
    inputs:
      solution: '**/*.sln'
      vsVersion: '17.0'
      configuration: '$(configuration)'

  - task: PublishBuildArtifacts@1
    inputs:
      pathToPublish: '$(Build.SourcesDirectory)\bin\$(configuration)'
      artifactName: 'dacpac'

  - template: deploy.yml
    parameters:
      environmentName: ${{ parameters.environmentName }}
      server: ${{ parameters.server }}
      user: ${{ parameters.user }}
      password: ${{ parameters.password }}
```

### templates/deploy.yml

All the deployment logic, the DACPAC publish.

```yaml
parameters:
  - name: environmentName
  - name: server
  - name: user
  - name: password

steps:
- task: SqlDacpacDeploymentOnMachineGroup@0
  displayName: 'Deploy DACPAC to ${{ parameters.environmentName }}'
  inputs:
    TaskType: 'dacpac'
    DacpacFile: '$(Build.SourcesDirectory)\bin\$(configuration)/$(dacpacName)'
    TargetMethod: 'connectionString'
    ConnectionString: 'Server=${{ parameters.server }};Database=$(databaseName);User ID=${{ parameters.user }};Password=${{ parameters.password}};Encrypt=False;'
```

### Main Pipeline

With these two templates the main pipeline (azure-pipelines.yml) is cleaner and easier to maintain:

```yaml
trigger:
  branches:
    include:
      - dev
      - qa

# Production only runs on PR
pr:
  branches:
    include:
      - main

variables:
  configuration: 'Release'
  dacpacName: 'Database.dacpac'
  databaseName: 'articles'

stages:

# Dev Stage
- stage: Dev
  displayName: 'Deploy to Dev'
  condition: eq(variables['Build.SourceBranchName'], 'dev')
  jobs:
  - template: templates/build.yml
    parameters:
      environmentName: 'Dev'
      poolName: 'cicd-windows'
      server: '$(sqlDevServerName)'
      user: '$(sqlDevUser)'
      password: '$(sqlDevPassword)'

# QA Stage
- stage: QA
  displayName: 'Deploy to QA'
  condition: eq(variables['Build.SourceBranchName'], 'qa')
  dependsOn: Dev
  jobs:
  - template: templates/build.yml
    parameters:
      environmentName: 'QA'
      poolName: 'cicd-windows'
      server: '$(sqlQAServerName)'
      user: '$(sqlQAUser)'
      password: '$(sqlQAPassword)'

# Production Stage
- stage: Prod
  displayName: 'Deploy to Production'
  condition: |
    and(
      eq(variables['Build.SourceBranchName'], 'main'),
      eq(variables['Build.Reason'], 'PullRequest')
    )
  dependsOn: QA
  jobs:
  - template: templates/build.yml
    parameters:
      environmentName: 'Prod'
      poolName: 'cicd-windows'
      server: '$(sqlProdServerName)'
      user: '$(sqlProdUser)'
      password: '$(sqlProdPassword)'
```

## Key Improvements

So, some changes were applied like:

- **Removed duplication (DRY)** and easier maintenance
- **Specific stages** with isolated variables
- **Restrictions** (QA depends on DEV, Prod depends on QA and runs only on PRs to main)
- **Passwords** stored in pipelines can be easily swapped for Key Vaults
- **Adding a new environment** is just one stage + template call

## Conclusion

By implementing a multi-stage pipeline with templates, you achieve:

1. A single, maintainable YAML file instead of multiple duplicated pipelines
2. Environment-specific deployments triggered by branch names
3. Production safeguards (PR-only deployment)
4. Clear dependency chain (Dev → QA → Prod)
5. Easy scalability for additional environments

This approach reduces errors, improves maintainability, and provides a robust CI/CD process for SQL Server database projects across all environments.

---

*Original article: [CI/CD for SQL Server Database Projects (Dev, QA and Prod)](https://medium.com/@lorenzouriel/ci-cd-for-sql-server-database-projects-dev-qa-and-prod-1d121bc8161e)*

*Doing What Needs to Be Done.*
