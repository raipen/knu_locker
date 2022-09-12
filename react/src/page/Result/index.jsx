import Input from "../../component/Input";
import SendButton from "../../component/SendButton";
import { useRef, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';

export default function Result(){
    const navigate = useNavigate();
    const inputData = [{
        id: "name",
        label: "이름",
        placeholder: "호반우"
    },{
        id: "studentId",
        label: "학번",
        placeholder: "2022123456"
    }];

    const submitRef = useRef(null);
    //input 값 체크하고 localhost:8088/API/fetchApply로 post 요청
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const studentId = document.getElementById("studentId").value;
        const data = {
            name: name,
            number: studentId
        }
        const sendButton = submitRef.current;
        try{
            sendButton.disabled = true;
            sendButton.innerText = "조회중...";
            const result = await axios.post("/API/fetchApply", data);
            if(result.data.success){
                let phone = result.data.phone;
                let securePhone = phone.substr(0,6)+"**"+phone.substr(8,3)+"**";
                navigate("/result/"+securePhone);
            }else{
                navigate("/noResult");
            }
        }catch(err){
            navigate("/noResult");
        }
        sendButton.disabled = false;
    }
    
    //input 값이 바뀔때마다 이름, 학번 정규식으로 체크하고 버튼 enable하기
    const handleInputChange = (e) => {
        const name = document.getElementById("name").value;
        const studentId = document.getElementById("studentId").value;
        const nameRegex = /^[가-힣| ]+$/;
        const studentIdRegex = /^[0-9]{10}$/;
        const sendButton = submitRef.current;
        if(nameRegex.test(name) && studentIdRegex.test(studentId)){
            sendButton.disabled = false;
        }else{
            sendButton.disabled = true;
        }
    }

    return (
        <article>
            <h1>2022년 1학기<br/>사물함 배정 정보 조회</h1><br/>
            <form onSubmit={handleSubmit}>
                {inputData.map((info,i) => <Input info={info} key={i+1} event={handleInputChange}/>)}
                <SendButton reff={submitRef} disabled={true} text="조회"/>
            </form>
        </article>
    )

}