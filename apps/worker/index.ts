
import { TOPIC_NAME } from "config/config";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId:'processer',
    brokers:['localhost:9092']
})

async function actionsConsumer(){
    const consumer = kafka.consumer({
        groupId:''
    });
    await consumer.connect();

    consumer.subscribe({topic:TOPIC_NAME})
}