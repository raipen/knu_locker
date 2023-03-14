import Menu from "./Menu";
import styles from "./Main.module.css";
import axios from 'axios';
import { useEffect, useState } from "react";

export default function Main(){
    const [data, setData] = useState([]);
    const getStatus = async () => {
        let result = await axios.get("/API/status");
        setData(result.data);
    }
    useEffect(()=>{
        getStatus();
        //setData([{"isDisabled":true,"date":"2023-03-01 17:59:59~2023-03-01 17:59:59"},{"isDisabled":false,"date":"~2023-03-01 17:59:59"},{"isDisabled":false,"date":"2023-03-02 08:59:59~"}]);
    },[]);
    
    let menus = [{
        cName: styles.menu +" "+ (data[0]?.isDisabled?styles.disable:""),
        href: data[0]?.isDisabled?"/":"/apply",
        icon: "mouse",
        iconType: "-outlined",
        text: "사물함 1차 신청",
        date: data[0]?.date,
    },{
        cName: styles.menu +" "+ (data[1]?.isDisabled?styles.disable:""),
        href: "/",
        icon: "groups",
        text: "사물함 추가 신청",
        date: data[1]?.date,
    },{
        cName: styles.menu +" "+ (data[2]?.isDisabled?styles.disable:""),
        href: data[2]?.isDisabled?"/":"/result",
        icon: "check_circle",
        text: "사물함 신청 결과",
        date: data[2]?.date,
    }];
    
    return (
        <div style={{background:"#da2127"}}>
            <span className={styles.deco+" material-icons-outlined"}>
            laptop_mac
            </span>
            <article className={styles.article}>
                {menus.map((menu, index) => {
                    return <Menu key={index} {...menu} />
                })}
            </article>
        </div>
    )
}