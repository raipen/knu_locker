import styles from "./index.module.css";

export default function Tab({text,locker,event}){
    let height = [
        ["상","중상","중","중하","하"],
        ["상","중상","중하","하"],
        [],
        ["상","중상","중하","하"]
    ]
    let lockerText="";
    if(locker?.floor!==undefined)
        lockerText += (locker.floor===-1?"지하 1층":locker.floor+"층");
    if(locker?.height!==undefined)
        lockerText += " "+height[locker.floor==-1?0:locker.floor][locker.height-1];
    return (
        <div onClick={event}className={styles.tab+" "+(locker?.selected===true&&styles.select)}>
            <div className={styles.text}>{text}</div>
            <div className={styles.text}>{lockerText}</div>
        </div>
    );
}