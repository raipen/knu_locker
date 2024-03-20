import { InputValidation } from "../utils/enum";
import { useId } from "react";
import { styled } from "styled-components";

const InputStyle = styled.input<{$step: InputValidation}>`
    border-radius: 5px;
    background: ${({$step}) => $step === InputValidation.ERROR ? "#ffc9c9" : "#f1f1f1"};
    padding: 5px 10px 20px;
    line-height: 3rem;
`;

export function Input({label, placeholder, type, value, onChange, onBlur, step}: {
    label: string,
    placeholder: string,
    type: "text"|"number",
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur: () => void,
    step: InputValidation,
}) {
    const id = useId();
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <InputStyle $step={step} type={type} name={id} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur}/>
        </div>
    );
}
