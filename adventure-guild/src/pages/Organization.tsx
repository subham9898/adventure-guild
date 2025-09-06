import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Network, FileDown, Save, Users, User, Building, Eye, EyeOff } from 'lucide-react'
import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState, 
  addEdge,
  type Node,
  type Edge,
  type Connection,
  type NodeProps,
  type NodeTypes,
  BackgroundVariant,
  ReactFlowProvider
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/Card'
import { Button } from '@/components/Button'

// Define types for our nodes and edges
interface CustomNodeData {
  label: string
  role?: string
  department?: string
}

type CustomNode = Node<CustomNodeData>

// Custom node component
const CustomNodeComponent = ({ data }: NodeProps<CustomNodeData>) => {
  return (
    <div className="px-6 py-4 shadow-2xl rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 border-2 border-white/30 glow">
      <div className="font-bold text-white text-lg">{data.label}</div>
      {data.role && <div className="text-xs text-primary-200 mt-1">{data.role}</div>}
      {data.department && <div className="text-xs text-primary-200">{data.department}</div>}
    </div>
  )
}

const nodeTypes: NodeTypes = {
  custom: CustomNodeComponent
}

const Organization = () => {
  const [view, setView] = useState('hierarchy')
  const [showMinimap, setShowMinimap] = useState(true)
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  
  // Mock data for organization chart
  const initialNodes: CustomNode[] = [
    {
      id: '1',
      type: 'custom',
      data: { label: 'CEO', role: 'Executive', department: 'Leadership' },
      position: { x: 250, y: 0 },
    },
    {
      id: '2',
      type: 'custom',
      data: { label: 'CTO', role: 'Technology', department: 'Engineering' },
      position: { x: 100, y: 150 },
    },
    {
      id: '3',
      type: 'custom',
      data: { label: 'CFO', role: 'Finance', department: 'Finance' },
      position: { x: 400, y: 150 },
    },
    {
      id: '4',
      type: 'custom',
      data: { label: 'Frontend Lead', role: 'Development', department: 'Engineering' },
      position: { x: 0, y: 300 },
    },
    {
      id: '5',
      type: 'custom',
      data: { label: 'Backend Lead', role: 'Development', department: 'Engineering' },
      position: { x: 200, y: 300 },
    },
    {
      id: '6',
      type: 'custom',
      data: { label: 'HR Director', role: 'People', department: 'Human Resources' },
      position: { x: 400, y: 300 },
    },
    {
      id: '7',
      type: 'custom',
      data: { label: 'Frontend Developer', role: 'Development', department: 'Engineering' },
      position: { x: 0, y: 450 },
    },
    {
      id: '8',
      type: 'custom',
      data: { label: 'UX Designer', role: 'Design', department: 'Engineering' },
      position: { x: 100, y: 450 },
    },
    {
      id: '9',
      type: 'custom',
      data: { label: 'Backend Developer', role: 'Development', department: 'Engineering' },
      position: { x: 200, y: 450 },
    },
  ]

  const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' },
    { id: 'e2-4', source: '2', target: '4' },
    { id: 'e2-5', source: '2', target: '5' },
    { id: 'e3-6', source: '3', target: '6' },
    { id: 'e4-7', source: '4', target: '7' },
    { id: 'e4-8', source: '4', target: '8' },
    { id: 'e5-9', source: '5', target: '9' },
  ]

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge(params, eds))
  }, [setEdges])

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      if (!reactFlowWrapper.current) return

      const type = event.dataTransfer.getData('application/reactflow')

      // Check if the dropped element is a valid node type
      if (typeof type === 'undefined' || !type) {
        return
      }

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      }
      
      const newNode = {
        id: `node_${Date.now()}`,
        type: 'custom',
        position,
        data: { 
          label: type === 'employee' ? 'New Employee' : 'New Department',
          role: type === 'employee' ? 'Role' : undefined,
          department: type === 'employee' ? 'Department' : type === 'department' ? 'Department Name' : undefined
        },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [setNodes]
  )

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold gradient-text mb-4">Organization</h1>
        <p className="text-xl text-white/80 max-w-2xl mx-auto">
          Visualize and manage your organizational structure with interactive charts
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={() => setView('hierarchy')}
            variant={view === 'hierarchy' ? 'default' : 'secondary'}
            className={`px-4 py-2 rounded-full ${view === 'hierarchy' ? 'glow pulse-glow' : ''}`}
          >
            <Network className="h-4 w-4 mr-1" />
            Hierarchy
          </Button>
          <Button 
            onClick={() => setView('network')}
            variant={view === 'network' ? 'default' : 'secondary'}
            className={`px-4 py-2 rounded-full ${view === 'network' ? 'glow pulse-glow' : ''}`}
          >
            <Users className="h-4 w-4 mr-1" />
            Network
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={() => setShowMinimap(!showMinimap)}
            variant="secondary"
            className="px-4 py-2 rounded-full"
          >
            {showMinimap ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
            {showMinimap ? 'Hide Map' : 'Show Map'}
          </Button>
          <Button variant="secondary" className="px-4 py-2 rounded-full">
            <Save className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button variant="secondary" className="px-4 py-2 rounded-full">
            <FileDown className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <Card className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl">Elements</CardTitle>
              <CardDescription>Drag to add to the chart</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className="flex items-center p-4 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl cursor-move text-white shadow-lg glow"
                  draggable
                  onDragStart={(event) => onDragStart(event, 'employee')}
                >
                  <User className="h-6 w-6 mr-3" />
                  <span className="font-bold">Employee</span>
                </div>
                <div
                  className="flex items-center p-4 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl cursor-move text-white shadow-lg glow"
                  draggable
                  onDragStart={(event) => onDragStart(event, 'department')}
                >
                  <Building className="h-6 w-6 mr-3" />
                  <span className="font-bold">Department</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <Card className="h-[600px] bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border-0">
            <CardContent className="h-full p-0">
              <div ref={reactFlowWrapper} className="h-full rounded-2xl overflow-hidden">
                <ReactFlowProvider>
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    fitView
                    nodeTypes={nodeTypes}
                    className="react-flow-dark"
                  >
                    <Controls className="bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg" />
                    {showMinimap && (
                      <MiniMap 
                        className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg" 
                        nodeColor={(n) => {
                          if (n.type === 'custom') return '#6366f1'
                          return '#ccc'
                        }}
                      />
                    )}
                    <Background variant={BackgroundVariant.Dots} gap={16} size={2} color="#cbd5e1" />
                  </ReactFlow>
                </ReactFlowProvider>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div 
          whileHover={{ y: -5 }}
          className="card-hover glow"
        >
          <Card className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <User className="h-6 w-6 text-primary-500 mr-2" />
                Drag & Drop Editor
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Easily manage your organization structure by dragging and dropping employees and departments.
                Create complex hierarchies with intuitive visual tools.
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="card-hover glow"
        >
          <Card className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Eye className="h-6 w-6 text-primary-500 mr-2" />
                Real-time Validation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Automatically validate reporting lines and organizational structure for consistency.
                Get instant feedback on potential issues and conflicts.
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="card-hover glow"
        >
          <Card className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <FileDown className="h-6 w-6 text-primary-500 mr-2" />
                Export Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Save versions of your organization chart and export as PDF, PNG, or SVG.
                Share with stakeholders or integrate with other systems.
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Organization