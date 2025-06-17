"use server";

import { auth } from "@/auth";
import { SignInButton } from "@/components/sign-in-button";

export default async function Login() {
  const session = await auth();
  console.log('session: ', session);
  return (
    <div>
      <p>
        You are not signed in <SignInButton />
      </p>
    </div>
  )
}