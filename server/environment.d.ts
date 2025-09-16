declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_CONNECT_STRING: string;
    EMAIL_PASS: string;
    EMAIL_USER: string;
    FRONTEND_ENDPOINT: string;
  }
}
