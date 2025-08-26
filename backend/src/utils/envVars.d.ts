export type EnvVarEntry = string | { name: string; example?: string; required?: boolean; comment?: string };
export declare const ENV_VARS: EnvVarEntry[];
export declare function assertRequiredEnv(): void;
export declare function getEnv(): {
  PORT: string | undefined;
  API_DOMAIN: string | undefined;
  CORS_ORIGINS: string | undefined;
  DATABASE_URL: string | undefined;
};
export declare function generateExampleEnvContent(): string;
export declare function generateExampleEnvFile(targetPath?: string): void;


