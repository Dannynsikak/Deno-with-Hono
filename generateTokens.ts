import { crypto } from "@std/crypto";
import { encodeBase64 } from "@std/encoding";

const apiKey = crypto.getRandomValues(new Uint8Array(16));
console.log(`Generated API_KEY:\`${encodeBase64(apiKey)}`);
