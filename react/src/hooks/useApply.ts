import useInput from "./useInput";
import useLocker from "./useLocker";
import useStep from "./useStep";
import { useState } from "react";
import { InputValidation } from "@utils/enum";
import {requestApply} from "@utils/apis";

export default function useApply() {
    const {step, nextStep} = useStep();
    const name = useInput(/^[가-힣| ]+$/);
    const studentId = useInput(/^[0-9]{10}$/);
    const phone = useInput(/^010\d{8}$/);
    const firstSelect = useLocker();
    const secondSelect = useLocker();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const apply = async () => {
        setLoading(true);
        setError("");
        try {
            if(name.validation !== InputValidation.COMPLETE) throw new Error("invalid data");
            if(studentId.validation !== InputValidation.COMPLETE) throw new Error("invalid data");
            if(phone.validation !== InputValidation.COMPLETE) throw new Error("invalid data");
            if(!firstSelect.isSelected) throw new Error("invalid data");
            if(!secondSelect.isSelected) throw new Error("invalid data");
            await requestApply({
                name: name.value,
                studentId: studentId.value,
                phone: phone.value,
                first_floor: firstSelect.floor,
                first_height: firstSelect.height,
                second_floor: secondSelect.floor,
                second_height: secondSelect.height,
            });
            nextStep();
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    return {step, nextStep, name, studentId, phone, firstSelect, secondSelect, loading, error, apply};
}
