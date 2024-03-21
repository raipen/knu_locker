import { useContext } from "react";
import ApplyContext from "@context/ApplyContext";
import { FormContainer, SubmitButton, SelectItem, SelectTitle, SelectContainer } from "@components/index";
import { LockerType } from "@hooks/useLocker";
import { getFloorName, getHeightName } from "@utils/index";

function Select({ count, locker }: { locker: LockerType, count: number }) {
    return (
        <>
            <SelectTitle>
                <div>
                    {count+"지망: "}
                    {!locker.isSelected && "선택해주세요"}
                    {locker.isSelected && getFloorName(locker.floor) + " " + getHeightName(locker.floor, locker.height)}
                </div>
            </SelectTitle>
            <SelectContainer>
                <label>층수</label>
                {[-1,1,3].map((v, i) => (
                    <SelectItem key={i} onClick={locker.setFloor(v)} $isSelect={locker.floor === v}>
                        {getFloorName(v)}
                    </SelectItem>
                ))}
            </SelectContainer>
            <SelectContainer>
                {locker.floor !== 0 &&<label>높이</label>}
                {locker.floor !== 0 && Array(locker.floor === -1 ? 5 : 4).fill(0).map((_, i) => (
                    <SelectItem key={i} onClick={locker.setHeight(i + 1)} $isSelect={locker.height === i + 1}>
                        {getHeightName(locker.floor, i + 1)}
                    </SelectItem>
                ))}
            </SelectContainer>
        </>
    );
}

export default function () {
    const { loading, firstSelect, secondSelect, apply, error } = useContext(ApplyContext);
    return (
        <FormContainer>
            <Select count={1} locker={firstSelect} />
            {firstSelect.isSelected && <Select count={2} locker={secondSelect} />}
            <SubmitButton onClick={apply} disabled={!firstSelect.isSelected || !secondSelect.isSelected || loading}>
                {loading ? "신청중..." : "신청하기"}
            </SubmitButton>
            {error && <div style={{textAlign: "center"}}>
                <div>{error}</div><br/>
                {error==="이미 신청한 카카오 아이디입니다." && <a
                style={{ display: "block", margin: "0 auto" }}
                href={`https://kauth.kakao.com/oauth/logout?client_id=${import.meta.env.VITE_KAKAO_CLIENT_ID}&logout_redirect_uri=${window.location.origin + "/"}`}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "10px 20px", backgroundColor: "#fee500", color: "#000", borderRadius: "10px"}}>
                    카카오 로그아웃
                </div>
            </a>}
                <div>문제가 지속될 경우 재정부장(카카오톡 아이디: {import.meta.env.VITE_KAKAO_ID})에게 문의해주세요.</div>
            </div>}
        </FormContainer>
    );
}
