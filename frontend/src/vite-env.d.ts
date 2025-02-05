/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LOGIN_URI: string
  readonly VITE_CLIENT_ID: string
  readonly VITE_CLIENT_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
