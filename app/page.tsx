import {
  Github,
  CheckCircle,
  Flag,
  ArrowRightCircle,
  Rocket,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Project Tracker</title>
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="description"
          content="Track your projects effortlessly with Project Tracker."
        />
      </Head>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
          <div className="container mx-auto px-6 py-12 text-center">
            <h1 className="text-5xl font-bold mb-4">
              Track Your Projects Effortlessly
            </h1>
            <p className="text-lg mb-8">
              Manage tasks, deadlines, and project progress all in one place.
            </p>
            <Link href="/auth/register">
              <button className="px-6 py-3 bg-white text-purple-600 rounded-full font-bold hover:bg-purple-100 transition duration-300">
                Get Started
                <ArrowRightCircle className="inline-block ml-2" />
              </button>
            </Link>
          </div>
        </header>

        <section className="py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <CheckCircle className="text-green-500 text-6xl mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">Task Management</h3>
                <p className="text-gray-600">
                  Easily create, track, and complete tasks with deadlines and
                  progress tracking.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Flag className="text-red-500 text-6xl mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">Flag Issues</h3>
                <p className="text-gray-600">
                  Mark tasks as problematic and track issues until resolved.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <Rocket className="text-blue-500 text-6xl mb-4 mx-auto" />
                <h3 className="text-xl font-semibold mb-2">
                  Project Completion
                </h3>
                <p className="text-gray-600">
                  Monitor project completion with a progress bar and completion
                  insights.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-8">Monitor Your Progress</h2>
            <p className="text-lg mb-8">
              Stay on top of your projects with real-time tracking and
              deadlines.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-lg inline-block">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Your Project Progress
              </h3>
              <div className="w-full bg-gray-300 rounded-full h-4 mb-4">
                <div
                  className="bg-blue-600 h-4 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <p className="text-gray-600">
                75% completed. Deadline in 10 days.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-100 text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              Start Managing Your Projects Today
            </h2>
            <Link href="/projects">
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-500 transition duration-300">
                View Projects
                <ArrowRightCircle className="inline-block ml-2" />
              </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
