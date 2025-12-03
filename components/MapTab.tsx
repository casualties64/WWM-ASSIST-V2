import React from 'react';

export const MapTab: React.FC = () => {
  // Switched to a cleaner map source with fewer intrusive ads.
  const mapUrl = "https://mapgenie.io/where-winds-meet/maps/world";

  return (
    <div className="w-full h-full flex flex-col bg-stone-950">
      {/* Map Iframe View */}
      <div className="flex-1 relative w-full overflow-hidden bg-stone-900">
        <iframe 
          src={mapUrl}
          className="w-full h-full border-none"
          title="Where Winds Meet Interactive Map"
          // Strict sandbox: Blocks new window pop-ups. In-page ads from the source cannot be blocked.
          sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
        />
      </div>
    </div>
  );
};