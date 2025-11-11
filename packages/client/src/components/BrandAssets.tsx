import React, { useState, useCallback } from 'react';
import axios from 'axios';

interface BrandAssetsProps {
  onStoryboardGenerated: (data: { script: any[]; frames: string[] }) => void;
}

export const BrandAssets: React.FC<BrandAssetsProps> = ({ onStoryboardGenerated }) => {
  const [logo, setLogo] = useState<File | null>(null);
  const [character, setCharacter] = useState<File | null>(null);
  const [story, setStory] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [characterPreview, setCharacterPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: (file: File | null) => void, setPreview: (url: string | null) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    const formData = new FormData();
    if (logo) formData.append('logo', logo);
    if (character) formData.append('character', character);
    formData.append('story', story);

    try {
      const response = await axios.post('http://localhost:3001/api/generate', formData);
      onStoryboardGenerated(response.data);
    } catch (error) {
      console.error('Error generating storyboard:', error);
    }
  };

  return (
    <div className="bg-white dark:bg-[#1C2030] rounded-xl p-6 flex flex-col gap-6 h-full">
      <h2 className="text-[#101218] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">1. Brand Assets &amp; Story</h2>

      {/* Brand Logo Upload */}
      <div className="flex flex-col items-center gap-4 rounded-lg border-2 border-dashed border-[#dadde7] dark:border-gray-700 px-6 py-10 text-center">
        <input type="file" id="logo-upload" className="hidden" onChange={(e) => handleFileChange(e, setLogo, setLogoPreview)} accept="image/svg+xml, image/png, image/jpeg" />
        {logoPreview ? (
          <img src={logoPreview} alt="Brand Logo Preview" className="max-h-24 rounded-lg" />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p className="text-[#101218] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Brand Logo</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">Drag & drop or click to upload (SVG, PNG, JPG)</p>
          </div>
        )}
        <label htmlFor="logo-upload" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f1f5] dark:bg-gray-700 text-[#101218] dark:text-white text-sm font-bold leading-normal tracking-[0.015em]">
          <span className="material-symbols-outlined text-xl mr-2">upload_file</span>
          <span className="truncate">Upload Logo</span>
        </label>
      </div>

      {/* Character Reference Upload */}
      <div className="flex flex-col items-center gap-4 rounded-lg border-2 border-dashed border-[#dadde7] dark:border-gray-700 px-6 py-10 text-center">
        <input type="file" id="char-upload" className="hidden" onChange={(e) => handleFileChange(e, setCharacter, setCharacterPreview)} accept="image/png, image/jpeg" />
        {characterPreview ? (
          <img src={characterPreview} alt="Character Reference Preview" className="max-h-24 rounded-lg" />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p className="text-[#101218] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Character Reference</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">Drag & drop or click to upload (PNG, JPG)</p>
          </div>
        )}
        <label htmlFor="char-upload" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f1f5] dark:bg-gray-700 text-[#101218] dark:text-white text-sm font-bold leading-normal tracking-[0.015em]">
          <span className="material-symbols-outlined text-xl mr-2">upload_file</span>
          <span className="truncate">Upload Reference</span>
        </label>
      </div>

      {/* Story Textarea */}
      <div className="flex flex-col gap-2">
        <label className="text-[#101218] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]" htmlFor="story-input">Describe Your Story</label>
        <textarea
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-3 text-sm text-gray-800 dark:text-gray-200 focus:ring-primary focus:border-primary placeholder:text-gray-400"
          id="story-input"
          placeholder="e.g., A hero embarks on a quest to find a hidden treasure..."
          rows={5}
          value={story}
          onChange={(e) => setStory(e.target.value)}
        ></textarea>
      </div>

      {/* Generate Button */}
      <button
        className="flex mt-auto min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
        onClick={handleGenerate}
      >
        <span className="material-symbols-outlined text-2xl mr-2">auto_awesome</span>
        <span className="truncate">Generate Storyboard</span>
      </button>
    </div>
  );
};
