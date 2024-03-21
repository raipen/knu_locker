import hobanu from "@assets/hobanu.svg";
import { useContext } from "react";
import { getFloorName, getHeightName } from "@utils/index";
import ApplyContext from "@context/ApplyContext";
import { StudentCard, StudentCardInner, CardImage,CardInfo, SelectCard } from "@components/index";
import kakaologin from "@assets/kakaologin.png";

export default function () {
    const { name,studentId,phone,firstSelect,secondSelect } = useContext(ApplyContext);
    const redirect_uri = window.location.origin + "/";
    return (
        <>
        <StudentCard>
            <div style={{fontWeight:"600"}}>사물함 신청 완료!</div>
            <StudentCardInner>
                <CardImage src={hobanu} alt="person" />
                <div style={{width:"100%"}}>
                    <CardInfo>
                        <div>{name.value}</div>
                        <div style={{fontWeight:"300"}}>{studentId.value}</div>
                        <div style={{fontWeight:"300"}}>{phone.value.replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`)}</div>
                        <SelectCard>
                            <div>1지망</div>
                            <div>{getFloorName(firstSelect.floor) + " " + getHeightName(firstSelect.floor, firstSelect.height)}</div>
                        </SelectCard>
                        <SelectCard>
                            <div>2지망</div>
                            <div> {getFloorName(secondSelect.floor) + " " + getHeightName(secondSelect.floor, secondSelect.height)}</div>
                        </SelectCard>
                    </CardInfo>
                </div>
            </StudentCardInner>
        </StudentCard>
        <a
        style={{display: "block", margin: "0 auto"}}
        href={`https://kauth.kakao.com/oauth/logout?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&logout_redirect_uri=${redirect_uri}`}>
          <img src={kakaologin} alt="카카오 로그인" width="200"/>
        </a>
        </>
    )
}
