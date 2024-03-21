import { MainContainer } from "@components/index";
import { Link } from "react-router-dom";
import { menuDate } from "@utils/index";
import { styled, css } from "styled-components";

const Asdf = styled(Link)<{ $disable: boolean }>`
  display: inline-flex;
  flex-direction: column;
  background-color: ${props => props.$disable ? "#ccc" : "#fff"};
  color:#000;
  border-radius: 100%;
  aspect-ratio: 1/1;
  width: calc(50% - 30px);
  margin: 10px;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
  user-select: none;
  cursor: ${props => props.$disable ? "default" : "pointer"};
  &:hover {
    width: ${props => props.$disable ? "calc(50% - 30px)" : "calc(50% - 10px)"};
  }
  @media (max-width: 900px) {
    width: calc(100% - 20px);
    margin: 10px;
  }
`;

const LeftImage = styled.div`
  width: calc(100% - 620px);
  color: #fff;
  font-size: calc(100vh - 190px);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  user-select: none;
  @media (max-width: 900px) {
    display: none;
  }
`

function Menu({ href, icon, iconType = "", text, date,disabled }: { href: string, icon: string, iconType?: string, text: string, date: string, disabled: boolean }) {
  return (
    <Asdf to={disabled ? "/" : href} $disable={disabled}>
      <div>
        <span className={"material-icons" + iconType}>
          {icon}
        </span>
      </div>
      <div>{text}</div>
      <div>{date}</div>
      <span className="material-icons-outlined">
        arrow_forward_ios
      </span>
    </Asdf>
  )
}

export default function Main() {

  return (
    <MainContainer $background="#da2127" style={{position:"relative"}} $flexdirection="row">
      <LeftImage className="material-icons-outlined">
        laptop_mac
      </LeftImage>
      <article style={{ width: "100%", maxWidth: "600px", textAlign:"center",margin:"auto"}}>
        <Menu href="/kakao/agree" icon="mouse" iconType="-outlined" text="사물함 1차 신청" date={menuDate[0].date} disabled={menuDate[0].isDisabled} />
        <Menu href="/" icon="groups" text="사물함 추가 신청" date={menuDate[1].date} disabled={menuDate[1].isDisabled} />
        <Menu href="/kakao/result" icon="check_circle" text="사물함 신청 결과" date={menuDate[2].date} disabled={menuDate[2].isDisabled} />
      </article>
    </MainContainer>
  )
}
