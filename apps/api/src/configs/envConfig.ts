import dotenv from "dotenv";

dotenv.config();

export function fromEnv(key: string) {
  return process.env[key] || "";
}

export default {
  PORT: process.env.PORT,
  CLIENT_DOMAIN: process.env.CLIENT_DOMAIN,
};
