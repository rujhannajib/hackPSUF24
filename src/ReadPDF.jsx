import { useState, useContext } from 'react'
import { HfInference } from "@huggingface/inference";
import pdfToText from 'react-pdftotext'
import './App.css'
import { Link, useNavigate } from 'react-router-dom';
import { LevelContext } from './LevelContext.jsx';
import Header from './Header.jsx';

function ReadPDF() {
  const [resumeVal, setResumeVal] = useState('');
  const [pathway, setPathway] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [shownResult, setShownResult] = useState(false)
  const { username, setUsername } = useContext(LevelContext);
  let navigate = useNavigate()
  

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
    const inference = new HfInference(""); // Put huuging face token here
    // const inference = new HfInference(process.env.HF_KEY);

    try {
      const response = inference.chatCompletionStream({
        model: "mistralai/Mistral-Nemo-Instruct-2407",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: `Be specific to their education interest. helps students identify steps to achieve their career goals based on educational backgrounds: ${resumeVal}. give a list of JSON object contains two field: index, title, description and link if possible. No need for intro or other special characters. it is very important that you only provide the final output without any additional comments or remarks` },
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
      console.error("Error fetching: ", error);
    }
    
  }

  // const handleGeneratePathway = async () => {
  //   setIsLoading(isLoading => !isLoading)
  //   const res = await generatePathway();
  //   setIsLoading(isLoading => !isLoading)
  //   const obj = JSON.parse(res);
  //   console.log(obj)
  //   setPathway(pathway => obj);
  //   setShownResult(shownResult => !shownResult)
  // };

  const handleGeneratePathway = async () => {
    setIsLoading(isLoading => !isLoading)
    const res = await generatePathway();
    setIsLoading(isLoading => !isLoading)
    const obj = JSON.parse(res);
    obj.forEach(element => {
      element["status"] = 0
    });
    setPathway(pathway => obj);
    setShownResult(shownResult => !shownResult)
    setResumeVal(resumeVal => [])
  };

  const savePathway = () => {
    if (username == ""){
      alert("Please enter your username first")
      return
    }
    let data = {
      name:username,
      completion:0,
      tasks:pathway
    }
    let data_in_string = JSON.stringify(data)
    localStorage.setItem(username, data_in_string)
    alert('Data saved to localStorage!');
    navigate("/trackprogress");
  }

  return (
    <>
    <Header />
      <div className='container'>
      <input type="file" accept="application/pdf" onChange={extractText}/>
      <button onClick={handleGeneratePathway}>Generate </button>
      
          {
            isLoading ? (<p>Loading</p>) :  (
        
              <div>
                {
                    pathway.map((item) => (
                      
                      <div className='pathway-box' key={item.index}>
                        <p>{item.title}</p>
                        <p>{item.description}</p>
                        <a href={item.link}>{item.link && item.link}</a>
                      </div>
                      
                    ))
                  }
                  {shownResult && <button onClick={savePathway}>Track your progress</button>}
                </div>
                
            )
          }
        <Link to="/">Back to homepage</Link>
      </div>
    </>
  )
}

export default ReadPDF
