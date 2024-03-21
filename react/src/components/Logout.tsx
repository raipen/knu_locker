export default function Logout() {
    const redirect_uri = window.location.origin + "/";
    return (
        <a
            style={{ display: "block", margin: "0 auto", width: "200px"}}
            href={`https://kauth.kakao.com/oauth/logout?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&logout_redirect_uri=${redirect_uri}`}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 20px", backgroundColor: "#fee500", color: "#000", borderRadius: "10px"}}>
                카카오 로그아웃
            </div>
        </a>
    )
}
