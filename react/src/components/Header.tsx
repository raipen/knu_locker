import { styled } from 'styled-components';
import Logo from '../assets/logo.png';
import Title from '../assets/title.png';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: var(--main-color);
  padding: 20px max(calc(50% - 600px), 20px);
  width: 100%;
  display: flex;
  user-select: none;
  *{
    height: 30px;
  }
  img{
    margin-right: 10px;
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
        <Link to="/">
            <img src={Logo} alt="logo" />
            <img src={Title} alt="title" />
        </Link>
    </HeaderContainer>
  );
}
