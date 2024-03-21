/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_KAKAO_CLIENT_ID: string
    readonly VITE_KAKAO_ID: string
    readonly VITE_START_DATE: string
    readonly VITE_DEAD_LINE: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
