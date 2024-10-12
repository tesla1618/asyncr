import { Heart, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-6 text-center flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold mb-4">
          Contribute to the Project
        </h3>
        <p className="text-gray-400">
          Help me improve the platform by contributing on GitHub.
        </p>
        <a
          href="https://github.com/tesla1618/asyncr"
          className="px-6 py-3 my-3 bg-white text-gray-900 rounded-full sm:w-1/4 font-bold hover:bg-gray-200 transition duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="inline-block mr-2" />
          Contribute on GitHub
        </a>

        <p className="text-gray-400 flex items-center justify-center space-x-2">
          <span>Coded with</span>
          <Heart className="text-red-500 w-5 h-5" />
          <span>by Tesla1618</span>
        </p>
      </div>
    </footer>
  );
}
