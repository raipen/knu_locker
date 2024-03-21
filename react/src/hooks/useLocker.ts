import { useState, useMemo, useCallback, useEffect } from "react";

export default function useLocker() {
    const [floor, setFloorTemp] = useState<number>(0);
    const [height, setHeightTemp] = useState<number>(0);
    const [isSelected, setIsSelected] = useState<boolean>(false);

    const setFloor = useCallback((f: number) => () => {
        setFloorTemp(f);
        setHeightTemp(0);
        setIsSelected(false);
    }, [setFloorTemp, setHeightTemp, setIsSelected]);

    const setHeight = useCallback((h: number) => () => {
        if(floor === 0) return;
        setHeightTemp(h);
        setIsSelected(true);
    }, [floor, setHeightTemp, setIsSelected]);

    return useMemo(() => ({floor, setFloor, height, setHeight, isSelected}), [floor, setFloor, height, setHeight, isSelected]);
}

export type LockerType = {
    floor: number;
    setFloor: (f: number) => () => void;
    height: number;
    setHeight: (h: number) => () => void;
    isSelected: boolean;
}
