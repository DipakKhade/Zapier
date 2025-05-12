import { get_metadata, get_test_hookId } from "@/lib/common-functions";
import { HOOKS_URL } from "config/config";
import { useEffect, useState } from "react";
import { PrettyMetadata } from "./pretty-metadata";


export const MetadataModal = ({ metaDataFor }: { metaDataFor: any }) => {
    const [testWebhook, setTestWebhook] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [metadata, setMetadata] = useState();
    const [hookId, setHookId] = useState<string>('');
    const [emailKey, setEmailKey] = useState<string>('');
    const [emailBody, setEmailBody] = useState<string>('');

    useEffect(() => {
      (async () => {
        const { hookId, userId } = await get_test_hookId(); 
        setHookId(hookId);
        setTestWebhook(`${HOOKS_URL}/hooks/catch/test/${userId}/${hookId}`);
      })();
    }, []);
  
    return (
      <div>
        <div className="flex items-center justify-center space-y-2 p-2">
          <div>
            <img
              src={metaDataFor.image}
              alt="img"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div>{metaDataFor.name}</div>
        </div>
  
        {metaDataFor.name === "Webhook" && <div>
            <div>
              <h3 className="text-slate-900 font-semibold text-lg">
                Your Webhook URL
              </h3>
              <p>
                You&apos;ll need to configure your application with this Zaps
                webhook URL
              </p>
            </div>
            <div className="flex">
              <span className="border border-slate-500 p-1 w-full m-2">
                <input
                  className="p-2 w-full"
                  value={testWebhook as string}
                  readOnly
                />
              </span>
              <button
                className="bg-slate-50 px-2 p-2 rounded-sm py-1 focus:outline-none cursor-pointer text-blue-500"
                onClick={() => {
                  navigator.clipboard.writeText(testWebhook as string);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              >
                Copy
              </button>
            </div>
            {copied && (
              <div className="flex flex-row-reverse font-medium">
                Copied to clipboard!
              </div>
            )}
            <div>
              <h4 className="text-slate-900 font-semibold text-lg">
                We&apos;re listening!
              </h4>
              <p>
                To confirm your trigger is set up correctly, we&apos;ll find
                recent requests in your account
              </p>
            </div>
            <div className="mt-12 flex justify-center items-center">
              <button className="bg-blue-500 p-3 w-full text-slate-50 font-semibold cursor-pointer" onClick={async()=>{
                setMetadata(await get_metadata(hookId))
              }}>
                Test Trigger
              </button>
            </div>

            <div>
                {metadata && <PrettyMetadata metadata={{metadata}} getOnSelect={(x)=>{
                    console.log('x from getOnSelect', x)
                }} />}
            </div>
          </div>
        }

        {
            metaDataFor.name === "Email" && <div>
               <div>
                    {!emailKey && <h4 className="text-slate-900 font-semibold text-lg">Click on Email Key</h4>}
                    { emailKey && <p>Target email key path : {JSON.stringify(emailKey.namespace)} </p> }

                    {!emailBody && <h4 className="text-slate-900 font-semibold text-lg">
                            Enter email body
                            <input type="text" placeholder="Enter email body" onChange={(e)=>{
                                setEmailBody(e.target.value)
                            }} />
                        </h4>}

               </div>
               <div>
                    {metadata && !emailKey && <PrettyMetadata metadata={metadata} getOnSelect={(x)=>{
                            setEmailKey(x)
                    }} />}
                    {metadata && emailKey && !emailBody &&  <PrettyMetadata metadata={metadata} getOnSelect={(x)=>{
                            setEmailKey(x)
                    }} />}
               </div>
            </div>
        }
      </div>
    );
  };
  