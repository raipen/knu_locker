import useResult from "@hooks/useResult";
import Logout from "@components/Logout";
import { MainContainer } from "@components/index";

export default function Result(){
    const { data, loading, error } = useResult();
    return (
        <MainContainer>
            <div style={{width: "fit-content", margin: "0 auto"}}>
                <h2 style={{textAlign:"center"}}>사물함 배정 결과</h2>
                {error && <div>{error}</div>}
                {loading && "로딩중..."}
                {!error&&!loading&&
                <div style={{backgroundColor: "lightgray", padding: "10px", borderRadius: "10px"}}>
                    <div>
                        <b>학번</b>: {data.studentId}
                    </div>
                    <div>
                        <b>사물함</b>: {data.locker}
                    </div>
                    <div>
                        <b>비밀번호</b>: {data.password}
                    </div>
                </div>
                }
                <p style={{border: "1px solid lightgray", padding: "10px",borderRadius: "10px"}}>
                    IT대학 5호관(융복합관) 사물함 위치
                    <br />
                    <b>L</b>: 1층 학생회실(과방) 앞<br />
                    <b>3F</b>: 3층 복도<br />
                    <b>B1</b>: 지하 1층 로비
                </p>
                <Logout />
            </div>
        </MainContainer>
    )
}
