const amqp = require("amqplib");

const open = amqp.connect("amqp://queue");

const paymentsQueue = "payments";

open
  .then((conn) => conn.createChannel())
  .then((channel) => {
    channel.assertQueue(paymentsQueue).then((ok) => {
      channel.consume(paymentsQueue, (msg) => {
        console.log("Receiving payment");
        const payment = JSON.parse(msg.content);
        console.log(payment);
        setTimeout(() => channel.ack(msg), 3000);
      });
    });
  })
  .catch(console.error);
