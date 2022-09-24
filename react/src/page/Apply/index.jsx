import { useRef, useState } from "react";
import Applicant from "./Applicant";
import Done from "./Done";
import SelectLocker from "./SelectLocker";
import Steps from "./Steps";
import styles from "./index.module.css";
import Fail from "./Fail";

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
                    <SelectLocker setStep={setStep} setInfo={setInfo} info={info}/>
                </article>
            );
        case 3:
            document.body.className = styles.main;
            return (
                <article>
                    <Steps step={step}/>
                    <Done info={info}/>
                </article>
            );
        default:
            return (
                <article>
                    <Fail info={info}/>
                </article>
            );
    }

}