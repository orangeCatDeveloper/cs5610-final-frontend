import logo from './logo.svg';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import {Routes, Route} from "react-router";
import News from './news';

function App() {
  return (
    <BrowserRouter>
        <div className='container'>
        <Routes>
          <Route path='/*' element={<News/>}></Route>
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
