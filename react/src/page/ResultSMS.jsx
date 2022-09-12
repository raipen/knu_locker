import { useParams } from "react-router-dom";

export default function Result(){
    const { phone } = useParams();
    return (<article>
        <h1>
            {phone+"에서 문자를 확인해주세요."}
        </h1>
    </article>
    );
}