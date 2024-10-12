import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import ReadPDF from './readPDF.jsx';
// require('dotenv').config();

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    {/* <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} /> */}
    <Route path="/" element={<App />} />
    <Route path="/readpdf" element={<ReadPDF />} />
  </Routes>
</BrowserRouter>
  // <StrictMode>
  //   <App />
  // </StrictMode>,
)
