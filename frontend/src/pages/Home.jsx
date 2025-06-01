// 📁 src/pages/Home.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthModal from "../components/AuthModal";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = useState(location.state?.showAuth || false);

  const handleEditorClick = () => {
    const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
    if (token) {
      navigate("/editor");
    } else {
      setShowAuthModal(true);
    }
  };

  // Feature cards
  const features = [
    {
      icon: "🔮",
      title: "Proactive Bug Prediction",
      description: "AI-powered bug detection that identifies issues before they occur.",
      highlight: "WizardCoder 7B Model"
    },
    {
      icon: "⚡",
      title: "Code Optimization",
      description: "Performance-centric enhancements for runtime, memory usage, and code readability.",
      highlight: "Smart Performance Tuning"
    },
    {
      icon: "🛠️",
      title: "Step-by-Step Debugging",
      description: "Actionable guidance to fix bugs with detailed explanations and solutions.",
      highlight: "Interactive Debugging"
    },
    {
      icon: "📝",
      title: "Auto Documentation",
      description: "Generate comprehensive documentation for functions, classes, and methods automatically.",
      highlight: "CodeLlama-Instruct 7B"
    },
    {
      icon: "🤖",
      title: "Developer Chatbot",
      description: "Your AI coding mentor for project insights, code reviews, and technical guidance.",
      highlight: "Context-Aware Assistant"
    },
    {
      icon: "🔄",
      title: "RLHF Learning",
      description: "Continuous model improvement through Reinforcement Learning from Human Feedback.",
      highlight: "Always Evolving"
    }
  ];

  // Stats cards
  const stats = [
    { number: "7B+", label: "Parameters", sublabel: "Advanced AI Models" },
    { number: "5+", label: "Languages", sublabel: "Multi-language Support" },
    { number: "99%", label: "Accuracy", sublabel: "Bug Prediction Rate" },
    { number: "50%", label: "Faster", sublabel: "Debug Resolution" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 opacity-90"></div>

        {/* Background Pattern */}
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVuLW9kZCI+PGcgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTSAzNiA0MCB2LTQgaC0yIHY0IGgtNCB2MiBoNCA2IGg0IHYtNmg0IHYtMiBoLTQgeiBNIDM2IDAgdi00IGgtMiB2NCBoLTQgdiAyIGg0IHY0IGgyIC00djRoNHogTSAtNDAgMzQgdjQtNCBoLTQgdi0yIGg0IHYtNCBoMiB2NGg0IHYyIGgtNHogTSAtNDAgMCB2LTQgaC0yIHY0IGgtNCB2MiBoNHY0aDIgLTR2LTRoLTQgeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20">
        </div>

        {/* Hero Content */}
        <div className="relative px-6 py-16 max-w-7xl mx-auto text-center">
          <div className="text-white mb-12">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium">🧠 AI-Powered Code Analysis Platform</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              NeuroCode Playground
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4 max-w-3xl mx-auto leading-relaxed">
              Revolutionary AI that predicts bugs before they happen, optimizes your code, and accelerates your development workflow
            </p>
            <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">
              Powered by advanced machine learning models and trained on millions of code samples
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={handleEditorClick}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center gap-2"
              >
                🚀 Launch Code Editor
              </button>
              <button
                onClick={() => window.open("https://github.com/yourusername/neurocode", "_blank")}
                className="text-white border-2 border-white/30 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                📄 View Documentation
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-blue-100 font-medium">{stat.label}</div>
                  <div className="text-sm text-blue-200">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Next-Generation Development Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlike traditional static analyzers, NeuroCode provides proactive, intelligent assistance that learns and adapts to your coding patterns
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{feature.description}</p>
              <div className="inline-flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {feature.highlight}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Powered by Advanced AI Models</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Built on cutting-edge machine learning architecture with specialized models for different aspects of code analysis
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* WizardCoder */}
            <div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 cursor-pointer hover:bg-white/20 transition-colors"
              onClick={() => window.open("https://huggingface.co/WizardLMTeam/WizardCoder-33B-V1.1", "_blank")}
            >
              <h3 className="text-2xl font-bold mb-4 text-blue-300">WizardCoder 7B</h3>
              <p className="text-blue-100 mb-4">Primary model for bug prediction, code optimization, and translation</p>
              <div className="text-sm text-blue-200">
                • Bug Prediction & Analysis<br />
                • Performance Optimization<br />
                • Cross-language Translation
              </div>
            </div>

            {/* CodeLlama-Instruct */}
            <div
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 cursor-pointer hover:bg-white/20 transition-colors"
              onClick={() => window.open("https://ollama.com/library/codellama:instruct", "_blank")}
            >
              <h3 className="text-2xl font-bold mb-4 text-purple-300">CodeLlama-Instruct 7B</h3>
              <p className="text-blue-100 mb-4">Specialized for documentation and conversational assistance</p>
              <div className="text-sm text-blue-200">
                • Auto Documentation Generation<br />
                • Developer Chatbot<br />
                • Code Explanation & Mentoring
              </div>
            </div>
          </div>
        </div>
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