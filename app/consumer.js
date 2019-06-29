const kafka = require('kafka-node');

clientOptions = {
  kafkaHost: process.env.KAFKA_HOST
}

payloads = [{
  topic: 'webhooks',
  offset: 2, //default 0
  partition: 0 // default 0
}]

consumerOptions = {
  groupId: 'node-webhook-dispatcher',
   autoCommit: false
}

var topicsToCreate = [{
  topic: 'webhooks',
  partitions: 1,
  replicationFactor: 1
}]

try {
  // Initialize the client and create the topics
  const client = new kafka.KafkaClient(clientOptions);
  client.createTopics(topicsToCreate, (error, result) => {
    console.log(result)
  });


  // Log successful construction
  const Consumer = kafka.Consumer;
  const consumer = new Consumer(client, payloads, consumerOptions);
  console.log("Consumer constructed =>", consumer.options)

  // Bind the on message event of the consumer
  consumer.on('message', async function (message) {
    console.log('here');
    console.log('kafka-> ', message.value);
  })

  // Bind the on error event of the consumer
  consumer.on('error', function (err) {
    console.log('error', err);
  });
} catch (e) {
  console.log(e);
}
