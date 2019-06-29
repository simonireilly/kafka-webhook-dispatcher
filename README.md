# Overview

This is an app for connecting to kafka and sending webhooks.

- [Overview](#Overview)
- [Developer](#Developer)
  - [Getting Started](#Getting-Started)
  - [Testing](#Testing)
    - [Methodology](#Methodology)
      - [Unit Tests](#Unit-Tests)
      - [Integration Tests](#Integration-Tests)


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
