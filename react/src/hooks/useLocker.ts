import { useState, useMemo, useCallback, useEffect } from "react";

export default function useLocker() {
    const [floor, setFloor] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [isSelected, setIsSelected] = useState<boolean>(false);

    const cancle = useCallback(() => {
        setFloor(0);
        setHeight(0);
        setIsSelected(false);
    }, [setFloor, setHeight, setIsSelected]);

    return useMemo(() => ({floor, setFloor, height, setHeight, isSelected, setIsSelected, cancle}), [floor, setFloor, height, setHeight, isSelected, setIsSelected, cancle]);
}

export type LockerType = {
    floor: number;
    setFloor: (f: number) => void;
    height: number;
    setHeight: (h: number) => void;
    isSelected: boolean;
    setIsSelected: (s: boolean) => void;
    cancle: () => void;
}
