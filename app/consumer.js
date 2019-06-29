const kafka = require('kafka-node');

try {
  const Consumer = kafka.Consumer;
  const client = new kafka.KafkaClient();
  const consumer = new Consumer(
    client,
    [{
      topic: 'webhooks',
      partition: 0
    }], {
      autoCommit: false
    }
  );
  // Log successful construction
  console.log("Consumer constructed =>", consumer.options)

  // Bind the on message event of the consumer
  consumer.on('message', async function (message) {
    console.log('here');
    console.log(
      'kafka-> ',
      message.value
    );
  })

  // Bind the on error event of the consumer
  consumer.on('error', function (err) {
    console.log('error', err);
  });
} catch (e) {
  console.log(e);
}
