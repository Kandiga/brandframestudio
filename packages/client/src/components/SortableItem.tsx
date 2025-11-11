import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableItemProps {
  id: string;
  frame: string;
  index: number;
}

export const SortableItem: React.FC<SortableItemProps> = ({ id, frame, index }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col gap-2"
    >
      <div className="aspect-video w-full rounded-lg bg-cover bg-center" style={{ backgroundImage: `url('${frame}')` }}></div>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Scene {Math.floor(index / 2) + 1}: Frame {index % 2 === 0 ? 'A' : 'B'}</p>
    </div>
  );
};
