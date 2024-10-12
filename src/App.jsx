import { useState } from 'react'
import { HfInference } from "@huggingface/inference";
import './App.css'
import { Link } from "react-router-dom";
// require()

function App() {
  const [value, setValue] = useState('Im a cs student. Interested in finance');
  const [pathway, setPathway] = useState('')
  const [showPathway, setShowPathway] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const hf_key = import.meta.env.HF_KEY

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const generatePathway = async () => {
    const inference = new HfInference("");

    try {
      const response = inference.chatCompletionStream({
        model: "mistralai/Mistral-Nemo-Instruct-2407",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: `Be specific to their education interest. helps students identify steps to achieve their career goals based on educational backgrounds: ${value}. give a list of JSON object contains two field: title, description and link if possible. No need for intro or other special characters. it is very important that you only provide the final output without any additional comments or remarks` },
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
    setIsLoading(isLoading => !isLoading)
    const res = await generatePathway();
    setIsLoading(isLoading => !isLoading)
    const obj = JSON.parse(res);
    console.log(obj)
    setPathway(res);
    setShowPathway(showPathway => true);
  };


  return (
    <>
      <div className='container'>
          <h1>Career App</h1>
          <textarea value={value} onChange={handleChange} />
          <button onClick={handleGeneratePathway}>Generate </button>
          <Link to="/readpdf">Upload Resume instead </Link>
          {
            !isLoading && (
              <div>
                <p>{pathway}</p>
                </div>
            )
          }
      </div>
    </>
  )
}

export default App
