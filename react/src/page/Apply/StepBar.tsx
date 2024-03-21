import { useContext, useState } from "react";
import ApplyContext from "@context/ApplyContext";
import {styled} from "styled-components";

const StepBarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 10px;
    max-width: 600px;
    margin: 0 auto;
`;

const StepContainer = styled.div<{$done:boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${({$done})=>$done?"var(--main-color)": "var(--muted-text-color)"};
    flex-shrink: 0;
    width: fit-content;
    gap: 5px;
`;

const Circle = styled.div<{$done:boolean}>`
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 2px solid ${({$done})=>$done?"var(--main-color)": "var(--muted-text-color)"};
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LineContainer = styled.div`
    flex: 1;
    height: 5px;
    background-color: #ccc;
    border-radius: 5px;
    margin-bottom: 1rem;
`;
const Line = styled.div<{$done:boolean}>`
    height: 100%;
    width: ${({$done})=>$done?"100%": "0%"};
    transition: width 1s ease-in-out;
    background-color: var(--main-color);
    border-radius: 5px;
`;

const Step = ({count,label,done}:{count:number,label:string,done:boolean})=>{
    return (
        <StepContainer $done={done}>
            <Circle $done={done}>
                {count}
            </Circle>
            <div>
                {label}
            </div>
        </StepContainer>
    );
}

export default function (){
    const {step} = useContext(ApplyContext);
    return (
        <StepBarContainer>
            <Step count={1} label="신청자 정보" done={step>=0}/>
            <LineContainer>
                <Line $done={step>=1}/>
            </LineContainer>
            <Step count={2} label="사물함 선택" done={step>=1}/>
            <LineContainer>
                <Line $done={step>=2}/>
            </LineContainer>
            <Step count={3} label="신청 완료" done={step>=2}/>
        </StepBarContainer>
    );
}
