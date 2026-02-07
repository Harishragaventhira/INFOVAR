import React, { useState, useCallback } from 'react';
import VideoUploader from './components/VideoUploader';
import AnalysisResults from './components/AnalysisResults';
import SystemLogs from './components/SystemLogs';
import CodeViewer from './components/CodeViewer';
import { analyzeContent } from './services/geminiService';
import { AnalysisResult, LogEntry } from './types';

function App() {
  const [textInput, setTextInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeTab, setActiveTab] = useState<'analysis' | 'backend'>('analysis');

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [...prev, { timestamp, message, type }]);
  }, []);

  const handleAnalyze = async () => {
    if (!textInput && !selectedFile) {
      alert('Please provide at least one input (Text or Video).');
      return;
    }

    setIsAnalyzing(true);
    setResult(null);
    setLogs([]);
    addLog('Initializing pipeline...', 'info');

    try {
      let videoBase64: string | undefined;

      if (selectedFile) {
        await new Promise(r => setTimeout(r, 800));
        videoBase64 = await new Promise(resolve => {
          const reader = new FileReader();
          reader.onload = () =>
            resolve((reader.result as string).split(',')[1]);
          reader.readAsDataURL(selectedFile);
        });
      }

      await new Promise(r => setTimeout(r, 1200));
      const analysis = await analyzeContent(textInput, videoBase64);

      setResult(analysis);
      addLog('Analysis completed successfully.', 'success');
    } catch {
      addLog('Critical error during analysis.', 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0B1C2D] text-white flex flex-col overflow-hidden">

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-[#102A43] border-b border-gray-300/20">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-black tracking-wide">
              INFOVAR
            </h1>
            <p className="text-[10px] text-gray-300 uppercase tracking-widest">
              Information Verification & Risk Analysis
            </p>
          </div>

          <nav className="flex gap-2 bg-white/10 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('analysis')}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition
                ${activeTab === 'analysis'
                  ? 'bg-white text-[#0B1C2D]'
                  : 'text-gray-300 hover:text-white'}`}
            >
              Analysis Dashboard
            </button>

            <button
              onClick={() => setActiveTab('backend')}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition
                ${activeTab === 'backend'
                  ? 'bg-white text-[#0B1C2D]'
                  : 'text-gray-300 hover:text-white'}`}
            >
              Python Core Source
            </button>
          </nav>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-1 w-full bg-[#0B1C2D]">
        <div className="max-w-7xl mx-auto px-6 py-8">

          {activeTab === 'analysis' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* LEFT COLUMN */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 rounded-xl bg-white text-[#0B1C2D] shadow-lg space-y-4 border border-gray-300">
                  <h2 className="text-lg font-bold">Input Sources</h2>

                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Enter text to analyze..."
                    className="w-full h-32 border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#0B1C2D] outline-none"
                  />

                  <VideoUploader
                    onFileSelect={setSelectedFile}
                    selectedFile={selectedFile}
                  />

                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full py-3 rounded-lg font-bold bg-[#0B1C2D] text-white hover:bg-[#163A5F] transition disabled:opacity-60"
                  >
                    {isAnalyzing ? 'Analyzing...' : 'Execute Analysis'}
                  </button>
                </div>

                <SystemLogs logs={logs} />
              </div>

              {/* RIGHT COLUMN */}
              <div className="lg:col-span-8">
                {result ? (
                  <AnalysisResults result={result} />
                ) : (
                 <div className="h-full min-h-[300px] flex items-center justify-center 
                bg-white text-[#0B1C2D] 
                border-2 border-dashed border-gray-300 
                rounded-xl shadow-sm">
                Awaiting analysis input
             </div>
                )}
              </div>

            </div>
          ) : (
            <div className="bg-white text-[#0B1C2D] border border-gray-300 rounded-xl p-6 shadow-lg">
              <CodeViewer />
            </div>
          )}

        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-gray-300/20 bg-[#0B1C2D] py-4 text-center text-xs text-gray-400">
      </footer>

    </div>
  );
}

export default App;