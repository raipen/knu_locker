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
