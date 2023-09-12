import { TreeItemProps } from '@mui/x-tree-view';
import { useDrag, useDrop } from 'react-dnd';
import { TreeItem } from '@mui/x-tree-view';
import * as React from 'react';
import { RenderTree } from './DraggableTreeView';

interface DraggableTreeItemProps extends TreeItemProps {
   handleDrop: (dragItem: RenderTree, dropItem: RenderTree) => void,
   nodeData: RenderTree,
}
const DraggableTreeItem = ({ nodeData, handleDrop, ...props }: DraggableTreeItemProps) => {

   const [{ isDragging }, drag] = useDrag({
      type: 'file',
      item: nodeData,
      collect: (monitor) => ({
         isDragging: monitor.isDragging(),
      }),
   });
   const [{ isOver }, drop] = useDrop(() => ({
      accept: 'file',
      drop: (item: RenderTree, monitor) => {
         const didDrop = monitor.didDrop();
         if (didDrop) return;
         handleDrop(item, nodeData);
      },
      collect: (monitor) => ({
         isOver: monitor.isOver(),
      }),

   }));
   return (
      <div ref={drop}>
         <TreeItem ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }} {...props} />
      </div>
   );
}

export default DraggableTreeItem;