import Person from "@assets/person.svg";
import { useContext, useEffect } from "react";
import ApplyContext from "@context/ApplyContext";

const heightName = {
    5: ["상","중상","중","중하","하"],
    4: ["상","중상","중하","하"]
} as const;

export default function () {
    const { name,studentId,phone,firstSelect,secondSelect } = useContext(ApplyContext);
    return (
        <div>
            <div>
                <div>사물함 신청 완료!</div>
                <img src={Person} alt="person"/>
            </div>
            <div>
                <p>{name.value}</p>
                <div>{studentId.value}</div>
                <p>{phone.value.replace(/^(\d{3})(\d{4})(\d{4})$/, `$1-$2-$3`)}</p>
                <div>
                    <div>1지망</div>
                    <div>{firstSelect.floor===-1?"지하 1":firstSelect.floor}층 {heightName[firstSelect.floor===-1?5:4][firstSelect.height-1]} </div>
                </div>
                <div>
                    <div>2지망</div>
                    <div>{secondSelect.floor===-1?"지하 1":secondSelect.floor}층 {heightName[secondSelect.floor===-1?5:4][secondSelect.height-1]} </div>
                </div>
            </div>
        </div>
    )
}
