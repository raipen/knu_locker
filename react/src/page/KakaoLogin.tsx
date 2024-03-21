import { useParams } from "react-router-dom";
import kakaologin from "../assets/kakaologin.png";
import { MainContainer } from "@components/index";

export default function KakaoLogin() {
  const { next } = useParams<{ next: string }>();
  const redirect_uri = window.location.origin + "/api/v2/oauth";
  return (
    <MainContainer>
      <div style={{textAlign:"center",margin:"30px"}}>사물함을 신청하려면 카카오 로그인을 해주세요.</div>
      <a
        style={{display: "block", margin: "0 auto"}}
        href={`https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&redirect_uri=${redirect_uri}&response_type=code&state=${next}`}>
          <img src={kakaologin} alt="카카오 로그인" width="200"/>
      </a>
    </MainContainer>
  );
}
