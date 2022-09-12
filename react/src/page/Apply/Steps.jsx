import Step from "./Step";
import styles from "./Steps.module.css";

export default function ({step}){
    const steps = [
        {id:1,label:"신청자 정보 입력"},
        {id:2,label:"사물함 위치 선택"},
        {id:3,label:"신청 완료"},
    ];
    for(let i=0;i<step-1;i++){
        steps[i].status="done";
    }
    steps[step-1].status="doing";
    return (
        <div className={styles.steps}>
            <Step info={steps[0]}/>
            <div className={styles.line}></div>
            <Step info={steps[1]}/>
            <div className={styles.line}></div>
            <Step info={steps[2]}/>
        </div>
    );
}