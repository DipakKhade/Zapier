
import { TOPIC_NAME } from "config/config";
import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId:'processer',
    brokers:['localhost:9092']
})

async function actionsConsumer(){
    const consumer = kafka.consumer({
        groupId:'asd'
    });
    await consumer.connect();

    consumer.subscribe({topic:TOPIC_NAME})

    consumer.run({
        autoCommit:false,
        eachMessage:async({ topic, partition, message })=>{
            console.log('log from worker---------------------------', message.value!.toString());

            new Promise((r)=>setTimeout(()=>r, 5000));

              await consumer.commitOffsets([
                {
                    topic,
                    offset:(parseInt(message.offset)+1).toString(),
                    partition
                }
            ])
        }
    })
    
}

actionsConsumer()