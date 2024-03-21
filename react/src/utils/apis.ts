import { apiErrorCatchWrapper } from ".";
import axios from "axios";

export const requestApply = apiErrorCatchWrapper(async ({name, studentId, phone, first_floor, first_height, second_floor, second_height}:{name: string, studentId: string, phone: string, first_floor: number, first_height: number, second_floor: number, second_height: number}) => {
    await axios.post("/api/v2/locker/apply", {
        name, studentId, phone, first_floor, first_height, second_floor, second_height
    });
});

export const requestCheckStudent = apiErrorCatchWrapper(async ({name, studentId}:{name: string, studentId: string}) => {
    const res = await axios.post("/api/v2/student/checkStudent", {name, studentId});
    return res.data.isStudent;
});

export const requestResult = apiErrorCatchWrapper(async () => {
    const res = await axios.get("/api/v2/locker/result");
    return res.data;
});
