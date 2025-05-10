'use client';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, Dialog } from '@/components/dialog';
import { get_available_actions, get_available_triggers, get_test_hookId } from '@/lib/common-functions';
import { Divide, Router, SearchIcon } from 'lucide-react';
import { ZapMetadataSidebar } from '@/components/zap-metadata-sidebar';
import { ZapCreateHeader } from '@/components/zap-create-header';
import { HOOKS_URL, PRIMARY_BACKEND_URL } from 'config/config';
import { useRouter } from 'next/navigation';

interface Node {
    id: string,
    position: {
        x : number,
        y : number
    },
    data:{
        label:string,
        // display:string
    }
} 
 
export default function Page() {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    { id: '1', position: { x: 358, y: 112 }, data: { label: 'Trigger' } },
    { id: '2', position: { x: 358, y: 192 }, data: { label: 'Action' } },
  ]);
  
  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
  ];
  
  const router = useRouter();
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [availableTriggers, setAvailableTriggers] = useState([]);
  const [availableActions, setAvailableActions] = useState([]);
  const [selectedTrigger, setSelectedTrigger] = useState<any>(null);
  const [selectedActions, setSelectedActions] = useState<any>([]);
  const [metadata, setMetadata] = useState<any>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [metaDataFor, setMetaDataFor] = useState<any>(null);

  const onConnect = useCallback<(args:Connection)=>void>(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds)),
    [setEdges],
  );
 
  const onNodeClick = useCallback(async (_event: any, node: Node) => {
    if (node.id === "1") {
        setAvailableTriggers(await get_available_triggers());
    } else {
        setAvailableActions(await get_available_actions());
    }
    setSelectedNode(node);
    setDialogOpen(true);
  }, []);

  const handleOpenChange = (open: boolean) => {
   setDialogOpen(open)
   console.log(selectedTrigger)
  }

  const handleClose = (modalFor : "Triggers" | "Actions", selected:any, selectedNode: any) => {
    setDialogOpen(false)
    console.log("Dialog was closed", selectedTrigger)
    if(modalFor === "Triggers"){
        setSelectedTrigger(selected)
    } else if(modalFor === "Actions"){
        const targetNodeIndex = nodes.findIndex((node: Node) => node.id === selectedNode.id);
        const targetNodeId = nodes[targetNodeIndex].id;
        const updatedNodes = nodes.map((node: Node) => {
          if(node.id == targetNodeId){
            return {
              ...node,
              data: {
                label: selected[0].name
              }
            }
          } else {
            return {
              ...node
            }
          }
        })

        setNodes(prev => {
          return [...updatedNodes]
        })

        setSelectedActions(prev => {
          const updatedActions = [...prev];
          updatedActions.push(selected[0])
          console.log("updated actions", updatedActions)
          return updatedActions
        })

        console.log("if control", nodes)
        console.log("selected trigger", selectedTrigger)
        console.log("selected actions", selectedActions)
    }

    setIsSidebarOpen(true)
    setMetaDataFor(selected)
  } 

  useEffect(() => {
    if (selectedTrigger !== null) {
      const newNodes:Node[] = nodes.map((node,index)=>{
        if(index == 0){
         return {
           ...node,
           data: {
            label: selectedTrigger[0]?.name
           }
         }
        }
        return {
          ...node
        }
      })
      setNodes((nodes:any) => newNodes)
      // nodes[0].data.label = selectedTrigger[0]?.name
      console.log("nodes", nodes)
    }
  }, [selectedTrigger]);

  const addNodeBelow = useCallback(() => {
    const nodeIds = nodes.map(n => parseInt(n.id));
    const maxId = Math.max(...nodeIds);
    const newId = (maxId + 1).toString();
    const sortedNodes = [...nodes].sort((a, b) => a.position.y - b.position.y);
    const lastNode = sortedNodes[sortedNodes.length - 1];
    const newX = lastNode.position.x;
    const newY = lastNode.position.y + 80;
    
    const newNode = {
      id: newId,
      position: { x: newX, y: newY },
      data: { label: 'Action' }
    };
    
    setNodes(nds => [...nds, newNode]);
    
    setEdges(eds => [
      ...eds,
      { id: `e${lastNode.id}-${newId}`, source: lastNode.id, target: newId, type: 'smoothstep' }
    ]);
  }, [nodes, setNodes, setEdges]);

  const onPublish = async () => {
    const res = await fetch(`${PRIMARY_BACKEND_URL}/api/v1/zap/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        payload: {
          availableTriggerId: selectedTrigger[0].id,
          actions: selectedActions.map((action:any)=>{
            return {
              availableActionId: action.id,
              metadata: {}
            }
          }),
          metadata: {}
        }
      })
    });
    const data = await res.json();
    console.log("data", data)
    if(data.success){
      router.push('/dashboard')
    }
  }
 
  return (
    <>
    <ZapCreateHeader onPublish={onPublish} />
    <div style={{ width: '100vw', height: '100vh' }}>
      <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          fitView
        >
          <Background variant={BackgroundVariant.Dots} gap={15} size={0.7} />
          
          {edges.map((edge) => {
            const sourceNode = nodes.find((n) => n.id === edge.source);
            const targetNode = nodes.find((n) => n.id === edge.target);
            
            if (!sourceNode || !targetNode) return null;
            
            const sortedNodes = [...nodes].sort((a, b) => a.position.y - b.position.y);
            const lastNode = sortedNodes[sortedNodes.length - 1];
            
            if (targetNode.id === lastNode.id) {
              const midX = sourceNode.position.x - 30;  
              const midY = (sourceNode.position.y + targetNode.position.y) / 2;
              
              return (
                <div
                  key={`plus-${edge.id}`}
                  style={{
                    position: 'absolute',
                    left: midX,
                    top: midY,
                    zIndex: 10,
                  }}
                >
                  <button
                    onClick={addNodeBelow}
                    style={{
                      background: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '50%',
                      width: 28,
                      height: 28,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 16,
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      color:'blue'
                    }}
                  >
                    + 
                  </button>
                </div>
              );
            }
            return null;
          })}

        </ReactFlow>

        {selectedNode && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select {selectedNode.data.label === "Trigger" ? "Trigger" : "Action"}</DialogTitle>
              <DialogDescription>
                <div className="space-y-2">
                  <SelectionModal 
                    modalFor={selectedNode.id === "1" ? "Triggers" : "Actions"}
                    data={selectedNode.id === "1" ? availableTriggers : availableActions} 
                    handleClose={handleClose}
                    selectedNode = {selectedNode}
                  />
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>

      {
        isSidebarOpen && <ZapMetadataSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} >
          <MetadataModal metaDataFor={metaDataFor} />
        </ZapMetadataSidebar>
      }

    </div>
    </>
  );
}

const SelectionModal = ( { modalFor, data, handleClose, selectedNode  } : {
    modalFor : "Triggers" | "Actions",
    data: any[],
    handleClose: (modalFor : "Triggers" | "Actions", selected:any, selectedNode: Node) => void,
    selectedNode : any
} ) => {

    const backUpData = [...data];
    const [localData, setLocalData] = useState<any[]>([...data]);

    useEffect(()=> {
        // (searchInputRef as unknown as HTMLInputElement).focus();    
        document.getElementById('searchBox')?.focus()  //TODO: fix this 
    },[])

    const search = ( searchArgs: string ) => {
      setLocalData(backUpData.filter(x=>x.name.toLowerCase().includes(searchArgs.trim().toLowerCase())))
    }

    return <div>
        <div className='flex'>
            <SearchIcon className='mt-3'/>
            <input type="text" id='searchBox' placeholder={`Search ${modalFor}`} className='border border-slate-50 p-2 w-full m-2' onChange={(e)=>{
              search(e.target.value);
            }} />
        </div>
        <div className='space-x-2.5 grid grid-cols-2 space-y-2 pt-4'>
            {localData.map((ele, index)=> {
                return <div key={index}>
                  <button className='cursor-pointer font-bold text-lg text-start flex items-center justify-center space-y-2 p-2' onClick={()=>{
                    // setSelectedData([{...ele}])
                    handleClose(modalFor,[{...ele}], selectedNode)
                  }}>
                    <img src={ele.image} className='w-10 h-10 rounded-full' />
                    <div>{ele.name}</div>
                </button>
                </div>
            })} 
        </div>
    </div>
}

const MetadataModal = ({metaDataFor}:{
  metaDataFor: any
}) =>{
  const [testWebhook, setTestWebhook] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
        const { hookId, userId } = await get_test_hookId(); // <- this might fail
        setTestWebhook(`${HOOKS_URL}/hooks/catch/test/${userId}/${hookId}`);
    })();
  }, []);
  

  return <div>
    <div className='flex items-center justify-center space-y-2 p-2'>
      <div><img src={metaDataFor[0].image} alt="img" className="w-10 h-10 rounded-full" /></div>
      <div>{metaDataFor[0].name}</div>
    </div>

  {metaDataFor[0].name === 'Webhook' && <div>
    <div>
        <h3>Your Webhook URL</h3>
        <p>You&apos;ll need to configure your application with this Zaps webhook URL</p>
      </div>
      <div className='flex'>
        <span className='border border-slate-500 p-1 w-full m-2'>
           <input className='p-2 w-full' value={testWebhook as string} readOnly />
        </span>
        <button className="bg-slate-50 px-2 p-2 rounded-sm py-1 focus:outline-none cursor-pointer text-blue-500" onClick={()=>{
          navigator.clipboard.writeText(testWebhook as string);
        }}>
          Copy
        </button>
      </div>
      <div>
        <h4 className='text-slate-900 font-semibold text-lg'>
        We&apos;re listening!
        </h4>
        <p>
        To confirm your trigger is set up correctly, we&apos;ll find recent requests in your account
        </p>
      </div>
      <div className='mt-12 flex justify-center items-center'>
        <button className='bg-blue-500 p-3 w-full text-slate-50 font-semibold'>Test Trigger</button>
      </div>
  </div> }

    
  </div>
}