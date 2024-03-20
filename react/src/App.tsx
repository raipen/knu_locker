import { BrowserRouter,Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Main from './page/Main';
import Apply from './page/Apply';
import Result from './page/Result';
import ResultSMS from './page/Result/ResultSMS';
import NoResult from './page/Result/NoResult';
import Footer from './components/Footer';
import EmptyPage from './page/EmptyPage';
import Agree from './page/Agree';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/agree" element={<Agree/>}/>
        <Route path="/apply" element={<Apply/>}/>
        <Route path="/*" element={<EmptyPage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
