import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Upload, FileSpreadsheet, RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';
import { PortfolioData } from '../types';
import { ExcelService } from '../services/excelService';
import { soundFX } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onUpdateData: (newData: PortfolioData) => void;
  onResetData: () => void;
  isCustomData: boolean;
}

export const ExcelManagerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  data,
  onUpdateData,
  onResetData,
  isCustomData
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'sheets' | 'instructions'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownload = () => {
    soundFX.playClick();
    ExcelService.downloadExcelTemplate(data, data.profile.name.toLowerCase().replace(/\s+/g, '_') + '_portfolio_data.xlsx');
    setStatusMessage({
      type: 'success',
      text: 'Excel template downloaded! Edit it in Microsoft Excel, Google Sheets, or LibreOffice and re-upload here.'
    });
  };

  const handleFileProcess = async (file: File) => {
    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      setStatusMessage({
        type: 'error',
        text: 'Please upload a valid Excel spreadsheet (.xlsx or .xls).'
      });
      return;
    }

    try {
      const buffer = await file.arrayBuffer();
      const parsedData = ExcelService.parseExcel(buffer);
      onUpdateData(parsedData);
      soundFX.playSuccess();
      setStatusMessage({
        type: 'success',
        text: 'Successfully synced! Loaded ' + parsedData.projects.length + ' projects, ' + parsedData.skills.length + ' skills, and ' + parsedData.experiences.length + ' experiences.'
      });
    } catch (err) {
      console.error(err);
      setStatusMessage({
        type: 'error',
        text: 'Error parsing Excel file. Please ensure sheet names (Profile, Projects, Skills, Experience, Stats) are preserved.'
      });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#0f0f14] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden z-10"
          >
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-lime-400/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-lime-400/10 border border-lime-400/20 text-lime-400">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    Excel Content Hub
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-lime-400/10 text-lime-400 border border-lime-400/20">
                      Live Synced
                    </span>
                  </h3>
                  <p className="text-xs text-white/50">
                    Update portfolio data, skills, projects, and experiences via Excel spreadsheet
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  soundFX.playClick();
                  onClose();
                }}
                className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {statusMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={'mt-4 p-3.5 rounded-xl border flex items-start gap-3 text-sm ' + (
                  statusMessage.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                    : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
                )}
              >
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
                )}
                <div className="flex-1">{statusMessage.text}</div>
                <button
                  onClick={() => setStatusMessage(null)}
                  className="text-xs opacity-60 hover:opacity-100"
                >
                  ✕
                </button>
              </motion.div>
            )}

            <div className="flex items-center gap-2 mt-5 p-1 bg-white/5 rounded-xl border border-white/10 text-xs font-medium">
              <button
                onClick={() => { soundFX.playHover(); setActiveTab('upload'); }}
                className={'flex-1 py-2 rounded-lg transition-all ' + (
                  activeTab === 'upload'
                    ? 'bg-lime-400 text-black font-semibold shadow-md'
                    : 'text-white/60 hover:text-white'
                )}
              >
                Upload & Sync (.xlsx)
              </button>
              <button
                onClick={() => { soundFX.playHover(); setActiveTab('sheets'); }}
                className={'flex-1 py-2 rounded-lg transition-all ' + (
                  activeTab === 'sheets'
                    ? 'bg-lime-400 text-black font-semibold shadow-md'
                    : 'text-white/60 hover:text-white'
                )}
              >
                Active Sheet Metrics
              </button>
              <button
                onClick={() => { soundFX.playHover(); setActiveTab('instructions'); }}
                className={'flex-1 py-2 rounded-lg transition-all ' + (
                  activeTab === 'instructions'
                    ? 'bg-lime-400 text-black font-semibold shadow-md'
                    : 'text-white/60 hover:text-white'
                )}
              >
                How It Works
              </button>
            </div>

            <div className="mt-5 min-h-[220px]">
              {activeTab === 'upload' && (
                <div className="space-y-4">
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={'relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ' + (
                      dragActive
                        ? 'border-lime-400 bg-lime-400/10'
                        : 'border-white/15 bg-white/[0.02] hover:border-lime-400/40 hover:bg-white/[0.04]'
                    )}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400">
                        <Upload className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Drag & drop your updated <span className="text-lime-400">.xlsx</span> file here
                        </p>
                        <p className="text-xs text-white/50 mt-1">
                          or click to browse your computer
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-semibold transition-all"
                    >
                      <Download className="w-4 h-4 text-lime-400" />
                      Download Excel Template
                    </button>

                    {isCustomData && (
                      <button
                        onClick={() => {
                          soundFX.playClick();
                          onResetData();
                          setStatusMessage({
                            type: 'success',
                            text: 'Reset to default template dataset.'
                          });
                        }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-300 text-xs font-semibold transition-all"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Reset to Default
                      </button>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'sheets' && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs text-white/50">Profile Name</div>
                    <div className="text-sm font-semibold text-white mt-1 truncate">{data.profile.name}</div>
                    <div className="text-[10px] text-lime-400 font-mono mt-1">{data.profile.location}</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs text-white/50">Total Projects</div>
                    <div className="text-sm font-semibold text-white mt-1">{data.projects.length} Projects</div>
                    <div className="text-[10px] text-cyan-400 font-mono mt-1">Sheet: Projects</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs text-white/50">Total Skills</div>
                    <div className="text-sm font-semibold text-white mt-1">{data.skills.length} Skills</div>
                    <div className="text-[10px] text-purple-400 font-mono mt-1">Sheet: Skills</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs text-white/50">Experiences</div>
                    <div className="text-sm font-semibold text-white mt-1">{data.experiences.length} Milestones</div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-1">Sheet: Experience</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 col-span-2">
                    <div className="text-xs text-white/50">Contact Email</div>
                    <div className="text-sm font-semibold text-white mt-1 truncate">{data.profile.email}</div>
                    <div className="text-[10px] text-white/40 font-mono mt-1">Status: {data.profile.status}</div>
                  </div>
                </div>
              )}

              {activeTab === 'instructions' && (
                <div className="space-y-3 text-xs text-white/70 max-h-[220px] overflow-y-auto pr-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="font-bold text-white">1. Download Template:</span> Click the "Download Excel Template" button to get your pre-formatted spreadsheet.
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="font-bold text-white">2. Edit & Add Skills:</span> Open in Excel or Google Sheets. Add new rows under the <code>Skills</code>, <code>Projects</code>, or <code>Experience</code> sheets anytime.
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="font-bold text-white">3. Instant Sync:</span> Drop the updated <code>.xlsx</code> file back into this modal or place it into the project's <code>public/portfolio-data.xlsx</code> path.
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
