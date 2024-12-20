import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import AddContact from './components/AddContact/AddContact';
import ContactDetails from './components/ContactDetail/ContactDetails';
import { AnimatePresence } from 'framer-motion';
import Transitions from './components/Transition/Transition'; // Import your Transitions component
import Experience from './components/Experience/Experience';
import ThreePointVis from './components/ThreePointVis/ThreePointVis/ThreePointVis';
import './components/ThreePointVis/ThreePointVis/ThreePointVis.css';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import ThemeSelector from './components/ThemeSelector/ThemeSelector';
import './App.css';
//import{ contacts }from './data/contact-detail'; to fetch the data locally saved in the .ts file

const data = new Array(390).fill(0).map((d, id) => ({ id }));

const App: React.FC = () => {
  return (
    <Router basename='/frontDesk'>
      <AnimatedRoutes />
    </Router>
  );
};

const AnimatedRoutes: React.FC = () => {
  
  const location = useLocation();

  return (
      <AnimatePresence>
        <Navbar/>
        <Routes location={location} key={location.pathname}>
          <Route path="/home" element={<Transitions> <Home /> </Transitions> }/>
          <Route path="/add-contact" element={ <Transitions> <AddContact /> </Transitions> } />
          <Route path="/contact/:name" element={ <Transitions> <ContactDetails /> </Transitions>} />
          {/*handling the case where no contact name is provided */}
          <Route path="/contact/" element={ <Transitions> <ContactDetails /> </Transitions> } />

          <Route path="/cool-stuff/" element={ 
            <div className='main-threePointVis-container'>
            <div className='threePointVis-container'> 
            <Experience/> 
            </div>
            </div>  
            } />
          <Route path="/cool-stuff-1/" element={ 
            <div className='main-threePointVis-container'>
            <div className='threePointVis-container'> 
            <ThreePointVis data = {data}/> 
            </div>
            </div>  
            } />

          <Route path="/" element={ <Transitions><Login /></Transitions> } />
          <Route path="/signup" element={ <Transitions><SignUp /></Transitions> } />  
          <Route path="/theme" element={ <Transitions> <ThemeSelector /> </Transitions> } />  

        </Routes>
      </AnimatePresence>
  );
};

export default App;