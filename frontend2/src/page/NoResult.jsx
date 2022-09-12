import { useParams } from "react-router-dom";

export default function Result(){
    return (<article>
        <h1>
            신청내역이 존재하지 않습니다.<br/>
            이름과 학번을 다시 확인해주세요.
        </h1>
    </article>
    );
}