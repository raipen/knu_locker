import './App.css';
import { BrowserRouter,Routes, Route } from "react-router-dom";
import MainHeader from './component/MainHeader';
import Header from './component/Header';
import Main from './page/Main';
import Apply from './page/Apply';
import Result from './page/Result';
import MainFooter from './component/MainFooter';
import Footer from './component/Footer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainHeader/>}/>
        <Route path="/*" element={<Header/>}/>
      </Routes>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/apply" element={<Apply/>}/>
        <Route path="/result" element={<Result/>}/>
      </Routes>
      <Routes>
        <Route path="/" element={<MainFooter/>}/>
        <Route path="/*" element={<Footer/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
