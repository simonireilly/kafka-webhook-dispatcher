// Libraries
const kafka = require('kafka-node')

// Config
const config = require('../../app/config/consumer-config')

// Setup - Constants
const testTopicName = `test-create-topic-produce-consume-${Date.now()}`

const topicsToCreate = [{
  topic: testTopicName,
  partitions: parseInt(process.env.WEBHOOK_TOPIC_PARTITION_COUNT),
  replicationFactor: parseInt(process.env.WEBHOOK_TOPIC_REPLICATION_FACTOR)
}]

// Messages to send
const payloads = [{
  topic: testTopicName,
  messages: `Test message produced ${Date.now()}`,
  partition: parseInt(process.env.WEBHOOK_TOPIC_PARTITION)
}]

// Client setup
const client = new kafka.KafkaClient(config.clientOptions)

// Create the topic if it does not exist
client.createTopics(topicsToCreate, (error, result) => {
  if(error !== null) {
    console.log('\nCreating topic error', error)
    process.exit(1)
  } else {
    console.log('\nCreating topic result', result)
  }
})

// Consumer/Producer Setup
const consumer = new kafka.Consumer(client, [{ topic: testTopicName }], config.consumerOptions)
const producer = new kafka.Producer(client)

// Produce a new message
producer.on('ready', function () {
  producer.send(payloads, function (err, data) {
    if (err !== null) {
      console.log('\nProducer: Message err', {
        err,
        payloads
      })
    }
    console.log('\nProducer: Message sent', {
      data,
      payloads
    })
  })
})

producer.on('error', function (err) {
  console.log('\nProducer: Message error', err)
  process.exit(1)
})

// Attach a consumer to the test topic
//
// Allow it to read through all messages
//
//    We process exit within the message processing, so the offset
//    is not committed - this is fine as we will likely tear down
//    between integration tests, and can create topics for each test
//
try {
  consumer.on('message', async function (message) {
    console.log('\nConsumer: Message received', message)
    if(message.value == payloads[0].messages) {
      console.log('\nTests Passed')
      process.exit(0)
    } else {
      return true
    }
  })

  consumer.on('error', function (err) {
    console.log('\nConsumer: Message error', err)
    process.exit(1)
  })

} catch (e) {
  console.log('\nConsumer: Error catch', e)
  process.exit(1)
}
