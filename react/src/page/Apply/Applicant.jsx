import { useRef, useState } from "react";
import Input from "../../component/Input";
import InputPhone from "../../component/InputPhone";
import SendButton from "../../component/SendButton";
import axios from 'axios';

export default function ({setStep,setVerifyToken}) {
    const inputData = [
        { id: "name", label: "이름", placeholder: "호반우" },
        { id: "studentId", label: "학번", placeholder: "2022123456" },
    ];
    const phoneInputData = { id: "phone", label: "전화번호", placeholder: "'-'없이 숫자만 입력" };

    const submitRef = useRef(null);
    let phoneVerified = true;
    //이름, 학번 정규식으로 체크하고, 전화번호 인증 했는지 확인하고 버튼 enable하기
    const handleInputChange = (e) => {
        const name = document.getElementById("name").value;
        const studentId = document.getElementById("studentId").value;
        const nameRegex = /^[가-힣| ]+$/;
        const studentIdRegex = /^[0-9]{10}$/;
        const sendButton = submitRef.current;
        if (nameRegex.test(name) && studentIdRegex.test(studentId) && phoneVerified) {
            sendButton.disabled = false;
        } else {
            sendButton.disabled = true;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStep(2);
    }
    return (<form onSubmit={handleSubmit}>
        {inputData.map((info,i) => <Input info={info} key={i+1} event={handleInputChange}/>)}
        <InputPhone info={phoneInputData} event={handleInputChange}/>
        <SendButton reff={submitRef} disabled={true} text="다음"/>
    </form>);
}