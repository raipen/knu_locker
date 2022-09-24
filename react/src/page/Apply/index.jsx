import { useRef, useState } from "react";
import Applicant from "./Applicant";
import Done from "./Done";
import SelectLocker from "./SelectLocker";
import Steps from "./Steps";

export default function Apply(){
    const [step,setStep] = useState(1);
    const [info,setInfo] = useState({name:"",studentId:""});
    switch(step){
        case 1:
            return (
                <article>
                    <Steps step={step}/>
                    <Applicant setStep={setStep} setInfo={setInfo}/>
                </article>
            );
        case 2:
            return (
                <article>
                    <Steps step={step} />
                    <SelectLocker setStep={setStep} info={info}/>
                </article>
            );
        case 3:
            return (
                <article>
                    <Steps step={step}/>
                    <Done info={info}/>
                </article>
            );
        default:
            return (
                <article>
                    <h1>신청 오류</h1>
                </article>
            );
    }

}