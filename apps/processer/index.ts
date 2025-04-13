import { Kafka } from "kafkajs"
import { prisma } from "db/client"
import { TOPIC_NAME } from "config/config";

const kafka = new Kafka({
    clientId:'processer',
    brokers:['localhost:9092']
})

//kafka-topics.sh --create --topic zapqueue --bootstrap-server localhost:9092

async function swipper(){
    const producer  = kafka.producer();
    await producer.connect();

    while(1){
        const zap_run_outbox = await prisma.zapRunOutBox.findMany({
            where:{},
            take:10,
            select:{
                zapRunId:true
            }
        })

        await producer.send({
            topic:TOPIC_NAME,
            // messages:zap_run_outbox.map(z=>{
            //         return {
            //             value:z.zapRunId
            //         }
            //     })
            messages:[
                {value:"message from processer"},
                {value:"hi there"},
            ]
        })

        await prisma.zapRunOutBox.deleteMany({
            where:{
                id:{
                    in:zap_run_outbox.map(z=>z.zapRunId)
                }
            }
        })

        await new Promise(r => setTimeout(r, 3000));
    }
}

swipper()