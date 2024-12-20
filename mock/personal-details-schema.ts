import { z } from "zod";

const PersonalDetailsSchema = z.object({
  id: z.number().int(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export default PersonalDetailsSchema;
