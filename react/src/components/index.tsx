import {styled, css, keyframes } from 'styled-components';

const FlexRowCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlexRowSpaceBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FlexRowLeftStart = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const FlexColumnCenter = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlexColumnLeftStart = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FlexColumnStretchCenter = css`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`;

const MainColorBackground = css`
  background-color: var(--main-color);
  color: white;
  border: 1px solid var(--main-color);
  border-radius: 5px;
`;

const ReverseMainColorBackground = css`
  background-color: white;
  color: var(--main-color);
  border: 1px solid var(--main-color);
  border-radius: 5px;
`;

const lightGrayBackground = css`
  background-color: #f0f0f0;
  border: 1px solid #f0f0f0;
  border-radius: 5px;
  color: black;
`;

const GrayBackground = css`
  background-color: #ccc;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: black;
`;

const clickable = css`
  cursor: pointer;
  user-select: none;
  word-break: keep-all;
  transition: all 0.3s;
`;

const ButtonCss = css`
  ${FlexRowCenter};
  ${clickable};
  padding: 10px;
  font-size: 1rem;
  font-weight: 600;
`;

export const ButtonWithHoverAnimation = styled.button`
  ${ButtonCss};
  ${MainColorBackground};
  &:hover {
    ${ReverseMainColorBackground};
  }
`;

export const ReverseButtonWithHoverAnimation = styled.button`
  ${ButtonCss};
  ${ReverseMainColorBackground};
  &:hover {
    ${MainColorBackground};
  }
`;

export const ButtonContainingIcon = styled.button<{ $margin?: string }>`
  ${ButtonCss};
  ${MainColorBackground};
  word-break: keep-all;
  padding: 5px 20px;
  ${props => props.$margin && `margin: ${props.$margin};`}
  gap: 10px;
  >span:first-child {
    font-size: 1rem;
  }
`;

export const ReverseButtonContainingIcon = styled.button<{ $margin?: string }>`
  ${ButtonCss};
  ${ReverseMainColorBackground};
  padding: 5px 20px;
  >span:first-child {
    font-size: 1rem;
  }
`;

export const MainContainer = styled.main<{ $background?: string, $flexdirection?: string }>`
  padding: 20px max(30px, calc(50% - 590px));
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: ${props => props.$flexdirection || 'column'};
  background: ${props => props.$background || 'none'};
  gap: 20px;
  flex-wrap: wrap;
  flex-grow: 1;
`;

export const SubmitButton = styled.button`
  ${ButtonCss};
  ${MainColorBackground};
  width: 100%;
  margin-top: 20px;
  &:disabled {
    background-color: #888;
    border: 1px solid #888;
    color: white;
  }
`;

export const FormContainer = styled.form`
  ${FlexColumnLeftStart};
  gap: 20px;
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
`;

export const SelectItem = styled.div<{ $isSelect?: boolean }>`
  ${FlexRowCenter};
  ${clickable};
  padding: 10px;
  border-radius: 5px;
  ${props => props.$isSelect ? MainColorBackground : lightGrayBackground};
`;

export const SelectTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

export const SelectContainer = styled.div`
  ${FlexRowLeftStart};
  ${clickable};
  gap: 10px;
  width: 100%;
`;

export const StudentCard = styled.div`
  ${FlexColumnCenter};
  gap: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #ccc;
  margin: 0 auto;
  max-width: 350px;
`;

export const StudentCardInner = styled.div`
  ${FlexRowCenter};
  align-items: flex-start;
  gap: 10px;
  width: 100%;
`;

export const CardImage = styled.img`
  width: 50%;
  height: 100%;
  object-fit: cover;
`;

export const CardInfo = styled.div`
  ${FlexColumnLeftStart};
  gap: 5px;
  width: fit-content;
  margin: auto;
`;

export const SelectCard = styled.div`
  margin: 2px 0;
  &>div:last-child {
    font-weight: 300;
  }
`;
