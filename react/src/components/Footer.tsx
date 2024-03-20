import { styled } from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80px;
`;

export default function () {
  return (
    <FooterContainer>
      <div>
        © 2024. <a href="https://github.com/raipen" target="_blank" style={{ color: "#8e8bf9", fontWeight: "600" }}>Raipen </a> all rights reserved.
        <br />
        <i>
          <a href="https://www.instagram.com/ji1_bahk/" rel="nofollow">@ji1_bahk</a>,
          <a href="https://www.instagram.com/wlssyuu/" rel="nofollow"> designed by @wlssyuu</a>
        </i>
      </div>
    </FooterContainer>
  );
}
