import { useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import PersonDetails from './Person/PersonDetails';
import ColorSelector from './ColorSelector/ColorSelector';

function Path() {
  const [person, setPerson] = useState([]);
  const [colorChangeElement, setColorChangeElemen] = useState(true);
  const [colorChangeId, setColorChangeId] = useState('light');

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() =>{
    delay(1000).then(() => {
      if(colorChangeElement){
        setColorChangeId('light')
      } else {
        setColorChangeId('dark')
      }
    });
  }, [colorChangeElement])
  
  return (
    <div className="Path" id={colorChangeId}>
      <div className='container'>
        <ColorSelector 
          colorChangeElement={colorChangeElement} 
          setColorChangeElemen={setColorChangeElemen}/>
        <BrowserRouter 
        // basename="/characters"
        >
          <Routes>
            <Route path="/" index={true} element={<App person={person} setPerson={setPerson} />} />
            {person.map((e) => {
              return <Route key={e.id} 
              path={`${e.name.split(' ').join('_').toLowerCase()}`}
                element={<PersonDetails element={e} />} />
            })}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default Path;
