// Libraries
const kafka = require('kafka-node')

// Config
const config = require('../../app/config/consumer-config')

const client = new kafka.KafkaClient(config.clientOptions)

const topicsToCreate = [{
  topic: process.env.WEBHOOK_TOPIC_NAME,
  partitions: parseInt(process.env.WEBHOOK_TOPIC_PARTITION_COUNT),
  replicationFactor: parseInt(process.env.WEBHOOK_TOPIC_REPLICATION_FACTOR)
}]


console.log('\tCreating topics', topicsToCreate)
client.createTopics(topicsToCreate, (error, result) => {
  console.log('Creating topic error', error)
  console.log('Creating topic result', result)
})

console.log('\tExiting in 10 seconds')
setTimeout(() => {
  process.exit(0)
}, 10000)
console.log('------')
