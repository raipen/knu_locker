import { InputStep } from "../utils/enum";
import { useId,useState } from "react";

export function useInput(regex: RegExp) {
    const [value, setValue] = useState("");
    const [step, setStep] = useState(InputStep.NONE);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setValue(v);
        if (regex.test(v)) return setStep(InputStep.COMPLETE);
        return setStep(InputStep.NONE);
    };
    const onBlur = () => {
        if (regex.test(value)) return setStep(InputStep.COMPLETE);
        return setStep(InputStep.ERROR);
    }
    return {value, step, onChange, onBlur};
}


export function Input({info}: {info:{
    label: string,
    placeholder: string,
    type: "text"|"number",
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur: () => void,
    step: InputStep,
}}) {
    const id = useId();
    return (
        <div>
            <label htmlFor={id}>{info.label}</label>
            <input type={info.type} name={id} placeholder={info.placeholder} value={info.value} onChange={info.onChange} onBlur={info.onBlur}/>
        </div>
    );
}
