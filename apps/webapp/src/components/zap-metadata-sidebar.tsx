
import { get_test_hookId, get_test_webhook_uuid } from '@/lib/common-functions';
import { HOOKS_URL } from 'config/config';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ZapMetadataSidebar = ({ isOpen, onClose, children }:{
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode
}) => {
  const [testWebhook, setTestWebhook] = useState<string | null>(null);
  const [hookUuid, setHookUuid] = useState<string | null>(null);

  useEffect(()=>{
    (async()=>{
       const { hookId, userId } = await get_test_hookId();
       setTestWebhook(`${HOOKS_URL}/hooks/catch/${userId}/${hookId}`)
    })();
  })
  
    return (
      <>
        <div 
          className={`fixed z-0 top-0 right-0 h-full bg-white shadow-lg w-[40vw] transform transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            
          </div>
          
          <div className="p-4 h-full overflow-y-auto pt-12">
            <div className='flex justify-end'>
                <button 
                    onClick={onClose}
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none transition-colors"
                    aria-label="Close sidebar"
                    >
                        <X size={20} />
                </button>
            </div>
            {children}
          </div>
        </div>
      </>
    );
  };