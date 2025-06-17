// app/signin/page.tsx
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { auth, providerMap, signIn } from "@/auth";

const SIGNIN_ERROR_URL = "/error";

export default async function SignInPage({
    searchParams,
}: {
    searchParams: { callbackUrl?: string };
}) {
    // ✅ Wait for it once, at render time
    const { callbackUrl = "" } = await searchParams;
    const redirectTo =
        callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/home";
    return (
        <div className="flex flex-col gap-2">
            {/* credentials form */}
            <form
                action={async (formData) => {
                    "use server";
                    try {
                        await signIn("credentials", formData);
                    } catch (error) {
                        if (error instanceof AuthError) {
                            redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                        }
                        throw error;
                    }
                }}
            >
                {/* …fields… */}
                <input type="hidden" name="redirectTo" value={redirectTo} />
                <label htmlFor="email">
                    Email
                    <input name="email" id="email" />
                </label>
                <label htmlFor="password">
                    Password
                    <input name="password" id="password" />
                </label>
                <input type="submit" value="Sign In" />
            </form>

            {/* social providers */}
            {Object.values(providerMap).map((provider) => (
                <form
                    key={provider.id}
                    action={async () => {
                        "use server";
                        try {
                            await signIn(provider.id, { redirectTo: callbackUrl });
                        } catch (error) {
                            if (error instanceof AuthError) {
                                redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                            }
                            throw error;
                        }
                    }}
                >
                    <button type="submit">Sign in with {provider.name}</button>
                </form>
            ))}
        </div>
    );
}