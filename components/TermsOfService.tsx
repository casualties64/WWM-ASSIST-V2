
import React from 'react';
import { Scale, AlertTriangle, FileText } from 'lucide-react';

export const TermsOfService: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto w-full p-6 pb-24 space-y-8 animate-in fade-in duration-500 text-stone-300">
      
      <div className="border-b border-stone-700 pb-4">
        <h1 className="text-3xl font-bold text-amber-500 mb-2 flex items-center gap-3">
          <Scale size={32} /> Terms of Service
        </h1>
        <p className="text-sm text-stone-500">Last Updated: December 2025</p>
      </div>

      <section className="bg-stone-800/50 border border-amber-600/30 p-4 rounded-lg">
        <h2 className="text-lg font-bold text-amber-500 mb-2 flex items-center gap-2">
            <AlertTriangle size={20} /> Unofficial Companion App Disclaimer
        </h2>
        <p className="text-white text-sm">
            <strong>WWM Assist</strong> is an unofficial fan-made project. We are NOT affiliated with, endorsed by, sponsored by, or specifically approved by 
            <strong> Everstone Studio</strong>, <strong>NetEase Games</strong>, or their affiliates. "Where Winds Meet" and all associated intellectual property 
            are trademarks or registered trademarks of their respective owners.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-stone-100">1. Acceptance of Terms</h2>
        <p>
          By accessing or using WWM Assist (the "Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the Service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-stone-100">2. License to Use</h2>
        <p>
          Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for your personal, non-commercial use.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-stone-100">3. Prohibited Conduct</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-5 space-y-1 text-stone-400">
          <li>Use the Service for any illegal purpose or in violation of any local, state, national, or international law.</li>
          <li>Violate or encourage others to violate any right of a third party, including by infringing or misappropriating any third-party intellectual property right.</li>
          <li>Interfere with security-related features of the Service.</li>
          <li>Reverse engineer or attempt to extract the source code of the Service, except to the extent allowed by applicable law.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-stone-100 flex items-center gap-2">
            <FileText size={20} className="text-blue-400" /> 4. Intellectual Property
        </h2>
        <p>
            <strong>Service Content:</strong> The unique code, design, and structure of this companion app are owned by the creator of WWM Assist.
        </p>
        <p>
            <strong>Game Content:</strong> Images, names, lore, and assets related to "Where Winds Meet" displayed within this app are used under Fair Use principles for educational and informational purposes. All rights to these assets remain with the original creators.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-stone-100">5. AI and Analysis Disclaimer</h2>
        <p>
          The Service includes AI-powered features, including a Xiangqi (Chinese Chess) engine and guide generation. 
          You acknowledge that:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-stone-400">
            <li>AI analysis may not always be 100% accurate or optimal.</li>
            <li>We are not responsible for any in-game losses or outcomes resulting from reliance on the App's advice.</li>
            <li>The "Stockfish" or "Pikafish" engines are open-source projects used here under the GPL license.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-stone-100">6. Third-Party Links and Tools</h2>
        <p>
          The Service may contain links to third-party websites (e.g., MapGenie, Discord) that are not owned or controlled by us. 
          We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-stone-100">7. Disclaimer of Warranties</h2>
        <p className="uppercase text-sm font-bold text-stone-400">
          The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-stone-100">8. Limitation of Liability</h2>
        <p>
          In no event shall the creators of WWM Assist be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-stone-100">9. Changes</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
        </p>
      </section>

    </div>
  );
};
