
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type Label = 'REAL' | 'MISINFORMATION';

export interface AnalysisResult {
  combined_text: string;
  misinformation_label: Label;
  harmfulness_score: number;
  risk_level: RiskLevel;
  input_sources: string[];
  breakdown: {
    hate_speech: number;
    violence: number;
    medical: number;
    political: number;
  };
  explanation: string;
}

export interface LogEntry {
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface PythonModule {
  name: string;
  code: string;
  description: string;
}
