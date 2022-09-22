import { useRef, useState } from "react";
import Applicant from "./Applicant";
import Done from "./Done";
import SelectLocker from "./SelectLocker";
import Steps from "./Steps";

export default function Apply(){
    const [step,setStep] = useState(1);
    switch(step){
        case 1:
            return (
                <article>
                    <Steps step={step}/>
                    <Applicant setStep={setStep}/>
                </article>
            );
        case 2:
            return (
                <article>
                    <Steps step={step} />
                    <SelectLocker setStep={setStep}/>
                </article>
            );
        default:
            return (
                <article>
                    <Steps step={step}/>
                    <Done/>
                </article>
            );
    }

}