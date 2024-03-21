export const getFloorName = (floor: number) => {
    if(floor === -1) return "지하 1층";
    return floor + "층";
}

export const getHeightName = (floor: number, height: number) => {
    if(floor === -1) return ["상", "중상", "중", "중하", "하"][height - 1];
    return ["상", "중상", "중하", "하"][height - 1];
}
