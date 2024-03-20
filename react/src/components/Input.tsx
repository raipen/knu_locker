import { InputValidation } from "../utils/enum";
import { useId } from "react";
import { styled } from "styled-components";

const InputStyle = styled.input<{$validation: InputValidation}>`
    border-radius: 5px;
    background: ${({$validation}) => $validation === InputValidation.ERROR ? "#ffc9c9" : "#f1f1f1"};
    padding: 10px 20px 10px 5px;
    border: none;
    &:focus {
        outline: none;
    }
    flex: 1;
`;

const Label = styled.label`
    font-size: 1.2rem;
    font-weight: 600;
`;

const InputContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 350px;
    margin: 0 auto;
`;

const CheckIcon = styled.div`
    color: green;
`;

export default function Input({label, placeholder, type, value, onChange, onBlur, validation}: {
    label: string,
    placeholder: string,
    type: "text"|"number",
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onBlur: () => void,
    validation: InputValidation,
}) {
    const id = useId();
    return (
        <InputContainer>
            <Label htmlFor={id}>{label}</Label>
            <InputStyle $validation={validation} type={type} name={id} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur}/>
            {validation === InputValidation.COMPLETE && <CheckIcon>✓</CheckIcon>}
        </InputContainer>
    );
}
