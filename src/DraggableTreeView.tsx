import * as React from 'react';
import { useState, useEffect } from 'react';
import { TreeView, TreeItem } from '@mui/lab';
import { useDrag } from 'react-dnd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export interface RenderTree {
  id: string;
  name: string;
  children?: RenderTree[];
}

const DraggableTreeView = () => {
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

  const renderTree = (items: RenderTree) => {
    <TreeItem 
  }
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