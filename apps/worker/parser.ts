import type { JsonValue } from "@prisma/client/runtime/library"

export const metadataParser = (actions:'Send Email'|'Send SOLANA',currentZapMetadata:JsonValue,actionMetadata:JsonValue)=>{
  try {
    const getValueFromPath = (obj: any, path: string): any => {
        return path.split('.').reduce((acc, key) => acc?.[key], obj);
      };
    
      const resolvedMetadata: Record<string, any> = {};
    
      if (actions === 'Send Email') {
        for (const key in actionMetadata as Record<string, any>) {
          const value = (actionMetadata as any)[key];
          if (typeof value === 'string') {
            const newValue = value.replace(/{(metadata\.[^}]+)}/g, (_, path) => {
              const resolved = getValueFromPath(currentZapMetadata, path);
              return resolved !== undefined ? resolved : '';
            });
            resolvedMetadata[key] = newValue;
          } else {
            resolvedMetadata[key] = value;
          }
        }
    
        return resolvedMetadata;
  } else if (actions === 'Send SOLANA') {
    
  }
  } catch (error) {
    console.log('error while parsing metadata',error)
  }
}

/*
currentZapMetadata
{
    meatadata:{
        "email": "dipakkhade@gmail.com",
        "body": "test"
        },
}

actionMetadata
{
    email:"{metadata.email}",
    body:"{metadata.body}",
}

 console.log(metadataParser('Send Email',
    {metadata:{
        clientId: {
            postId : {
                data:{email:"dipakkhade@gmail.com",body:"test"}
            }
        }
    }},
    {email:"{metadata.clientId.postId.data.email}",body:"{metadata.clientId.postId.data.body}"}))
*/