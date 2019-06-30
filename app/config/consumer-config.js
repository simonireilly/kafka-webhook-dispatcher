// Default Kafka Options used in this application

const clientOptions = {
  kafkaHost: process.env.KAFKA_HOST
}

const payloads = [{
  topic: process.env.WEBHOOK_TOPIC_NAME
}]

const consumerOptions = {
  groupId: process.env.WEBHOOK_CONSUMER_GROUP_ID
}

var consumerGroupOptions = {
  kafkaHost: process.env.KAFKA_HOST,
  ssl: process.env.WEBHOOK_CONSUMER_GROUP_ID_SSL,
  groupId: process.env.WEBHOOK_CONSUMER_GROUP_ID,
  sessionTimeout: 15000,
  protocol: ['roundrobin'],
  fromOffset: 'latest', // default
  commitOffsetsOnFirstJoin: true,
  outOfRangeOffset: 'earliest'
}

module.exports = { clientOptions, payloads, consumerOptions, consumerGroupOptions }
