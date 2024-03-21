import { useState, useEffect } from "react";
import { requestResult } from "@utils/apis";

export default function useResult() {
    const [data, setData] = useState({ locker: "", password: "", studentId: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    useEffect(() => {
        (async () => {
            try {
                const result = await requestResult();
                setData(result);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);
    return { data, loading, error };
}
