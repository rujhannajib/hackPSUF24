import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import ReadPDF from './readPDF.jsx';
import InterestPrompt from './InterestPrompt.jsx';
import { LevelContextProvider } from './LevelContext.jsx';
import TrackProgress from './TrackProgress.jsx';



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <LevelContextProvider>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/interestprompt" element={<InterestPrompt />} />
    <Route path="/readpdf" element={<ReadPDF />} />
    <Route path="/trackprogress" element={<TrackProgress />} />
    
  </Routes>
  </LevelContextProvider>
</BrowserRouter>
 
)
