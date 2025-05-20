
import { TOPIC_NAME } from "config/config";
import { prisma } from "db/client";
import { Kafka } from "kafkajs";
import { metadataParser } from "./parser";
import sendEmail from "./mail";

const kafka = new Kafka({
    clientId:'processer',
    brokers:['localhost:9092']
})

async function actionsConsumer(){
    const consumer = kafka.consumer({
        groupId:'asd'
    });
    await consumer.connect()

    const producer = kafka.producer();
    await producer.connect()

    consumer.subscribe({topic:TOPIC_NAME})

    consumer.run({
        autoCommit:false,
        eachMessage:async({ topic, partition, message })=>{
            console.log('log from worker---------------------------', message.value!.toString());
            //{"zapRunId":"392b75cb-089c-4f3e-9be5-9a8c2d343cf1","actionOrder":0}
            const parsedMessage = JSON.parse(message.value!.toString())
            const currentZap = await prisma.zapRun.findFirst({
                where:{
                    id:parsedMessage.zapRunId
                },
                select: {
                    metadata:true,
                    zap: {
                        include: {
                            action: {
                                include: {
                                    type: true
                                }
                            }
                        }
                    }
                }
            })
            console.log('currentZap-----------',currentZap)
            if(parsedMessage.actionOrder !== (currentZap?.zap?.action?.length || 1) - 1){
                const currentAction = currentZap?.zap?.action[parsedMessage.actionOrder];
                console.log('currentAction-----------',currentAction)
                if(currentAction?.type?.name === "Send Email"){
                    const currentZapMetadata = currentZap?.metadata;
                    const actionMetadata = currentAction?.metadata;

                    if(!currentZapMetadata || !actionMetadata) return;

                    const resolvedMetadata = metadataParser(currentAction?.type?.name,currentZapMetadata,actionMetadata);

                    if (resolvedMetadata) await sendEmail(resolvedMetadata.email,resolvedMetadata.body)

                } else if(currentAction?.type?.name === "Send SOLANA"){
                    
                }
            }else {
                producer.send({
                    topic:TOPIC_NAME,
                    messages:[
                        {
                            value:JSON.stringify({
                                zapRunId:parsedMessage.zapRunId,
                                actionOrder:parsedMessage.actionOrder+1
                            })
                        }
                    ]
                })
            }

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