
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

    consumer.run({
        autoCommit:false,
        eachMessage:async({ topic, partition, message })=>{
            console.log({partition,offset: message.offset,value: message.value!.toString()})
              await consumer.commitOffsets([
                {
                    topic:TOPIC_NAME,
                    offset:(parseInt(message.offset)+1).toString(),
                    partition
                }
            ])
        }
    })
    
}