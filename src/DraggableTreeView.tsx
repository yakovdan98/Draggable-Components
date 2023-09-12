import * as React from 'react';
import { useState, useEffect } from 'react';
import { TreeView, TreeItem } from '@mui/x-tree-view';
import DraggableTreeItem from './DraggableTreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export interface RenderTree {
  id: string;
  name: string | React.ReactNode;
  children: RenderTree[];
}

const DraggableTreeView = () => {
  const [data, setData] = useState<RenderTree[]>([
    {
      id: "1",
      name: 'item 1',
      children: [{ id: "6", name: "item 6", children: [] }, { id: "7", name: "item 7", children: [] }, { id: "8", name: "item 8", children: [] }]
    },
    {
      id: "2",
      name: 'item 2',
      children: []
    },
    {
      id: "3",
      name: 'item 3',
      children: []
    },
    {
      id: "4",
      name: 'item 4',
      children: []
    },
    {
      id: "5",
      name: 'item 5',
      children: []
    },
  ]);

  const addNode = (node: RenderTree, nodeToAdd: RenderTree, tree: RenderTree[]) => {
    if(tree.length === 0) return;
    const index = tree.findIndex((item) => item.id === node.id);
    if (index !== -1) {
      tree[index].children.push(nodeToAdd);
    } else {
      tree.forEach((item) => {
        addNode(node, nodeToAdd, item.children);
      });
    }
  }

  const removeNode = (node: RenderTree, tree: RenderTree[]) => {
    if(tree.length === 0) return;
    const index = tree.findIndex((item) => item.id === node.id);
    if (index !== -1) {
      tree.splice(index, 1);
    } else {
      tree.forEach((item) => {
        removeNode(node, item.children);
      });
    }
  }

  const handleDrop = (dragItem: RenderTree, dropItem: RenderTree) => {
    if (dragItem === dropItem) return;
    setData((prevData) => {
      const dataCopy = [...prevData];
      removeNode(dragItem, dataCopy);
      addNode(dropItem, dragItem, dataCopy);
      return dataCopy;
    });
  }

  const renderTree = (nodes: RenderTree[]) => (
    nodes.map((node) => (
      <DraggableTreeItem
        nodeData={node}
        key={node.id}
        nodeId={node.id}
        label={node.name}
        onFocusCapture={e => e.stopPropagation()}
        handleDrop={handleDrop}
      >
        {node.children ? renderTree(node.children) : null}
      </DraggableTreeItem>
    )));

  return (
    <div>
      <TreeView
        aria-label="customized"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(data)}
      </TreeView>
    </div>
  );
}

export default DraggableTreeView;