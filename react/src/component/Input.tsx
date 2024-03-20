import { InputStep } from "../utils/enum";
import { useId } from "react";

export default function Input({info}: {info:{
    label: string,
    placeholder: string,
    type: "text"|"number",
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    step: InputStep,
}}) {
    const id = useId();
    return (
        <div>
            <label htmlFor={id}>{info.label}</label>
            <input type={info.type} name={id} placeholder={info.placeholder} value={info.value} onChange={info.onChange} />
        </div>
    );
}
