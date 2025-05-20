import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

const sendSOLANA  = async (address:string,solAmount:number)=>{
    try {
        const connection = new Connection('https://api.devnet.solana.com');
        const sender = Keypair.fromSecretKey(Buffer.from(process.env.SOLANA_PRIVATE_KEY!, 'hex'));
        const txn = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: sender.publicKey,
                toPubkey: new PublicKey(address),
                lamports: solAmount * LAMPORTS_PER_SOL,
            })
        );
        txn.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        txn.feePayer = sender.publicKey;
        const seriallizedTransaction = txn.serialize();
        const signature = await connection.sendRawTransaction(seriallizedTransaction);
        console.log('transaction signature :',signature);
        return signature;
    } catch (error) {
        console.log('error while sending SOLANA',error)
    }
}

export default sendSOLANA;