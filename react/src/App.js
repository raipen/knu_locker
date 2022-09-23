import './App.css';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import Header from './component/Header';
import Main from './page/Main';
import Apply from './page/Apply';
import Result from './page/Result';
import ResultSMS from './page/Result/ResultSMS';
import NoResult from './page/Result/NoResult';
import Footer from './component/Footer';
import EmptyPage from './page/EmptyPage';
import Agree from './page/Agree';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header cName="main"/>}/>
        <Route path="/*" element={<Header/>}/>
      </Routes>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/agree" element={<Agree/>}/>
        <Route path="/apply" element={<Apply/>}/>
        <Route path="/result" element={<Result/>}/>
        <Route path="/result/:phone" element={<ResultSMS/>}/>
        <Route path="/noResult" element={<NoResult/>}/>
        <Route path="/*" element={<EmptyPage/>}/>
      </Routes>
      <Routes>
        <Route path="/" element={<Footer color="#da2127"/>}/>
        <Route path="/*" element={<Footer/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
