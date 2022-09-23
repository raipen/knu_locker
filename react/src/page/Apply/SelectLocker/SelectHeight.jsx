import styles from "./index.module.css";

export default function SelectHeight({locker,setLocker}){
    //클릭할 경우 해당 층의 정보를 부모에게 전달
    let handleClick = (i) => {
        setLocker({
            ...locker,
            height:i
        });
    }

    if(locker.floor===-1)
        return(
            <div className={styles.selectHeight}>
                <div onClick={()=>handleClick(1)} className={locker?.height === 1 && styles.select}>
                    <div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/>
                </div>
                <div onClick={()=>handleClick(2)} className={locker?.height === 2 && styles.select}>
                    <div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/>
                </div>
                <div onClick={()=>handleClick(3)} className={locker?.height === 3 && styles.select}>
                    <div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/>
                </div>
                <div onClick={()=>handleClick(4)} className={locker?.height === 4 && styles.select}>
                    <div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/>
                </div>
                <div onClick={()=>handleClick(5)} className={locker?.height === 5 && styles.select}>
                    <div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/>
                </div>
                <div></div>
            </div>
        )
    return (
        <div className={styles.selectHeight}>
            <div onClick={()=>handleClick(1)} className={locker?.height === 1 && styles.select}>
                <div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/>
            </div>
            <div onClick={()=>handleClick(2)} className={locker?.height === 2 && styles.select}>
                <div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/>
            </div>
            <div onClick={()=>handleClick(3)} className={locker?.height === 3 && styles.select}>
                <div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/>
            </div>
            <div onClick={()=>handleClick(4)} className={locker?.height === 4 && styles.select}>
                <div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/><div/>
            </div>
            <div></div>
        </div>
    );
}