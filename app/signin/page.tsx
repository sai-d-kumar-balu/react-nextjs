import { redirect } from "next/navigation";
import { AuthError } from "next-auth";
import { auth, providerMap, signIn } from "@/auth";
import { Mail, Lock } from "lucide-react";

const SIGNIN_ERROR_URL = "/error";

interface SignInSearchParams {
    callbackUrl?: string;
}

export default async function SignInPage({
    searchParams,
}: {
    searchParams: Promise<SignInSearchParams>;
}) {
    const session = await auth();
    if (session) {
        redirect("/home");
    }
    const { callbackUrl = "" } = await searchParams;
    const redirectTo = callbackUrl.startsWith("/") ? callbackUrl : "/home";

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Main card */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
                        <p className="text-gray-300">Sign in to your account to continue</p>
                    </div>

                    {/* Credentials Form */}
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
                        className="space-y-6 mb-6"
                    >
                        <input type="hidden" name="redirectTo" value={redirectTo} />

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-200">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    name="email"
                                    id="email"
                                    type="email"
                                    required
                                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-200">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    name="password"
                                    id="password"
                                    type="password"
                                    required
                                    className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transform transition-all duration-200 hover:scale-105 shadow-lg"
                        >
                            Sign in
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-transparent text-gray-400">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Providers */}
                    <div className="space-y-3">
                        {Object.values(providerMap).map((provider) => {
                            // Get provider-specific styling
                            const getProviderStyles = (providerId: string) => {
                                switch (providerId.toLowerCase()) {
                                    case 'google':
                                        return {
                                            bg: 'bg-white hover:bg-gray-50',
                                            text: 'text-gray-900',
                                            border: 'border-gray-200'
                                        };
                                    case 'github':
                                        return {
                                            bg: 'bg-gray-900 hover:bg-gray-800',
                                            text: 'text-white',
                                            border: 'border-gray-700'
                                        };
                                    case 'discord':
                                        return {
                                            bg: 'bg-indigo-600 hover:bg-indigo-700',
                                            text: 'text-white',
                                            border: 'border-indigo-500'
                                        };
                                    default:
                                        return {
                                            bg: 'bg-white/5 hover:bg-white/10',
                                            text: 'text-white',
                                            border: 'border-white/10'
                                        };
                                }
                            };

                            const styles = getProviderStyles(provider.id);

                            return (
                                <form
                                    key={provider.id}
                                    action={async () => {
                                        "use server";
                                        try {
                                            await signIn(provider.id, { redirectTo });
                                        } catch (error) {
                                            if (error instanceof AuthError) {
                                                redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
                                            }
                                            throw error;
                                        }
                                    }}
                                >
                                    <button
                                        type="submit"
                                        className={`w-full ${styles.bg} ${styles.text} border ${styles.border} font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transform transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center space-x-2`}
                                    >
                                        <span>Sign in with {provider.name}</span>
                                    </button>
                                </form>
                            );
                        })}
                    </div>

                    {/* Footer links */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-400">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>

                {/* Additional decorative elements */}
                <div className="absolute -top-2 -left-2 w-full h-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl -z-10"></div>
            </div>
        </div>
    );
}