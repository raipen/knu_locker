import { useRef, useState,useEffect } from "react";
import Input from "../../component/Input";
import SendButton from "../../component/SendButton";
import axios from 'axios';
import Step from '../../component/Step';

export default function ({setStep}) {
    const steps = {
        name: useState(Step.WAITING_INPUT),
        studentId: useState(Step.WAITING_INPUT),
        phone: useState(Step.WAITING_INPUT),
        code: useState(Step.NONE),
    };

    const inputData = [
        {
            id: "name", label: "이름",
            placeholder: "호반우", type: "text",
            reg:/^[가-힣| ]+$/, useButton:false,
            step:steps.name[0],setStep:steps.name[1],
        },
        {
            id: "studentId", label: "학번",
            placeholder: "2022123456", type: "number",
            reg:/^[0-9]{10}$/, useButton:false,
            step:steps.studentId[0],setStep:steps.studentId[1],
        },
        {
            id: "phone", label: "전화번호",
            placeholder: "'-'없이 숫자만 입력", type: "number",
            reg: /^010\d{8}$/, useButton:true,
            step:steps.phone[0],setStep:steps.phone[1],
            activate: "인증", sending: "인증중", complete: "인증완료",
        },
        {
            id: "code", label: "인증번호",
            placeholder: "인증번호 6자리", type: "number",
            reg: /^\d{6}$/, useButton:true,
            step:steps.code[0],setStep:steps.code[1],
            activate: "확인", sending: "확인중", complete: "확인완료",
        },
    ];

    useEffect(()=>{
        if(steps.phone[0]===Step.COMPLETE){
            steps.code[1](Step.WAITING_INPUT);
            return;
        }
        steps.code[1](Step.NONE);
        const phone = document.getElementById("phone");
        let phone_temp = phone.value;
        phone.value = "";
        phone.focus();
        phone.value = phone_temp;
    },[steps.phone[0]]);

    useEffect(()=>{
        if(steps.code[0]===Step.WAITING_INPUT){
            document.getElementById("code").focus();
        }
    },[steps.code[0]]);

    useEffect(()=>{
        document.getElementById("name").focus();
    },[]);

    const submitRef = useRef(null);
    
    useEffect(()=>{
        //check if all steps are complete
        let complete = true;
        for(let key in steps){
            console.log(key,steps[key][0]);
            if(steps[key][0]!==Step.COMPLETE){
                complete = false;
                break;
            }
        }
        if(complete){
            submitRef.current.disabled = false;
        }else{
            submitRef.current.disabled = true;
        }
    },[steps.name[0],steps.studentId[0],steps.code[0]]);


    inputData[2].event = async (e) => {
        e.preventDefault();
        steps.phone[1](Step.SENDING);
        const phone = document.getElementById("phone").value;
        try {
            const res = await axios.post("/API/sendCertificationCode", { phone: phone });
            if (res.data.success) {
                steps.phone[1](Step.COMPLETE);
            } else {
                steps.phone[1](Step.FAIL);
            }
        } catch (e) {
            steps.phone[1](Step.FAIL);
        }
    }

    inputData[3].event = async (e) => {
        e.preventDefault();
        steps.code[1](Step.SENDING);
        const phone = document.getElementById("phone").value;
        const code = document.getElementById("code").value;
        try {
            const res = await axios.post("/API/checkCertificationCode", { phone: phone, code: code });
            if (res.data.success) {
                steps.code[1](Step.COMPLETE);
            } else {
                steps.code[1](Step.FAIL);
                document.getElementById("code").value="";
                document.getElementById("code").focus();
            }
        } catch (e) {
            steps.code[1](Step.FAIL);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStep(2);
    }

    return (<form onSubmit={handleSubmit}>
        {inputData.map((info,i) => <Input info={info} key={i+1}/>)}
        <SendButton reff={submitRef} disabled={true} text="다음"/>
    </form>);
}