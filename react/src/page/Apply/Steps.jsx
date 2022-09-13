import Step from "./Step";
import styles from "./Steps.module.css";

export default function ({step}){
    let steps = [
        {id:1,label:"신청자 정보"},
        {id:2,label:"사물함 선택"},
        {id:3,label:"신청 완료"},
    ];
    let lines = [false,false];
    for(let i=0;i<step-1;i++){
        steps[i].status="done";
        lines[i] = true;
    }
    steps[step-1].status="doing";
    return (
        <div className={styles.steps}>
            <Step info={steps[0]}/>
            <div className={styles.line+" "+(lines[0]&&styles.on)}>
                <div></div>
            </div>
            <Step info={steps[1]}/>
            <div className={styles.line+" "+(lines[1]&&styles.on)}>
                <div></div>
            </div>
            <Step info={steps[2]}/>
        </div>
    );
}