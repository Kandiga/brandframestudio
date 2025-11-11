import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface ProjectDashboardProps {
  storyboardData: {
    script: { line: string; emotion: string; intent: string }[];
    frames: string[];
  } | null;
}

export const ProjectDashboard: React.FC<ProjectDashboardProps> = ({ storyboardData }) => {
  const handleExport = async () => {
    if (!storyboardData) return;

    const zip = new JSZip();

    // Add frames to the zip
    const framesFolder = zip.folder('frames');
    await Promise.all(storyboardData.frames.map(async (frameUrl, index) => {
      const response = await fetch(frameUrl);
      const blob = await response.blob();
      framesFolder?.file(`frame_${index + 1}.png`, blob);
    }));

    // Add prompts to the zip
    const prompts = storyboardData.script.map((s, i) => `Scene ${i + 1}: ${s.line} [${s.emotion}, ${s.intent}]`).join('\\n');
    zip.file('prompts_veo.txt', prompts);

    // Add storyboard metadata to the zip
    zip.file('storyboard.json', JSON.stringify(storyboardData, null, 2));

    // Generate and download the zip
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'BrandFrame_Clip_Pack.zip');
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 bg-white dark:bg-[#1C2030] rounded-xl p-6">
      <div className="flex flex-col gap-1">
        <p className="text-[#101218] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em]">Project Dashboard</p>
        <p className="text-[#5e678d] dark:text-gray-400 text-base font-normal leading-normal">Upload your assets, describe your story, and generate your storyboard.</p>
      </div>
      <button
        className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f1f5] dark:bg-gray-700 text-[#101218] dark:text-white text-sm font-bold leading-normal tracking-[0.015em]"
        onClick={handleExport}
        disabled={!storyboardData}
      >
        <span className="material-symbols-outlined text-xl mr-2">download</span>
        <span className="truncate">Export Pack</span>
      </button>
    </div>
  );
};
