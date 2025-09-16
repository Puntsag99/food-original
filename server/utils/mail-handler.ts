import { createTransport } from "nodemailer";
import { configDotenv } from "dotenv";
configDotenv();

const { EMAIL_PASS, EMAIL_USER } = process.env;

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

export const sendUserVerificationLink = async (
  baseURL: string,
  email: string
) => {
  await transporter.sendMail({
    subject: "User Verification Link",
    to: email,
    from: EMAIL_USER,
    html: `
    <div>
      <h1>User Verification Link</h1>
      <p>This verification link is valid for 1 hours </p>
      <a href=${baseURL}> Verify</a>
    </div>
    `,
  });
};
