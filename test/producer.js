var kafka = require('kafka-node'),

clientOptions = {
  kafkaHost: process.env.KAFKA_HOST
}

payloads = [
  {
    topic: 'webhooks',
    messages: 'hi I am producing',
    partition: 0
  }
];

consumerOptions = {
  groupId: 'node-webhook-dispatcher',
  autoCommit: false
}

Producer = kafka.Producer
KeyedMessage = kafka.KeyedMessage
client = new kafka.KafkaClient(clientOptions)
producer = new Producer(client)

console.log("Preparing to produce...")

producer.on('ready', function () {
  producer.send(payloads, function (err, data) {
    console.log(data);
  });
});

producer.on('error', function (err) {})
