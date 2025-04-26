'use client';
import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, Dialog } from '@/components/dialog';

 
const initialNodes = [
  { id: '1', position: { x: 800, y: 100 }, data: { label: 'Trigger' } },
  { id: '2', position: { x: 800, y: 200 }, data: { label: 'Action' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];
 
export default function Page() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  const onNodeClick = useCallback((event: any, node: any) => {
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
        <Background variant="dots" gap={15} size={0.7} />
      </ReactFlow>

      {selectedNode && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Node Details</DialogTitle>
            <DialogDescription>
              <div className="space-y-2">
                <p><strong>ID:</strong> {selectedNode.id}</p>
                <p><strong>Label:</strong> {selectedNode.data?.label}</p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      )}
    </Dialog>
  </div>
  );
}