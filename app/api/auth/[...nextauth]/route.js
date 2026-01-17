import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/db";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { name, email } = user;
        try {
          await dbConnect();
        
          const userExists = await User.findOne({ email });

          if (!userExists) {
            await User.create({
              name: name,
              email: email,
              password: "google-login-no-pass",
            });
          }
          
          return true; 
        } catch (error) {
          console.log("Error checking if user exists: ", error);
          return false; 
        }
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };