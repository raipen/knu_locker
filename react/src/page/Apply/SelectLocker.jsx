import { useRef, useState } from "react";
import SendButton from "../../component/SendButton";

export default function ({setStep,verifyToken}) {
    const submitRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStep(3);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="locker">
                <SendButton reff={submitRef} disabled={false} text="다음"/>
            </div>
        </form>
    )
}