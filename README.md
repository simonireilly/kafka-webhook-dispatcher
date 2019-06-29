# Overview

This is an app for connecting to kafka and sending webhooks.

# Developer

## Getting Started

- Pull the image and boot it through docker:

```
git clone git@github.com:simonireilly/kafka-webhook-dispatcher.git
cd kafka-webhook-dispatcher

# Run the dev dependencies and the app
docker-compose -f dev.yml -f docker-compose.yml

# Stop the app and reboot
docker-compose stop && docker-compose up --build --d
```

## Testing
