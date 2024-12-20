import { z } from "zod";

const PersonalDetailsSchema = z.object({
  id: z.number().int(),
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export default PersonalDetailsSchema;
