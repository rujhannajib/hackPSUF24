import React, {useEffect, useState} from 'react'
import { HfInference } from "@huggingface/inference";
import './App.css'
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { LevelContext } from './LevelContext.jsx';
import { useNavigate } from "react-router-dom";
import Header from './Header.jsx';
import Loading from './Loading.jsx';

function InterestPrompt() {
    const [values, setValues] = useState([]);
    const [pathway, setPathway] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const { username, setUsername } = useContext(LevelContext);
    const [isActive, setIsActive] = useState([])
    const [shownResult, setShownResult] = useState(false)
    const navigate = useNavigate();
  
    const generatePathway = async () => {
      const inference = new HfInference("");
  
      try {
        const combined_strings = values.join(" ")
        const response = inference.chatCompletionStream({
          model: "mistralai/Mistral-Nemo-Instruct-2407",
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: `Be specific to their education interest. helps students identify steps to achieve their career goals based on educational backgrounds: ${combined_strings}. give a list of JSON object contains two field: index, title, description and link if possible. No need for intro or other special characters. it is very important that you only provide the final output without any additional comments or remarks` },
              ],
            },
          ],
          max_tokens: 1000,
        });
    
        let caption = "";
        for await (const chunk of response) {
          caption += chunk.choices[0]?.delta?.content || "";
        }
        console.log(caption)
        return caption;
      } catch (error) {
        console.error("Error fetching: ", error);
      }
      
    }
  
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
      setValues(values => [])
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

    const handleBubbleClick = (item, num) => {
      // if item already active
      if (values.includes(item)){
        setValues(values => values.filter( value => value !== item))
        setIsActive(isActive => isActive.filter(item => item !== num))
      }
      else{
        setValues(values => [...values, item])
        setIsActive(isActive => [...isActive, num])
      }
    }

    useEffect(()=> {
      console.log(values)
    },[values])
  
    return (
      <>
        <Header username={username}/>
        <div className='container'>
            <h1>Hello {username}. Click the button that fits you the best.</h1>
            {/* <textarea value={value} onChange={handleChange} /> */}
            {/* <button onClick={handleGeneratePathway}>Generate </button> */}
            
              <div className='big-bubble-container'>
                <h2 className="bubble-title">Education Level</h2>
                <div className='bubble-container'> 
                  {/* // Education Level */}
                  <div className={`bubble-circle ${isActive.includes(0) && "selected"}`} onClick={() => handleBubbleClick("Education Level: High School Student", 0)}>
                      High School Student
                  </div>
                  <div className={`bubble-circle ${isActive.includes(1) && "selected"}`} onClick={() => handleBubbleClick("Education Level: Undergraduate Student", 1)}>
                      Undergraduate Student
                  </div>
                  <div className={`bubble-circle ${isActive.includes(2) && "selected"}`} onClick={() => handleBubbleClick("Education Level: Postgraduate Student", 2)}>
                      Postgraduate Student
                  </div>
                </div>
                <h2 className="bubble-title">Interested Field</h2>
                <div className='bubble-container'> 
                  {/* Interested field */}
                  <div className={`bubble-circle ${isActive.includes(3) && "selected"}`} onClick={() => handleBubbleClick("Interested Field: Engineering", 3)}>
                      Engineering
                  </div>
                  <div className={`bubble-circle ${isActive.includes(4) && "selected"}`} onClick={() => handleBubbleClick("Interested Field: Health", 4)}>
                      Health
                  </div>
                  <div className={`bubble-circle ${isActive.includes(5) && "selected"}`} onClick={() => handleBubbleClick("Interested Field: Computer Science", 5)}>
                      Computer Science
                  </div>
                  <div className={`bubble-circle ${isActive.includes(6) && "selected"}`} onClick={() => handleBubbleClick("Interested Field: Business Finance", 6)}>
                      Business / Finance
                  </div>
                  <div className={`bubble-circle ${isActive.includes(7) && "selected"}`} onClick={() => handleBubbleClick("Interested Field: Creative Arts", 7)}>
                      Creative Arts
                  </div>
                  <div className={`bubble-circle ${isActive.includes(8) && "selected"}`} onClick={() => handleBubbleClick("Interested Field: Education", 8)}>
                      Education
                  </div>
                  <div className={`bubble-circle ${isActive.includes(9) && "selected"}`} onClick={() => handleBubbleClick("Interested Field: Psychology", 9)}>
                      Psychology
                  </div>
                </div>
                <h2 className="bubble-title">Skills</h2>
                <div className='bubble-container'>  
                  {/* Skills */}
                  
                  <div className={`bubble-circle ${isActive.includes(10) && "selected"}`} onClick={() => handleBubbleClick("Skills: Programming", 10)}>
                      Programming
                  </div>
                  <div className={`bubble-circle ${isActive.includes(11) && "selected"}`} onClick={() => handleBubbleClick("Skills: Cloud Platform", 11)}>
                      Cloud Platform
                  </div>
                  <div className={`bubble-circle ${isActive.includes(12) && "selected"}`} onClick={() => handleBubbleClick("Skills: Data Science / Machine Learning", 12)}>
                      Data Science / Machine Learning
                  </div>
                  <div className={`bubble-circle ${isActive.includes(13) && "selected"}`} onClick={() => handleBubbleClick("Skills: Cybersecurity", 13)}>
                      Cybersecurity
                  </div>
                  <div className={`bubble-circle ${isActive.includes(14) && "selected"}`} onClick={() => handleBubbleClick("Skills: Project Management", 14)}>
                      Project Management
                  </div>
                  <div className={`bubble-circle ${isActive.includes(15) && "selected"}`} onClick={() => handleBubbleClick("Skills: Digital Marketing", 15)}>
                      Digital Marketing
                  </div>
                  <div className={`bubble-circle ${isActive.includes(16) && "selected"}`} onClick={() => handleBubbleClick("Skills: Communications / Leadership", 16)}>
                      Communications / Leadership
                  </div>
                  <div className={`bubble-circle ${isActive.includes(17) && "selected"}`} onClick={() => handleBubbleClick("Skills: Circuit Design / Simulations", 17)}>
                      Circuit Design / Simulations
                  </div>
                  <div className={`bubble-circle ${isActive.includes(18) && "selected"}`} onClick={() => handleBubbleClick("Skills: CAD / 3D Modelling Tools", 18)}>
                      CAD / 3D Modelling Tools
                  </div>
                  <div className={`bubble-circle ${isActive.includes(19) && "selected"}`} onClick={() => handleBubbleClick("Skills: System Automation", 19)}>
                      System Automation
                  </div>
                  
                </div>
                <button onClick={handleGeneratePathway}>Generate </button>
              </div>
              {
              isLoading ? (<Loading />) : (
                <div>
                  {
                    pathway.map((item) => (
                      <>
                      <div className='pathway-box' key={item.index}>
                        <p>{item.title}</p>
                        <p>{item.description}</p>
                        <a href={item.link}>{item.link && item.link}</a>
                      </div>
                      </>
                    ))
                  }
                  {shownResult && <button onClick={savePathway}>Track your progress</button>}
                  </div>
              )
            }
        </div>
      </>
    )
}

export default InterestPrompt