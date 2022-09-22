import styles from "./Input.module.css"
import VerifyStep from "./VerifyStep";
import axios from "axios";

export default function ({info,event,step,setStep}){
    if(step===VerifyStep.NONE)
        return;

    const handleInputChange = (e) => {
        const value = e.target.value;
        if(info.reg.test(value)){
            setStep(VerifyStep.READY_TO_SEND);
        }else{
            setStep(VerifyStep.WAITING_INPUT);
        }
    }

    let mainClass=styles.input;
    let button;

    if(step===VerifyStep.READY_TO_SEND){
        mainClass+=" "+styles.right;
        button = (<button className={styles.button} onClick={event}>{info.activate}</button>);
    }

    if(step===VerifyStep.COMPLETE){
        mainClass+=" "+styles.right;
        button = (<button className={styles.button} disabled>{info.activate}</button>);
    }

    return (
            <div className={mainClass}>
                <label htmlFor={info.id}>
                    {info.label}
                </label>
                <input type="number" name={info.id} id={info.id} placeholder={info.placeholder} onInput={handleInputChange}/>
                {button}
            </div>
        );
}