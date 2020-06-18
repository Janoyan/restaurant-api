import config from 'config';
import { KafkaClient, Producer } from 'kafka-node';

let producer: Producer;

export function getProducer(): Producer {
    return producer;
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
