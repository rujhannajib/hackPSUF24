import React,{useEffect, useContext, useState} from 'react'
import { LevelContext } from './LevelContext.jsx';
import { useNavigate } from 'react-router-dom';
import Header from './Header.jsx';

function TrackProgress() {

    const { username, setUsername } = useContext(LevelContext);
    const [data,setData] = useState({})
    const [showPathway, setShowPathway] = useState(false)
    let navigate = useNavigate();

    // Function to load data from localStorage
  const loadFromLocalStorage = () => {
    console.log(`username ${username}`)
    const savedData = localStorage.getItem(username);
    if (savedData) {
      setData(data => JSON.parse(savedData));
      setShowPathway(showPathway => !showPathway)
    //   console.log(data)
    }
    
  };

  const handleCompleted = (num) => {
    setData(data => ({
        ...data,
        completion: data.completion + 1,
        tasks:data.tasks.map(
            task => task.index == num ? {...task, status:1} : task
        )
    }))
    console.log(`Task completed: ${num}`)
    console.log(data)
  }

  const savePathway = () => {
    let data_in_string = JSON.stringify(data)
    localStorage.setItem(username, data_in_string)
    alert('Data saved to localStorage!');
    navigate("/");
  }

  return (
    <>
    <Header username={username}/>
    <div>TrackProgress</div>
    <button onClick={loadFromLocalStorage}>See my progress</button>
    {showPathway && (
        <>
        <p>Progress: {Math.round((data.completion / data.tasks.length)*100)}%</p>
         {
            data.tasks.map((item) => (
              
              <div className='pathway-box' key={item.index}>
                <p>{item.title}</p>
                <p>{item.description}</p>
                <a href={item.link}>{item.link && item.link}</a>
                {item.status == 0 ? ( <button onClick={() => handleCompleted(item.index)}>Done</button>) : (<button>Completed</button>)}
              </div>
              
            ))
          }
          <button onClick={savePathway} className='button'>Save your progress</button>
          </>
    )}
    </>
  )
}

export default TrackProgress