import { useRef, useState,useEffect } from "react";
import Input from "../../component/Input";
import InputPhone from "../../component/InputPhone";
import SendButton from "../../component/SendButton";
import axios from 'axios';
import VerifyStep from '../../component/VerifyStep';

export default function ({setStep}) {
    const inputData = [
        {
            id: "name", label: "이름",
            placeholder: "호반우", type: "text",
            reg:/^[가-힣| ]+$/, useButton:false,
        },
        {
            id: "studentId", label: "학번",
            placeholder: "2022123456", type: "number",
            reg:/^[0-9]{10}$/, useButton:false,
        },
        /* {
            id: "phone", label: "전화번호",
            placeholder: "'-'없이 숫자만 입력", type: "number",
            reg: /^010\d{8}$/, useButton:true,
            activate: "인증",
            waiting: true,
        },
        {
            id: "code", label: "인증번호",
            placeholder: "인증번호 6자리", type: "number",
            reg: /^\d{6}$/, useButton:true,
            activate: "확인",
        } */
    ];
    const phoneInputData = {
        id: "phone", label: "전화번호",
        placeholder: "'-'없이 숫자만 입력",
        reg : /^010\d{8}$/,
        activate: "인증",
        waiting: true,
    };
    const codeInputData = {
        id: "code", label: "인증번호",
        placeholder: "인증번호 6자리",
        reg: /^\d{6}$/,
        activate: "확인",
    };

    const [phoneStep,setPhoneStep] = useState(VerifyStep.WAITING_INPUT);
    const [codeStep,setCodeStep] = useState(VerifyStep.NONE);


    if(codeStep===VerifyStep.NONE&&phoneStep===VerifyStep.COMPLETE){
        setCodeStep(VerifyStep.WAITING_INPUT);
    }

    if(codeStep!==VerifyStep.NONE&&phoneStep!==VerifyStep.COMPLETE){
        setCodeStep(VerifyStep.NONE);
    }

    useEffect(()=>{
        const phone = document.getElementById("phone");
        let phone_temp = phone.value;
        phone.value = "";
        phone.focus();
        phone.value = phone_temp;
    },[phoneStep]);

    useEffect(()=>{
        handleInputChange(null);
    },);

    useEffect(()=>{
        document.getElementById("name").focus();
    },[]);

    const submitRef = useRef(null);
    const handleInputChange = (e) => {
        const name = document.getElementById("name").value;
        const studentId = document.getElementById("studentId").value;
        const nameRegex = /^[가-힣| ]+$/;
        const studentIdRegex = /^[0-9]{10}$/;
        const phoneVerified = phoneStep === VerifyStep.COMPLETE && codeStep === VerifyStep.COMPLETE;
        const sendButton = submitRef.current;
        if (nameRegex.test(name) && studentIdRegex.test(studentId) && phoneVerified) {
            sendButton.disabled = false;
        } else {
            sendButton.disabled = true;
        }
    }

    const handlePhone = async (e) => {
        e.preventDefault();
        setPhoneStep(VerifyStep.COMPLETE);
        const phone = document.getElementById("phone").value;
        const res = await axios.post("/API/sendCertificationCode", {phone:phone});
        if(res.data.success){
            console.log("인증번호 전송 성공");
        }else{
            console.log("인증번호 전송 실패");
        }
    }

    const handleCode = async (e) => {
        e.preventDefault();
        setCodeStep(VerifyStep.COMPLETE);
        const phone = document.getElementById("phone").value;
        const code = document.getElementById("code").value;
        const res = await axios.post("/API/checkCertificationCode", {phone:phone,code:code});
        if(res.data.success){
            console.log("인증번호 확인 성공");
        }else{
            console.log("인증번호 확인 실패");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStep(2);
    }
    return (<form onSubmit={handleSubmit}>
        {inputData.map((info,i) => <Input info={info} key={i+1} event={handleInputChange}/>)}
        <InputPhone info={phoneInputData} event={handlePhone} step={phoneStep} setStep={setPhoneStep}/>
        <InputPhone info={codeInputData} event={handleCode} step={codeStep} setStep={setCodeStep}/>
        <SendButton reff={submitRef} disabled={true} text="다음"/>
    </form>);
}