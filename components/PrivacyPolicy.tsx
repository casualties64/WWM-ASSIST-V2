
import React from 'react';
import { Shield, Lock, Eye } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto w-full p-6 pb-24 space-y-8 animate-in fade-in duration-500 text-stone-300">
      
      <div className="border-b border-stone-700 pb-4">
        <h1 className="text-3xl font-bold text-amber-500 mb-2 flex items-center gap-3">
          <Shield size={32} /> Privacy Policy
        </h1>
        <p className="text-sm text-stone-500">Last Updated: December 2025</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-stone-100">1. Introduction</h2>
        <p>
          Welcome to WWM Assist ("we," "our," or "us"). We are committed to protecting your privacy. 
          This Privacy Policy explains how we collect, use, and share your personal information when you use our web application 
          and related services (collectively, the "Service").
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-stone-100 flex items-center gap-2">
          <Eye size={20} className="text-blue-400" /> 2. Information We Collect
        </h2>
        <div className="bg-stone-900/50 p-4 rounded border border-stone-800 space-y-4">
          <div>
            <strong className="text-white block mb-1">A. Information from Third-Party Platforms (Discord)</strong>
            <p className="text-sm">
              If you access our Service through Discord Activities, we access basic profile information provided by the Discord Embedded App SDK, specifically:
            </p>
            <ul className="list-disc pl-5 mt-1 text-sm text-stone-400">
              <li>User ID</li>
              <li>Username and Discriminator</li>
              <li>Avatar URL</li>
              <li>Global Name</li>
            </ul>
            <p className="text-xs mt-2 text-stone-500">
              This data is used solely to display your profile within the app interface. We do not store this data on external servers; it exists only within the session of your client.
            </p>
          </div>

          <div>
            <strong className="text-white block mb-1">B. Usage Data</strong>
            <p className="text-sm">
              We may collect information on how you interact with the Service, such as the Xiangqi moves analyzed, pages visited, and preferences set (like board setup). This data is processed locally on your device or ephemerally.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-stone-100">3. How We Use Your Information</h2>
        <ul className="list-disc pl-5 space-y-2 text-stone-400">
          <li>To provide, maintain, and improve the Service.</li>
          <li>To generate chess analysis using the integrated engine.</li>
          <li>To display your Discord avatar and name for a personalized experience.</li>
          <li>To detect, prevent, and address technical issues.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-stone-100 flex items-center gap-2">
          <Lock size={20} className="text-amber-500" /> 4. Third-Party Services
        </h2>
        <p>We utilize third-party services to function. These providers have their own privacy policies:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <div className="bg-stone-800 p-3 rounded">
                <strong className="block text-white">Google Gemini API</strong>
                <p className="text-xs mt-1">Used for natural language processing or advanced analysis. Data sent to Google is subject to Google's Privacy Policy.</p>
            </div>
            <div className="bg-stone-800 p-3 rounded">
                <strong className="block text-white">MapGenie</strong>
                <p className="text-xs mt-1">The interactive map is embedded from MapGenie.io. They may collect cookies and usage data independently.</p>
            </div>
            <div className="bg-stone-800 p-3 rounded">
                <strong className="block text-white">Vercel / GitHub Pages</strong>
                <p className="text-xs mt-1">Our hosting providers may collect server logs including IP addresses for security and performance monitoring.</p>
            </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-stone-100">5. Data Retention</h2>
        <p>
          The Service is primarily client-side. We do not maintain a backend database of user profiles. 
          Your settings and preferences are stored in your browser's Local Storage. 
          You can clear this data at any time by clearing your browser cache.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-stone-100">6. Children's Privacy</h2>
        <p>
          Our Service is not directed to anyone under the age of 13. We do not knowingly collect personal identifiable information from children under 13.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-stone-100">7. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-stone-100">8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact the developer via the official community channels or GitHub repository.
        </p>
      </section>

    </div>
  );
};
