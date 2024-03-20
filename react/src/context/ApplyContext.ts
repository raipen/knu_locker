import { createContext } from "react";
import { InputValidation } from "../utils/enum";

type InputType = {
    value: string;
    validation: InputValidation;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
}

type LockerType = {
    floor: number|null;
    setFloor: (f: number) => void;
    height: number|null;
    setHeight: (h: number) => void;
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
