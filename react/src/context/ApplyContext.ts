import { createContext } from "react";
import { InputValidation } from "../utils/enum";
import { LockerType } from "../hooks/useLocker";

type InputType = {
    value: string;
    validation: InputValidation;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
}

export default createContext({} as {
    step: number;
    nextStep: () => void;
    name: InputType;
    studentId: InputType;
    phone: InputType;
    firstSelect: LockerType;
    secondSelect: LockerType;
    loading: boolean;
    apply: () => Promise<void>;
});
