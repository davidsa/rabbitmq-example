const amqp = require("amqplib");

const open = amqp.connect("amqp://queue");

const paymentsQueue = "payments";

const payments = [
  {
    value: 1000,
    id: 1,
  },
  {
    value: 500,
    id: 2,
  },
  {
    value: 250,
    id: 3,
  },
];

open
  .then((conn) => conn.createChannel())
  .then((channel) => {
    channel.assertQueue(paymentsQueue).then((ok) => {
      payments.forEach((payment) => {
        channel.sendToQueue(
          paymentsQueue,
          Buffer.from(JSON.stringify(payment))
        );
        console.log("Payment sent");
      });
      console.log("Stop sending payments");
    });
  })
  .catch(console.error);
