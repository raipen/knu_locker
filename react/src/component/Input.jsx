import styles from "./Input.module.css"
import Step from "./Step";
import axios from "axios";

export default function Input({info}){
    if(info.step===Step.NONE)
        return;

    const handleInputChange = (e) => {
        const value = e.target.value;
        if(info.useButton&&info.reg.test(value)){
            info.setStep(Step.READY_TO_SEND);
        }else if(info.reg.test(value)){
            info.setStep(Step.COMPLETE);
        }else{
            info.setStep(Step.WAITING_INPUT);
        }
    }

    let mainClass=styles.input;
    let button;

    if(info.step===Step.READY_TO_SEND){
        mainClass+=" "+styles.right;
        button = (<button className={styles.button} onClick={info.event}>{info.activate}</button>);
    }

    if(info.step===Step.SENDING){
        mainClass+=" "+styles.right;
        button = (<button className={styles.button} disabled>{info.sending}</button>);
    }

    if(info.step===Step.COMPLETE){
        mainClass+=" "+styles.right;
        button = (<span className={styles.complete+" material-icons-outlined"}>
        done
        </span>);
    }

    if(info.step===Step.FAIL){
        mainClass+=" "+styles.error;
    }

    return (
        <div className={mainClass}>
            <label htmlFor={info.id}>
                {info.label}
            </label>
            <input type={info.type} name={info.id} id={info.id} placeholder={info.placeholder} onInput={handleInputChange}/>
            {button}
        </div>
    );
}