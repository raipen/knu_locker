import { useContext, useState } from "react";
import ApplyContext from "@context/ApplyContext";
import { FormContainer, SubmitButton, SelectFloorItem } from "@components/index";
import { LockerType } from "@hooks/useLocker";
import axios from 'axios';

const heightName = {
    5: ["상","중상","중","중하","하"],
    4: ["상","중상","중하","하"]
} as const;

function Tab({text,locker,onClick}: {text:string,locker:LockerType,onClick?:()=>void}){
    return (
        <div onClick={onClick}>
            <div>{text}</div>
            <div>
                {!locker.isSelected&&"선택해주세요"}
                {locker.isSelected&&
                    (locker.floor===-1?"지하 1":locker.floor)
                    +"층 "+heightName[locker.floor===-1?5:4][locker.height-1]
                }
            </div>
        </div>
    );
}

function SelectFloor({locker}:{locker:LockerType}){
    const handleClick = (i:number)=> () =>{
        locker.setFloor(i);
        locker.setHeight(0);
    }

    return (
        <div>
            {[{number:-1,text:"지하 1층"},{number:1,text:"1층"},{number:3,text:"3층"}].map((v,i)=>{
                return (
                    <SelectFloorItem key={i} onClick={handleClick(v.number)} $isSelect={locker.floor===v.number}>
                        {v.text}
                    </SelectFloorItem>
                );
            })}
        </div>
    );
}

function SelectHeight({locker}:{locker:LockerType}){
    const handleClick = (i:number)=> () => {
        locker.setHeight(i);
        locker.setIsSelected(true);
    }
    return(
        <div>
            {locker.floor===0&&<div>층을 선택해주세요</div>}
            {locker.floor!==0&&Array(locker.floor===-1?5:4).fill(0).map((_,i)=>(
                <SelectFloorItem key={i} onClick={handleClick(i+1)} $isSelect={locker.height===i+1}>
                </SelectFloorItem>
            ))}
            <div></div>
        </div>
    )
}

export default function () {
    const { nextStep, firstSelect, secondSelect } = useContext(ApplyContext);
    return (
        <FormContainer>
            <Tab text="1지망" locker={firstSelect}/>
            <SelectFloor locker={firstSelect}/>
            <SelectHeight locker={firstSelect}/>
            {firstSelect.isSelected&&[<Tab text="2지망" locker={secondSelect}/>,
            <SelectFloor locker={secondSelect}/>,
            <SelectHeight locker={secondSelect}/>]}
            <SubmitButton onClick={nextStep} disabled={!firstSelect.isSelected||!secondSelect.isSelected}>다음</SubmitButton>
        </FormContainer>
    );
}
