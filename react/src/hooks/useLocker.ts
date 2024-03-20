import { useState, useMemo } from "react";

export default function useLocker() {
    const [floor, setFloor] = useState<number|null>(null);
    const [height, setHeight] = useState<number|null>(null);

    return useMemo(() => ({floor, setFloor, height, setHeight}), [floor, setFloor, height, setHeight]);
}
