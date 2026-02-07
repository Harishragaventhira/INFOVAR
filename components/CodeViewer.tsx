
import React, { useState } from 'react';
import { PythonModule } from '../types';

const pythonModules: PythonModule[] = [
  {
    name: 'preprocess.py',
    description: 'NLP cleaning, normalization, and stopword removal.',
    code: `import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

nltk.download('punkt')
nltk.download('stopwords')

def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^\\w\\s]', '', text)
    stop_words = set(stopwords.words('english'))
    tokens = word_tokenize(text)
    return ' '.join([w for w in tokens if not w in stop_words])`
  },
  {
    name: 'train_models.py',
    description: 'Training the TF-IDF vectorizer and Scikit-learn classifier.',
    code: `import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
import joblib

def train():
    df = pd.read_csv('data/training_text.csv')
    vectorizer = TfidfVectorizer(max_features=5000)
    X = vectorizer.fit_transform(df['text'])
    y_misinfo = df['is_misinformation']
    y_harm = df['harmfulness_score']
    
    clf_misinfo = RandomForestClassifier().fit(X, y_misinfo)
    clf_harm = RandomForestClassifier().fit(X, y_harm)
    
    joblib.dump(clf_misinfo, 'model/misinformation_model.pkl')
    joblib.dump(clf_harm, 'model/harmfulness_model.pkl')
    joblib.dump(vectorizer, 'model/vectorizer.pkl')`
  },
  {
    name: 'app.py',
    description: 'Flask REST API endpoint for multimodal analysis.',
    code: `from flask import Flask, request, jsonify
from video_utils import process_video
from preprocess import clean_text
import joblib

app = Flask(__name__)
clf = joblib.load('model/misinformation_model.pkl')
vectorizer = joblib.load('model/vectorizer.pkl')

@app.route('/analyze', methods=['POST'])
def analyze():
    video = request.files.get('video')
    text = request.form.get('text', '')
    
    combined_content = text
    if video:
        combined_content += " " + process_video(video)
        
    cleaned = clean_text(combined_content)
    vec = vectorizer.transform([cleaned])
    label = clf.predict(vec)[0]
    
    return jsonify({
        "misinformation_label": "MISINFORMATION" if label else "REAL",
        "combined_text": combined_content,
        "risk_level": "HIGH" # Simplified
    })`
  }
];

const CodeViewer: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex flex-wrap gap-2">
        {pythonModules.map((mod, i) => (
          <button
            key={mod.name}
            onClick={() => setActiveIdx(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border
              ${activeIdx === i 
                ? 'bg-indigo-500 border-indigo-400 text-white shadow-lg' 
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'}`}
          >
            {mod.name}
          </button>
        ))}
      </div>
      <div className="flex-1 bg-slate-900 rounded-xl border border-slate-800 p-4 font-mono text-xs overflow-auto">
        <p className="text-slate-500 mb-4 italic"># {pythonModules[activeIdx].description}</p>
        <pre className="text-indigo-300">
          <code>{pythonModules[activeIdx].code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeViewer;
