import Menu from "../component/Menu";
import './Main.css';

export default function Main(){
    return (
        <div style={{background:"#da2127"}}>
            <span className="deco material-icons-outlined">
            laptop_mac
            </span>
            <article className="article">
                <Menu href="/apply" icon="mouse" iconType="-outlined" text="사물함 신청" date="9.13 ~ 9.16"/>
                <Menu disable="disable" href="/result" icon="groups" text="동아리 사물함 신청" date="9.17 ~"/>
                <Menu href="/result" icon="check_circle" text="사물함 신청 결과" date="9.17 ~"/>
            </article>
        </div>
    )

}