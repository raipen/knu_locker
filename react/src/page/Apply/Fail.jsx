import styles from "./index.module.css";
import { useEffect,useState } from "react";
import axios from "axios";

export default function ({info}) {
    const [kakaoId, setKakaoId] = useState("");
    useEffect(() => {
        (async () => {
            try{
                const result = await axios.get("/API/kakaoId");
                setKakaoId(result.data.kakaoId);
            }catch(e){
                setKakaoId("없음");
            }
        })();
    }, []);
    return (
    <>
        <h1>{info}</h1>
        <p>
            <span className="material-icons-outlined">
                error_outline
            </span>
            <span>
                문제가 지속될 경우 재정부장(카카오톡 아이디: {kakaoId})에게 문의해주세요.
            </span>
        </p>
    </>);
}