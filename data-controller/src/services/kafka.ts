import config from 'config';
import { KafkaClient, Producer, Consumer } from 'kafka-node';

let producer: Producer;
let consumer: Consumer;

export function getProducer(): Producer {
    return producer;
}

export function getConsumer(): Consumer {
    return consumer;
}

export function connectProducer() {
    console.log('Connecting kafka..');
    const client = new KafkaClient({ kafkaHost: config.get('kafkaHost') });
    producer = new Producer(client);

    producer.on('ready', () => {
        console.log(`Connected to the kafka server ${config.get('kafkaHost')}`)
    });

    producer.on('error', (err: Error) => {
        console.log(`Failed to connect to the kafka server ${config.get('kafkaHost')} Error: ${err.message}`)
    });
}

export function connectConsumer(topic: string) {
    console.log('Consumer started..');
    const client = new KafkaClient({ kafkaHost: config.get('kafkaHost') });
    consumer = new Consumer(client, [ { topic } ], {});
}
