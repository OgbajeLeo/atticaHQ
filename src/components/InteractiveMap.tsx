import React from 'react';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface NearbyPlace {
  name: string;
  description: string;
  rating: number;
  distance: string;
  type: string;
  location: Location;
}

interface InteractiveMapProps {
  propertyLocation: Location;
  nearbyPlaces?: NearbyPlace[];
  height?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  propertyLocation,
  nearbyPlaces = [],
  height = '400px'
}) => {
  // Create OpenStreetMap embed URL
  const createOpenStreetMapUrl = () => {
    const { lat, lng } = propertyLocation;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01},${lat-0.01},${lng+0.01},${lat+0.01}&layer=mapnik&marker=${lat},${lng}`;
  };

  return (
    <div style={{ height, width: '100%' }} className="rounded-lg overflow-hidden border border-gray-200">
      {/* Interactive Map using OpenStreetMap */}
      <iframe
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        src={createOpenStreetMapUrl()}
        title="Property Location Map"
        className="rounded-lg"
      />
      
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">🏠</span>
          </div>
          <span className="text-sm font-medium">Property Location</span>
        </div>
        <div className="text-xs text-gray-600">
          {propertyLocation.address || `${propertyLocation.lat.toFixed(4)}, ${propertyLocation.lng.toFixed(4)}`}
        </div>
      </div>

      {/* Nearby Places Info */}
      {nearbyPlaces.length > 0 && (
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-lg max-w-xs">
          <h4 className="text-sm font-semibold mb-2">Nearby Places</h4>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {nearbyPlaces.slice(0, 5).map((place, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <span className="text-lg">
                  {place.type === 'restaurants' && '🍽️'}
                  {place.type === 'schools' && '🎓'}
                  {place.type === 'banks' && '🏦'}
                  {place.type === 'shopping' && '🛍️'}
                  {place.type === 'worship' && '⛪'}
                  {place.type === 'healthcare' && '🏥'}
                </span>
                <span className="truncate">{place.name}</span>
                <span className="text-gray-500">{place.distance}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
