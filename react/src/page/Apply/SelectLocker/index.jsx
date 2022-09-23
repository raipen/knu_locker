import { useRef, useState } from "react";
import SendButton from "../../../component/SendButton";
import Tab from "./Tab";
import SelectFloor from "./SelectFloor";
import styles from "./index.module.css";
import SelectHeight from "./SelectHeight";
import axios from 'axios';

export default function ({setStep,info}) {
    const [first,setFirst] = useState(null);
    const [second,setSecond] = useState(null);
    const submitRef = useRef(null);
    
    let handleSubmit = ()=>{};

    let tab=(<div className={styles.tab}></div>);
    let select=(<div className={styles.selectForm}></div>);
    let sendButton;

    //탭1을 클릭하면 first===null로 돌아감
    const tabClick = () => {
            setFirst({
                ...first,
                selected:undefined
            });
            setSecond(null);
    }

    if(first===null&&second===null){
        tab = (<div className={styles.tabs}>
        <Tab text="1지망" locker={first}/>
        </div>);
        select = (<div className={styles.selectForm}>
            <SelectFloor locker={first} setLocker={setFirst}/>
        </div>);
        sendButton = (<SendButton disabled={true} text="1지망 선택 완료"/>);
    }else if(first.height===undefined&&second===null){
        tab = (<div className={styles.tabs}>
            <Tab text="1지망" locker={first}/>
            </div>);
        select = (<div className={styles.selectForm}>
                <SelectFloor locker={first} setLocker={setFirst}/>
                <SelectHeight locker={first} setLocker={setFirst}/>
            </div>
        );
        sendButton = (<SendButton disabled={true} text="1지망 선택 완료"/>);
    }else if(first.selected===undefined&&second===null){
        tab = (<div className={styles.tabs}>
            <Tab text="1지망" locker={first}/>
            </div>);
        select = (<div className={styles.selectForm}>
                <SelectFloor locker={first} setLocker={setFirst}/>
                <SelectHeight locker={first} setLocker={setFirst}/>
            </div>
        );
        sendButton = (<SendButton disabled={false} text="1지망 선택 완료"/>);
        handleSubmit = async (e) => {
            e.preventDefault();
            setFirst({
                ...first,
                selected:true
            });
        }
    }else if(first.selected===true&&second===null){
        tab = (<div className={styles.tabs}>
            <Tab event={tabClick} text="1지망" locker={first}/>
            <Tab text="2지망" locker={second}/>
            </div>);
        select = (<div className={styles.selectForm}>
                <SelectFloor locker={second} setLocker={setSecond}/>
            </div>
        );
        sendButton = (<SendButton disabled={true} text="2지망 선택 완료"/>);
    }else if(first.selected===true&&second.height===undefined){
        tab = (<div className={styles.tabs}>
            <Tab event={tabClick} text="1지망" locker={first}/>
            <Tab text="2지망" locker={second}/>
            </div>);
        select = (<div className={styles.selectForm}>
                <SelectFloor locker={second} setLocker={setSecond}/>
                <SelectHeight locker={second} setLocker={setSecond}/>
            </div>
        );
        sendButton = (<SendButton disabled={true} text="2지망 선택 완료"/>);
    }else if(first.selected===true&&second.selected===undefined){
        tab = (<div className={styles.tabs}>
            <Tab event={tabClick} text="1지망" locker={first}/>
            <Tab text="2지망" locker={second}/>
            </div>);
        select = (<div className={styles.selectForm}>
                <SelectFloor locker={second} setLocker={setSecond}/>
                <SelectHeight locker={second} setLocker={setSecond}/>
            </div>
        );
        sendButton = (<SendButton reff={submitRef} disabled={false} text="2지망 선택 완료"/>);
        handleSubmit = async (e) => {
            e.preventDefault();
            submitRef.current.text="신청 중...";

            let data = {
                name: info.name,
                studentId: info.studentId,
                first_floor: first.floor,
                first_height: first.height,
                second_floor: second.floor,
                second_height: second.height
            }
            console.log(data);
            try {
                const res = await axios.post("/API/apply", data);
                if (res.data.success) {
                    setStep(3);
                } else {
                    setStep(4);
                }
            } catch (e) {
                setStep(4);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className={styles.locker}>
                {tab}
                {select}
                {sendButton}
            </div>
        </form>
    );
}