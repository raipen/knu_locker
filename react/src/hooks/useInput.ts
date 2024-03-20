import { useState } from "react";
import { InputValidation } from "../utils/enum";

export default function useInput(regex: RegExp) {
    const [value, setValue] = useState("");
    const [validation, setValidation] = useState(InputValidation.NONE);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setValue(v);
        if (regex.test(v)) return setValidation(InputValidation.COMPLETE);
        return setValidation(InputValidation.NONE);
    };
    const onBlur = () => {
        if (regex.test(value)) return setValidation(InputValidation.COMPLETE);
        return setValidation(InputValidation.ERROR);
    }
    return {value, validation, onChange, onBlur};
}
