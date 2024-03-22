import { useContext } from "react";
import ApplyContext from "@context/ApplyContext";
import { FormContainer, SubmitButton, SelectItem, SelectTitle, SelectContainer } from "@components/index";
import { LockerType } from "@hooks/useLocker";
import { getFloorName, getHeightName } from "@utils/index";
import Logout from "@components/Logout";
import ErrorContact from "@components/ErrorContact";

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
                <div style={{fontWeight:"500"}}>{error}</div><br/>
                {error==="이미 신청한 카카오 아이디입니다." && <Logout />}
                <ErrorContact type="집행부" />
            </div>}
        </FormContainer>
    );
}
