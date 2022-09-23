import styles from "./index.module.css";

export default function SelectFloor({locker,setLocker}){
    //클릭할 경우 해당 층의 정보를 부모에게 전달
    let handleClick = (i) => {
        setLocker({
            floor:i
        });
    }

    return (
        <div className={styles.selectFloor}>
            <div onClick={()=>handleClick(-1)} className={locker?.floor === -1 && styles.select}>B1</div>
            <div onClick={()=>handleClick(1)} className={locker?.floor === 1 && styles.select}>1F</div>
            <div onClick={()=>handleClick(3)} className={locker?.floor === 3 && styles.select}>3F</div>
        </div>
    );
}