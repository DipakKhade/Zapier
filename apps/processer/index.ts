import { Kafka } from "kafkajs"
import { prisma } from "db/client"

const kafka = new Kafka({
    clientId:'processer',
    brokers:['localhost:9092']
})

const TOPIC_NAME = 'zapqueue';

async function swipper(){
    const producer  = kafka.producer();
    await producer.connect();

    while(true){

        const zap_run_outbox = await prisma.zapRunOutBox.findMany({
            where:{},
            take:10,
            select:{
                zapRunId:true
            }
        })

        await producer.send({
            topic:TOPIC_NAME,
            messages:zap_run_outbox.map(z=>{
                    return {
                        value:z.zapRunId
                    }
                })
        })

        await prisma.zapRunOutBox.deleteMany({
            where:{
                id:{
                    in:zap_run_outbox.map(z=>z.zapRunId)
                }
            }
        })
    }
}

swipper()