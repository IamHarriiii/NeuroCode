import React, {useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal"; // Fix the import here

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(location.state?.showAuth || false);

  const handleEditorClick = () => {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    token ? navigate("/editor") : setShowAuthModal(true);
  };

  return (
    <div className="p-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-lg shadow-lg mb-6 text-white">
        <h1 className="text-3xl font-bold mb-2">NeuroCode Playground</h1>
        <p className="text-white opacity-90">
          Advanced code analysis powered by AI.
          Sign in to access the full editor.
        </p>
        {/* Button - centered below hero text */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleEditorClick}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-md"
          >
            🚀 Launch Code Editor
          </button>
        </div>
      </div>

      {/* Feature Preview (Optional) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        {/* ... feature cards ... */}
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onLogin={() => navigate("/editor")}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
};

export default Home;