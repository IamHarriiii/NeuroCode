// 📁 src/components/Footer.jsx
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-12 px-6 border-t mt-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <h3 className="font-bold text-xl text-gray-800">NeuroCode</h3>
                    <p className="text-gray-600 mt-2">Revolutionizing software development with AI</p>
                </div>
                <div className="text-center md:text-right">
                    <h4 className="font-semibold text-gray-700">Quick Links</h4>
                    <ul className="mt-2 space-y-2 text-sm text-gray-600">
                        <li><a href="/editor" className="hover:text-blue-600">Launch Editor</a></li>
                        <li><a href="#" className="hover:text-blue-600">Documentation</a></li>
                        <li><a href="#" className="hover:text-blue-600">GitHub</a></li>
                        <li><a href="#" className="hover:text-blue-600">Contact Us</a></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-8 pt-6 border-t text-center text-gray-500 text-sm">
                © 2025 NeuroCode. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;