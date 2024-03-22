import { MainContainer } from "@components/index";
import { Link } from "react-router-dom";
import { menuDate } from "@utils/index";
import { styled, css } from "styled-components";

const MenuCircle = styled(Link)<{ $disable: boolean }>`
  display: inline-flex;
  flex-direction: column;
  background-color: ${props => props.$disable ? "#ccc" : "#fff"};
  color:#000;
  border-radius: 100%;
  aspect-ratio: 1/1;
  width: calc(50% - 30px);
  margin: 10px 30px;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
  user-select: none;
  cursor: ${props => props.$disable ? "default" : "pointer"};
  max-width: 270px;
  &:hover {
    width: ${props => props.$disable ? "calc(50% - 30px)" : "calc(50% - 10px)"};
    max-width: 310px;
  }
  @media (max-width: 660px) {
    width: calc(100% - 30px);
    margin: 10px;
    &:hover{
      width:  ${props => props.$disable ? "calc(100% - 30px)" : "calc(100% - 20px)"};
    }
  }
`;

function Menu({ href, icon, iconType = "", text, date,disabled }: { href: string, icon: string, iconType?: string, text: string, date: string, disabled: boolean }) {
  return (
    <MenuCircle to={disabled ? "/" : href} $disable={disabled}>
      <span className={"material-icons" + iconType} style={{ fontSize: "40px" }}>
        {icon}
      </span>
      <div style={{fontSize:"1.5rem"}}>{text}</div>
      <div style={{fontWeight:"300"}}>{date}</div>
    </MenuCircle>
  )
}

export default function Main() {

  return (
    <MainContainer $background="#da2127" style={{position:"relative"}} $flexdirection="row">
      <article style={{ width: "100%", maxWidth: "1200px", textAlign:"center",margin:"auto"}}>
        <Menu href="/kakao/agree" icon="mouse" iconType="-outlined" text="사물함 1차 신청" date={menuDate[0].date} disabled={menuDate[0].isDisabled} />
        <Menu href="/" icon="groups" text="사물함 추가 신청" date={menuDate[1].date} disabled={menuDate[1].isDisabled} />
        <Menu href="/kakao/result" icon="check_circle" text="사물함 신청 결과" date={menuDate[2].date} disabled={menuDate[2].isDisabled} />
      </article>
    </MainContainer>
  )
}
