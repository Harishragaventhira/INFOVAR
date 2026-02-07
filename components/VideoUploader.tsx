
import React, { useRef } from 'react';

interface VideoUploaderProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onFileSelect, selectedFile }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="text-sm font-semibold text-slate-400">Video Input (Optional)</label>
      <div 
        onClick={() => inputRef.current?.click()}
        className={`relative h-48 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all
          ${selectedFile ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-700 hover:border-slate-500 bg-slate-800/50'}`}
      >
        <input 
          ref={inputRef}
          type="file" 
          accept="video/*" 
          onChange={handleFileChange} 
          className="hidden" 
        />
        
        {selectedFile ? (
          <div className="flex flex-col items-center gap-2 p-4 text-center">
            <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-indigo-200 font-medium truncate max-w-xs">{selectedFile.name}</p>
            <button 
              onClick={(e) => { e.stopPropagation(); onFileSelect(null); }}
              className="mt-2 text-xs text-indigo-400 hover:text-indigo-300 underline"
            >
              Remove file
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-slate-400">Click or drag video here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoUploader;
