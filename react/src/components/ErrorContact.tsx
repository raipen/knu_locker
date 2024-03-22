export default function({type}: {type: "재정부" | "집행부"}) {
    const kakaoId = type === "재정부"
        ? import.meta.env.VITE_FINANCE_KAKAO_ID
        : import.meta.env.VITE_EXECUTE_KAKAO_ID;
    return (
        <div style={{fontSize:"0.9rem"}}>{type === "재정부"&&"학생 정보"} 오류 문의: {type}장(카카오톡ID: {kakaoId})</div>
    );
}
