const kafka = require('kafka-node')

const clientOptions = {
  kafkaHost: process.env.KAFKA_HOST
}

const payloads = [{
  topic: process.env.WEBHOOK_TOPIC_NAME,
  offset: parseInt(process.env.WEBHOOK_TOPIC_OFFSET)
}]

const consumerOptions = {
  groupId: process.env.WEBHOOK_CONSUMER_GROUP
}

const topicsToCreate = [{
  topic: process.env.WEBHOOK_TOPIC_NAME,
  partitions: parseInt(process.env.WEBHOOK_TOPIC_PARTITION_COUNT),
  replicationFactor: parseInt(process.env.WEBHOOK_TOPIC_REPLICATION_FACTOR)
}]

try {
  // Initialize the client and create the topics
  const client = new kafka.KafkaClient(clientOptions)
  client.createTopics(topicsToCreate, (error, result) => {
    console.log('Creating topic error', error)
    console.log('Creating topic result', result)
  })

  // Log successful construction
  const consumer = new kafka.Consumer(client, payloads, consumerOptions)
  console.log('Consumer constructed =>', consumer.options)

  // Bind the on message event of the consumer
  consumer.on('message', async function (message) {
    console.log('webhook consumer message-> ', message.value)
  })

  // Bind the on error event of the consumer
  consumer.on('error', function (err) {
    console.log('webhook consumer error', err)
  })
} catch (e) {
  console.log(e)
}
