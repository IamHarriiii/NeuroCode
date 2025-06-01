// 📁 src/components/Footer.jsx
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 py-12 px-6 border-t mt-auto dark:border-gray-700">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                {/* Brand Section */}
                <div className="text-center md:text-left">
                    <h3 className="font-bold text-xl text-gray-800 dark:text-gray-200">NeuroCode</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">Revolutionizing software development with AI</p>
                </div>

                {/* Quick Links */}
                <div className="text-center md:text-right">
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">Quick Links</h4>
                    <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li>
                            <a href="/editor" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                Launch Editor
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                Documentation
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-7xl mx-auto mt-8 pt-6 border-t text-center text-gray-500 text-sm dark:border-gray-700 dark:text-gray-400">
                © {new Date().getFullYear()} NeuroCode. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;