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
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [availableTriggers, setAvailableTriggers] = useState([]);
  const [availableActions, setAvailableActions] = useState([]);


  const onConnect = useCallback<(args:Connection)=>void>(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  const onNodeClick = useCallback(async (_event: any, node: Node) => {
    if( node.data.label == "Trigger" ) {
        setAvailableActions(await get_available_triggers());
    } else if( node.data.label == "Action" ) {
        setAvailableTriggers(await get_available_actions());
    }
    setSelectedNode(node);
    setDialogOpen(true);
  }, []);

 
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
      >
        <Background variant={BackgroundVariant.Dots} gap={15} size={0.7} />
      </ReactFlow>

      {selectedNode && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select {`${selectedNode.data.label == "Trigger" ? "Triggers" : "Actions" }`}</DialogTitle>
            <DialogDescription>
              <div className="space-y-2">
               <SelectionModal modalFor={`${selectedNode.data.label == "Trigger" ? "Triggers" : "Actions" }`} data={selectedNode.data.label == "Trigger" ? availableTriggers : availableActions}/>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      )}
    </Dialog>
  </div>
  );
}

const SelectionModal = ( { modalFor , data } : {
    modalFor : "Triggers" | "Actions",
    data: any[]
} ) => {

    const searchInputRef = useRef(null);

    useEffect(()=> {
        // (searchInputRef as unknown as HTMLInputElement).focus();
        document.getElementById('searchBox')?.focus()  //TODO: fix this 
    },[])

    return <div>
        <div className='flex'>
            <SearchIcon className='mt-3'/>
            <input type="text" ref={searchInputRef} id='searchBox' placeholder={`Search ${modalFor}`} className='border border-slate-50 p-2 w-full m-2' />
        </div>
    </div>
}