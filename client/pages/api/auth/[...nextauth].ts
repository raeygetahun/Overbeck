import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, getNameByEmail, getAdminMemberByEmail } from "../../../app/utils/Firebase/config";

export const authOptions = {
  // Configure one or more authentication providers
  pages: {
    signIn: '/signin'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials): Promise<any> {
        try {

          if ((credentials as any).email === "demo@volunteer.com" && (credentials as any).password === "demo") {
            return { email: "demo@volunteer.com", role: "volunteer", name:"John Doe" };
          }
          if ((credentials as any).email === "demo@admin.com" && (credentials as any).password === "demo") {
            return { email: "demo@admin.com", role: "admin", image:'admin', name:"John Admin"};
          }
          const userCredential = await signInWithEmailAndPassword(auth, (credentials as any).email || '', (credentials as any).password || '');
          const isAdmin = await getAdminMemberByEmail(userCredential.user.email)
          const name = await getNameByEmail(userCredential.user.email, isAdmin);
          if (userCredential.user) {
            return { ...userCredential.user, name: name, image: isAdmin };
          }
          return null;
        } catch (error) {
          throw new Error('Incorrect email or password');
        }
      }
    })
  ],
};

export default NextAuth(authOptions);