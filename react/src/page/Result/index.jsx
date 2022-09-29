import Input from "../../component/Input";
import SendButton from "../../component/SendButton";
import { useRef, useState,useEffect } from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import Step from "../../component/Step";

export default function Result(){
    const navigate = useNavigate();
    const steps = {
        name: useState(Step.WAITING_INPUT),
        studentId: useState(Step.WAITING_INPUT),
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
        },];

    const submitRef = useRef(null);
    //input 값 체크하고 localhost:8088/API/fetchApply로 post 요청
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const studentId = document.getElementById("studentId").value;
        const data = {
            name: name,
            studentId: studentId
        }
        const sendButton = submitRef.current;
        try{
            sendButton.disabled = true;
            sendButton.innerText = "조회중...";
            const result = await axios.post("/API/fetchApply", data);
            if(result.data.success){
                navigate("/result/"+result.data.phone);
            }else{
                navigate("/noResult");
            }
        }catch(err){
            navigate("/noResult");
        }
        sendButton.disabled = false;
    }
    
    useEffect(()=>{
        //check if all steps are complete
        let complete = true;
        for(let key in steps){
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
    },[steps.name[0],steps.studentId[0]]);

    return (
        <article>
            <h1>2022년 2학기<br/>사물함 배정 정보 조회</h1><br/>
            <form onSubmit={handleSubmit}>
                {inputData.map((info,i) => <Input info={info} key={i+1}/>)}
                <SendButton reff={submitRef} disabled={true} text="조회"/>
            </form>
        </article>
    )

}