import { useState, useCallback, useMemo } from "react";

export default function useStep() {
    const [step, setStep] = useState(0);
    const nextStep = useCallback(() => setStep(s => s + 1), []);
    return useMemo(() => ({step, nextStep}), [step, nextStep]);
}
