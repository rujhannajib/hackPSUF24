'use client'
import { useState, useContext } from 'react'
import { HfInference } from "@huggingface/inference";
import './App.css'
import { Link, useNavigate } from "react-router-dom";
import { LevelContext } from './LevelContext.jsx';
import Header from './Header.jsx';



// require()

function App() {
  // const [value, setValue] = useState('Username please');
  const { username, setUsername } = useContext(LevelContext);
  let navigate = useNavigate()
  const handleChange = (e) =>{
    setUsername(e.target.value)
  }
  const navigate_to_pages = (extension) => {
    if (username == ""){
      alert("Please enter your username")
      return
    }
    navigate(extension)
  }
  return (
    <>
    <Header username={username}/>
    <div className='container'>
    <h1 className='text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>DISCOVER YOUR CAREER PATH</h1>
    <div className="about-section bg-white text-black p-6">
    <p className="mb-2">Enter your username and choose "Track Your Progress" button to load your previous history</p>
  <p className="text-center mb-2">or</p>
  <p>Enter your username and choose "Fill in Your Credentials" or "Upload Your Resume" button to start your career match journey.</p>
  </div>
    <input className="input-style"onChange={handleChange} value={username} placeholder='Please input your username'/>
    {/* <Link type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" to="/interestprompt">Fill in Your Credentials</Link> */}
    <button type="button" className="" onClick={() => navigate_to_pages("/interestprompt")}>Fill in Your Credentials</button>
    <button to="/readpdf" onClick={() => navigate_to_pages("/readpdf")} >Upload Your Resume</button>
    <button to="/trackprogress" onClick={() => navigate_to_pages("/trackprogress")}>Track Your Progress</button>
    <p>Your progress is saved under your username for your future references, ensuring you can return and explore your results anytime.</p>
    </div>
    <div className="about-section bg-white text-black p-6">
  <h1 className="text-2xl font-bold mb-4">Everything about us</h1>
  <p className="mb-4">You're more likely to find happiness and success in your work when your job aligns with your area of interest. Take this simple quiz and get matched with careers tailored to your unique preferences.</p>
  
</div>
<div className="built-with-section bg-white text-black p-8">
  <h2 className="text-xl font-bold mb-6 text-center">Built With</h2>
  <div className="flex justify-center space-x-8">
    <div className="p-4  hover:bg-gray-100 flex justify-center items-center">
      <img src="https://img.icons8.com/?size=100&id=123603&format=png&color=000000" alt="React" className="h-12" />
    </div>
    <div className="p-4  hover:bg-gray-100 flex justify-center items-center">
      <img src="https://img.icons8.com/?size=100&id=x7XMNGh2vdqA&format=png&color=000000" alt="Tailwind CSS" className="h-12" />
    </div>
    <div className="p-4  hover:bg-gray-100 flex justify-center items-center">
      <img src="https://img.icons8.com/?size=100&id=sop9ROXku5bb&format=png&color=000000" alt="Hugging Face" className="h-12" />
    </div>
  </div>
</div>





    </>
  )
}

export default App
