/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_KAKAO_CLIENT_ID: string
    readonly VITE_EXECUTE_KAKAO_ID: string
    readonly VITE_FINANCE_KAKAO_ID: string
    readonly VITE_START_DATE: string
    readonly VITE_DEAD_LINE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
