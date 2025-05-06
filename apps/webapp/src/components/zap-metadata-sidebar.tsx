import { useEffect } from 'react';
import { X } from 'lucide-react';

export const ZapMetadataSidebar = ({ isOpen, onClose, children }:{
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode
}) => {
    useEffect(() => {
      const handleEscKey = (event) => {
        if (event.key === 'Escape' && isOpen) {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscKey);
      return () => {
        document.removeEventListener('keydown', handleEscKey);
      };
    }, [isOpen, onClose]);
  
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
      
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, [isOpen]);
  
    return (
      <>
        {isOpen && (
          <div 
            className="fixed inset-0 bg-opacity-50 z-40 transition-opacity"
            onClick={onClose}
          />
        )}
        
        <div 
          className={`fixed z-0 top-0 right-0 h-full bg-white shadow-lg w-[25vw] transform transition-transform duration-300 ease-in-out ${
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