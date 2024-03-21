import { useContext, useState } from "react";
import ApplyContext from "@context/ApplyContext";
import Input from "@components/Input";
import { InputValidation } from "@utils/enum";
import { SubmitButton,FormContainer } from "@components/index";
import axios from "axios";

export default function () {
    const { nextStep, name, studentId, phone } = useContext(ApplyContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("/api/v2/student/checkStudent", {name:name.value,studentId:studentId.value});
            if (res.data.isStudent)
                return nextStep();
            setError("일치하는 컴퓨터학부 학생이 존재하지 않습니다.");
        } catch (e) {
            setError("서버 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    }

    const isComplete = name.validation === InputValidation.COMPLETE &&
        studentId.validation === InputValidation.COMPLETE &&
        phone.validation === InputValidation.COMPLETE;

    return (
        <FormContainer onSubmit={handleSubmit}>
            <Input label="이름" placeholder="호반우" type="text" {...name} />
            <Input label="학번" placeholder="2022123456" type="number" {...studentId} />
            <Input label="전화번호" placeholder="'-'없이 숫자만 입력" type="number" {...phone} />
            {error && <div>{error}</div>}
            <SubmitButton disabled={!isComplete||loading} type="submit">다음</SubmitButton>
        </FormContainer>
    );
}
