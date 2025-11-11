import React, { useState } from 'react';
import './App.css';
import { Sidebar } from './components/Sidebar';
import { BrandAssets } from './components/BrandAssets';
import { Storyboard } from './components/Storyboard';
import { ProjectDashboard } from './components/ProjectDashboard';

function App() {
  const [storyboardData, setStoryboardData] = useState<{ script: any[]; frames: string[] } | null>(null);

  const handleStoryboardGenerated = (data: { script: any[]; frames: string[] }) => {
    setStoryboardData(data);
  };

  const handleSceneReorder = (startIndex: number, endIndex: number) => {
    if (!storyboardData) return;

    const newFrames = Array.from(storyboardData.frames);
    const [removed] = newFrames.splice(startIndex, 1);
    newFrames.splice(endIndex, 0, removed);

    const newScript = Array.from(storyboardData.script);
    const [removedScript] = newScript.splice(Math.floor(startIndex / 2), 1);
    newScript.splice(Math.floor(endIndex / 2), 0, removedScript);

    setStoryboardData({
      script: newScript,
      frames: newFrames,
    });
  };

  const handleScriptChange = (newScript: any[]) => {
    if (!storyboardData) return;

    setStoryboardData({
      ...storyboardData,
      script: newScript,
    });
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display">
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="flex h-full min-h-screen flex-col lg:flex-row">
          <Sidebar />
          <main className="flex-1 p-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-1 flex flex-col gap-6">
                <BrandAssets onStoryboardGenerated={handleStoryboardGenerated} />
              </div>
              <div className="xl:col-span-2 flex flex-col gap-6">
                <ProjectDashboard storyboardData={storyboardData} />
                {storyboardData ? (
                  <Storyboard
                    script={storyboardData.script}
                    frames={storyboardData.frames}
                    onSceneReorder={handleSceneReorder}
                    onScriptChange={handleScriptChange}
                  />
                ) : (
                  <div className="bg-white dark:bg-[#1C2030] rounded-xl p-6 flex flex-col items-center justify-center text-center h-full">
                    <p className="text-lg font-medium text-gray-500 dark:text-gray-400">Your generated storyboard will appear here.</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">Fill in your brand assets and story to get started.</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
