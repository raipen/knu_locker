import { Link } from "react-router-dom";
import { MainContainer, ButtonContainingIcon } from "@components/index";

export default function Main(){
    return (
        <MainContainer style={{alignItems: "center"}}>
            <h1>개인정보 수집동의</h1>
            <p style={{display: "flex", flexDirection: "column", width: "fit-content", margin: "0 auto"}}>
            <span>경북대학교 컴퓨터학부 사물함 이용 신청을 위해 아래와 같이 개인정보를 수집 및 이용합니다.</span>
                <b>- 개인정보 수집 목적</b>
                <span style={{paddingLeft:"10px"}}>학생식별, 사물함 배정결과 안내, 사물함 관리</span>
                <b>- 개인정보 수집 항목</b>
                <span style={{paddingLeft:"10px"}}>이름, 학번, 전화번호</span>
                <b>- 보유 및 이용 기간</b>
                <span style={{paddingLeft:"10px"}}>이용목적 달성 후 3개월</span>
            <span>귀하는 개인정보 수집에 동의를 거부할 권리가 있으며 동의 거부 시 사물함 신청이 제한됩니다.</span>
            </p>
            <div style={{color:"red"}}>위 개인정보 수집·이용에 동의합니다.</div>
            <Link to="/apply"><ButtonContainingIcon>동의</ButtonContainingIcon></Link>
        </MainContainer>
    )
}
