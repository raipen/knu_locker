import axios from "axios";

export const getFloorName = (floor: number) => {
    if(floor === -1) return "지하 1층";
    return floor + "층";
}

export const getHeightName = (floor: number, height: number) => {
    if(floor === -1) return ["상", "중상", "중", "중하", "하"][height - 1];
    return ["상", "중상", "중하", "하"][height - 1];
}

const deadline = new Date(import.meta.env.VITE_DEAD_LINE);
const startDate = new Date(import.meta.env.VITE_START_DATE);
const nextDayOfDeadline = new Date(deadline.getTime() + 24 * 60 * 60 * 1000);
export const menuDate =  [{
    isDisabled: new Date() > deadline || new Date() < startDate,
    date: new Date() > deadline || new Date() < startDate ? "신청기간이 아닙니다." : ("~" + import.meta.env.VITE_DEAD_LINE),
  },
  {
    isDisabled: true,
    date: "신청기간이 아닙니다."
  },
  {
    isDisabled: new Date() < nextDayOfDeadline,
    date: (new Date(nextDayOfDeadline.getTime() + 9 * 60 * 60 * 1000)).toISOString().substring(0, 19).replace('T', ' ') + "~",
}];


export const apiErrorCatchWrapper = <T extends Array<any>,U>(api: (...a:T) => Promise<U>) => async (...a:T) => {
  try {
      return await api(...a);
  } catch (e: unknown) {
      if (!(e instanceof Error))
        throw new Error("알 수 없는 오류가 발생했습니다.");
      if (!axios.isAxiosError(e) || !e.response) throw new Error(e.message);
      const { message } = (e.response.data || { message: "알 수 없는 오류가 발생했습니다." }) as {message:string};
      throw new Error(message);
  }
}
