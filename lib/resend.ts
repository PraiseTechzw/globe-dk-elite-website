import { Resend } from "resend"

const resendApiKey =
  process.env.RESEND_API_KEY || "placeholder_re_key"

export const resend = new Resend(resendApiKey)