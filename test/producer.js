// Libraries
const kafka = require('kafka-node')

const clientOptions = {
  kafkaHost: process.env.KAFKA_HOST
}

const payloads = [
  {
    topic: process.env.WEBHOOK_TOPIC_NAME,
    messages: 'hi I am producing',
    partition: parseInt(process.env.WEBHOOK_TOPIC_PARTITION)
  }
]

const client = new kafka.KafkaClient(clientOptions)
const producer = new kafka.Producer(client)

console.log('------')
console.log('Preparing to produce...\n')

producer.on('ready', function () {
  producer.send(payloads, function (err, data) {
    console.log('\tProducer Data', data)
  })
})

producer.on('error', function (err) {
  console.log('\tProducer error', err)
})

console.log('\tExiting in 2 seconds')
setTimeout(() => {
  process.exit(0)
}, 2000)
console.log('------')
