import { auth, signOut } from "@/auth";

async function fetchPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

export default async function Home() {
    const session = await auth();
    const user = session?.user;
    const posts = await fetchPosts();

    return (
        <main className="min-h-screen bg-gray-100">
            {/* Header Section */}
            <div className="sticky top-0 bg-white shadow-sm border-b border-gray-200 z-10">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Posts Feed
                        </h1>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <div className="text-sm text-gray-600">
                                    Welcome, <span className="font-medium">{user.name || "User"}</span>
                                </div>
                                <form
                                    action={async () => {
                                        "use server";
                                        await signOut({ redirectTo: "/signin" });
                                    }}
                                >
                                    <button
                                        type="submit"
                                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                                    >
                                        Sign out
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="text-sm text-gray-600">
                                Please sign in to continue
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Posts Content */}
            <div className="max-w-4xl mx-auto px-4 py-6">
                {user ? (
                    <>
                        {/* User Info Card */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Your Account
                            </h2>
                            <p className="text-gray-600">
                                Logged in as <strong>{user.email || "unknown email"}</strong>
                            </p>
                        </div>

                        {/* Posts List */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Latest Posts ({posts.length})
                            </h2>

                            {posts.length > 0 ? (
                                <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                                    {posts.map((post: any) => (
                                        <article
                                            key={post.id}
                                            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        Post #{post.id}
                                                    </span>
                                                    <span className="text-sm text-gray-500">
                                                        User {post.userId}
                                                    </span>
                                                </div>
                                            </div>

                                            <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                                                {post.title}
                                            </h3>

                                            <p className="text-gray-700 leading-relaxed">
                                                {post.body}
                                            </p>
                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-gray-500">
                                        <svg
                                            className="mx-auto h-12 w-12 text-gray-400 mb-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                        <p className="text-lg font-medium text-gray-900 mb-2">
                                            No posts available
                                        </p>
                                        <p className="text-gray-600">
                                            Unable to load posts at this time.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md text-center">
                            <h2 className="text-2xl font-semibold mb-4">
                                Welcome to the App
                            </h2>
                            <p className="text-gray-600 mb-6">
                                Please sign in to view posts and access all features.
                            </p>
                            <div className="text-sm text-gray-500">
                                Sign in to continue
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}