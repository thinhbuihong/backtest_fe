import pp from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;

pp.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

// pp.serializeUser((user, done) => {
//   console.log("1111");
//   done(null, user); // Lưu toàn bộ object user vào session
// });

// pp.deserializeUser((user, done) => {
//   console.log("222");
//   done(null, user as any); // Lấy lại user từ session và gán cho req.user
// });

export const passport = pp;
