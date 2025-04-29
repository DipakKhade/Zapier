'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { get_available_actions, get_available_triggers } from '@/lib/common-functions';
import { SearchIcon } from 'lucide-react';

interface Node {
    id: string,
    position: {
        x : number,
        y : number
    },
    data:{
        label:string
    }
}
 
const initialNodes : Node[] = [
  { id: '1', position: { x: 800, y: 100 }, data: { label: 'Trigger' } },
  { id: '2', position: { x: 800, y: 200 }, data: { label: 'Action' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
 
export default function Page() {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    { id: '1', position: { x: 358, y: 112 }, data: { label: 'Trigger' } },
    { id: '2', position: { x: 358, y: 192 }, data: { label: 'Action' } },
  ]);
  
  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
  ];
  
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [availableTriggers, setAvailableTriggers] = useState([]);
  const [availableActions, setAvailableActions] = useState([]);
  const [selectedTrigger, setSelectedTrigger] = useState<any>([]);
  const [selectedActions, setSelectedActions] = useState<any>([]);

  const onConnect = useCallback<(args:Connection)=>void>(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds)),
    [setEdges],
  );
 
  const onNodeClick = useCallback(async (_event: any, node: Node) => {
    if (node.data.label === "Trigger") {
        setAvailableTriggers(await get_available_triggers());
    } else if (node.data.label === "Action") {
        setAvailableActions(await get_available_actions());
    }
    setSelectedNode(node);
    setDialogOpen(true);
  }, []);

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
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
              <DialogTitle>Select {selectedNode.data.label === "Trigger" ? "Triggers" : "Actions"}</DialogTitle>
              <DialogDescription>
                <div className="space-y-2">
                  <SelectionModal 
                    modalFor={selectedNode.data.label === "Trigger" ? "Triggers" : "Actions"} 
                    data={selectedNode.data.label === "Trigger" ? availableTriggers : availableActions} 
                  />
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

const SelectionModal = ( { modalFor, data } : {
    modalFor : "Triggers" | "Actions",
    data: any[],
    // setSelectedData: (args:any) => void;
} ) => {

    const [searchInput , setSearchInput] = useState<string| null>();
    const searchInputRef = useRef(null);
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
            <input type="text" ref={searchInputRef} id='searchBox' placeholder={`Search ${modalFor}`} className='border border-slate-50 p-2 w-full m-2' onChange={(e)=>{
              search(e.target.value);
              setSearchInput(e.target.value);
            }} />
        </div>
        <div className='space-x-2.5 grid grid-cols-2 space-y-2 pt-4'>
            {localData.map((ele, index)=> {
                return <div key={index} className='flex items-center justify-center space-y-2 p-2'>
                  <img src={ele.image} className='w-10 h-10 rounded-full' />
                  <button className='cursor-pointer font-bold text-lg text-start'>
                    {ele.name}
                </button>
                </div>
            })}
        </div>
    </div>
}