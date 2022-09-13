import { Link } from "react-router-dom";

export default function Header({cName}) {
  if(cName==="main"){
    document.body.className = "main";
  }else{
    document.body.className = "";
  }
  return (
    <header className={cName}>
        <Link to="/">
            <img src="/logo.png"/>
            <span className="logo">KNU CSE</span>
        </Link>
    </header>
  );
}