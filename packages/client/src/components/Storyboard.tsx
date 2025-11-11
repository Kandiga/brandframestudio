import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

interface StoryboardProps {
  script: { line: string; emotion: string; intent: string }[];
  frames: string[];
  onSceneReorder: (oldIndex: number, newIndex: number) => void;
  onScriptChange: (newScript: { line: string; emotion: string; intent: string }[]) => void;
}

export const Storyboard: React.FC<StoryboardProps> = ({ script, frames, onSceneReorder, onScriptChange }) => {
  const [activeTab, setActiveTab] = useState('storyboard');
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      onSceneReorder(Number(active.id), Number(over.id));
    }
  };

  const handleScriptLineChange = (index: number, value: string) => {
    const newScript = [...script];
    newScript[index].line = value;
    onScriptChange(newScript);
  };

  return (
    <div className="bg-white dark:bg-[#1C2030] rounded-xl p-6 flex flex-col gap-6">
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav aria-label="Tabs" className="flex -mb-px">
          <a
            href="#"
            className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === 'storyboard'
                ? 'text-primary border-primary'
                : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => setActiveTab('storyboard')}
          >
            Storyboard View
          </a>
          <a
            href="#"
            className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
              activeTab === 'script'
                ? 'text-primary border-primary'
                : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => setActiveTab('script')}
          >
            Script View
          </a>
        </nav>
      </div>

      {activeTab === 'storyboard' && (
        <>
          {/* SectionHeader for Timeline */}
          <h2 className="text-[#101218] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pt-2">2. Generated Storyboard</h2>
          {/* Timeline */}
          <div className="flex items-center justify-between px-2">
            <div className="flex-1 text-center">
              <div className="relative">
                <div aria-hidden="true" className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-dashed border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-between">
                  {script.map((_, index) => (
                    <div className="flex flex-col items-center" key={index}>
                      <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-white dark:ring-[#1C2030]"></div>
                      <p className="mt-2 text-sm font-medium text-[#101218] dark:text-white">Scene {index + 1}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Storyboard Grid */}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={frames.map((_, i) => String(i))} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {frames.map((frame, index) => (
                  <SortableItem key={index} id={String(index)} frame={frame} index={index} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </>
      )}

      {activeTab === 'script' && (
        <div className="flex flex-col gap-4">
          {script.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <label className="text-[#101218] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Scene {index + 1}</label>
              <input
                type="text"
                value={item.line}
                onChange={(e) => handleScriptLineChange(index, e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 text-sm text-gray-800 dark:text-gray-200 focus:ring-primary focus:border-primary placeholder:text-gray-400"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
