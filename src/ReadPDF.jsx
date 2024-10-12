import { useState } from 'react'
import { HfInference } from "@huggingface/inference";
import pdfToText from 'react-pdftotext'
import './App.css'
import { Link } from 'react-router-dom';

function ReadPDF() {
  const [resumeVal, setResumeVal] = useState('');
  const [pathway, setPathway] = useState('')
  const [showPathway, setShowPathway] = useState(false)
  const hf_key = import.meta.env.HF_KEY

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function extractText(event) {
    const file = event.target.files[0]
    pdfToText(file)
        .then(text => setResumeVal(resumeVal => text))
        .catch(error => console.error("Failed to extract text from pdf"))
}

const generatePathway = async () => {
    const inference = new HfInference("");
    // const inference = new HfInference(process.env.HF_KEY);

    try {
      const response = inference.chatCompletionStream({
        model: "mistralai/Mistral-Nemo-Instruct-2407",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: `Be specific to their education interest. helps students identify steps to achieve their career goals based on educational backgrounds: ${resumeVal}. give a list of JSON object contains two field: title and description. No need for intro or other special characters. it is very important that you only provide the final output without any additional comments or remarks` },
            ],
          },
        ],
        max_tokens: 1000,
      });
  
      let caption = "";
      for await (const chunk of response) {
        caption += chunk.choices[0]?.delta?.content || "";
      }
  
      return caption;
    } catch (error) {
      console.error("Error fetching advertising caption: ", error);
    }
    
  }

  const handleGeneratePathway = async () => {
    const res = await generatePathway();
    setPathway(res);
    setShowPathway(showPathway => true);
  };

  return (
    <>
      <div className='container'>
      <input type="file" accept="application/pdf" onChange={extractText}/>
      <button onClick={handleGeneratePathway}>Generate </button>
      
          {
            showPathway && (
              <div>
                <p>{pathway}</p>
                </div>
            )
          }
        <Link to="/">Back to homepage</Link>
      </div>
    </>
  )
}

export default ReadPDF
