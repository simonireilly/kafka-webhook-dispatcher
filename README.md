# Overview

This is an app for connecting to kafka and sending webhooks.

- [Overview](#Overview)
- [Design Choices](#Design-Choices)
  - [Language](#Language)
- [Architecture](#Architecture)
  - [Webhooks Received](#Webhooks-Received)
  - [Webhooks URL Monitor](#Webhooks-URL-Monitor)
  - [Webhooks Dispatcher](#Webhooks-Dispatcher)
- [Developer](#Developer)
  - [Getting Started](#Getting-Started)
  - [Testing](#Testing)
    - [Methodology](#Methodology)
      - [Unit Tests](#Unit-Tests)
      - [Integration Tests](#Integration-Tests)
      
# Design Choices

## Language

- Language should be mature and have a mature kafka client

Kafka Benchmarking:

| Client Type | Throughput       |
|-------------|------------------|
| Java        | 40,000 - 50,0000 |
| Go          | 28,000 - 30,0000 |
| Node        | 6,000 - 8,000   |
| Kafka-pixy  | 700 - 800        |
| Logstash    | 250              |

- The Language should be performant
- Language should support concurrency

**Language Go or Node are preferable.**

# Architecture

## Webhooks Received

- single receiving topic enter the persist-and-validate consumer:
    - This consumer persists all webhooks and validates them afterward.
    - Then if it is invalid it will not send it on to the next consumer.
    - Valid uuid's are passed onto the next topic

## Webhooks URL Monitor

- Unique URL's should be persisted and monitored
    - When a message arrived with a new URL this URL is added to the ENDPOINTS table
    - This URL is monitored periodically for availability

## Webhooks Dispatcher

- single delivering topic from the webhooks received consumer will be dispatched here:
    - This consumer will poll the URL provided for the webhooks and send the webhooks on to the next stage
    

# Developer

## Getting Started

```bash
git clone git@github.com:simonireilly/kafka-webhook-dispatcher.git

# Build app, compose up and tail logs
make build up tail

# Stop the app
make stop
```

## Testing

### Methodology

#### Unit Tests

1. Create exported functions to be passed to a consumer and create unit tests for these functions.

#### Integration Tests

1. Spin up the app with a consumer and producer and connect to a kafka cluster
2. Receive messages and process them into the database
3. Retrieve successfully stored messages and validate the contents
   1. Is valid url for urls in collection
   2. Is a valid json body (can be json parsed - all we can do really)
4. Post successfully validated webhooks concurrently for all urls provided
5. Create a container to receive webhooks and test response
   1. Status - 200
   2. Status - 404
   3. Status - 401
   4. Status - 301
   5. Status - 500
