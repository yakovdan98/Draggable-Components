import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TreeView, TreeItem } from '@mui/lab';
import { useDrag } from 'react-dnd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export interface RenderTree {
  id: string;
  name: string;
  children?: RenderTree[];
}


function App() {
  const dragItem = useRef<number>(-1);
  const dragOverItem = useRef<number>(-1);
  const [data, setData] = useState<RenderTree[]>([
    {
      id: "1",
      name: 'item 1',
      children: [{ id: "6", name: "item 6" }, { id: "7", name: "item 7" }, { id: "8", name: "item 8" }]
    },
    {
      id: "2",
      name: 'item 2',
    },
    {
      id: "3",
      name: 'item 3',
    },
    {
      id: "4",
      name: 'item 4',
    },
    {
      id: "5",
      name: 'item 5',
    },
  ]);

  const handleDragStart = (e: any, index: number, params: any) => {
    dragItem.current = index;
    console.log(e);
  }

  const handleDragEnter = (e: any, index: number, params: any) => {
    dragOverItem.current = index;
    console.log(params);
  }

  const drop = (e: any) => {
    if (dragItem.current !== -1 && dragOverItem.current !== -1) {
      const dataCopy = [...data];
      const item = dataCopy[dragItem.current];
      dataCopy.splice(dragItem.current, 1);
      dataCopy.splice(dragOverItem.current, 0, item);
      dragItem.current = -1;
      dragOverItem.current = -1;
      setData(dataCopy);
    }
  }

  const renderTree = (nodes: RenderTree[]) => (

    nodes.map((node, index) => (
      <TreeItem
        draggable
        onDrag={(e) => handleDragStart(e, index, node)}
        onDragEnter={(e) => handleDragEnter(e, index, node)}
        onDragEnd={drop}
        onFocusCapture={e => e.stopPropagation()}
        key={node.id}
        nodeId={node.id}
        label={node.name}
      >
        {node.children ? renderTree(node.children) : null}
      </TreeItem>
    )));

  // nodes.map((node) => (
  //   <div
  //     draggable
  //     onDrag={(e) => { console.log(e) }}
  //     key={node.id}
  //   >
  //     {node.name}
  //   </div>
  // )));

  return (
    <div className="App">
      <div>
        <TreeView
          aria-label="customized"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {renderTree(data)}
        </TreeView>
      </div>

    </div>
  );
}

export default App;
