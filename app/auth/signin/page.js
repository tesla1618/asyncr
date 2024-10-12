"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setError("Invalid email or password");
      } else {
        router.push("/projects");
      }
    } catch (error) {
      setError("An error occurred. Please try again.", error);
    }
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Sign in to manage your projects" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-400 via-purple-500 to-indigo-600 px-6 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Welcome Back!
            </h2>
            <p className="text-gray-500 mt-2">
              Sign in to continue managing your projects
            </p>
          </div>
          <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                className="w-full py-3 text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <Link
              href="/auth/register"
              className="text-purple-600 hover:text-purple-500 font-semibold transition"
            >
              Dont have an account? Sign up here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
