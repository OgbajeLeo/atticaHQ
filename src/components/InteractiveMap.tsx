import React, { useState, useEffect, useRef } from 'react';

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
  onLocationChange?: (location: Location) => void;
  searchQuery?: string;
  onSearchResults?: (results: any[]) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  propertyLocation,
  nearbyPlaces = [],
  height = '400px',
  onLocationChange,
  searchQuery = '',
  onSearchResults
}) => {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const mapRef = useRef<HTMLIFrameElement>(null);

  // Get user's current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by this browser.');
      return;
    }

    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          address: 'Current Location'
        };
        setUserLocation(location);
        setIsLoadingLocation(false);
        if (onLocationChange) {
          onLocationChange(location);
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };


  // Search for places using Nominatim
  const searchPlaces = async (query: string) => {
    if (!query.trim()) return;
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`
      );
      const data = await response.json();
      
      if (onSearchResults) {
        onSearchResults(data);
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  // Effect to handle search query changes
  useEffect(() => {
    if (searchQuery) {
      searchPlaces(searchQuery);
    }
  }, [searchQuery]);


  // Create a more interactive map using OpenStreetMap with custom markers
  const createInteractiveMapUrl = () => {
    const { lat, lng } = propertyLocation;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.005},${lat-0.005},${lng+0.005},${lat+0.005}&layer=mapnik&marker=${lat},${lng}`;
  };

  return (
    <div style={{ height, width: '100%' }} className="rounded-lg overflow-hidden border border-gray-200 relative">
      {/* Interactive Map using OpenStreetMap */}
      <iframe
        ref={mapRef}
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        marginHeight={0}
        marginWidth={0}
        src={createInteractiveMapUrl()}
        title="Property Location Map"
        className="rounded-lg"
        onLoad={() => {}}
      />
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 flex gap-2">
        <button 
          onClick={getCurrentLocation}
          disabled={isLoadingLocation}
          className="px-3 py-2 bg-white rounded-lg text-sm font-medium shadow-lg hover:bg-gray-50 disabled:opacity-50 flex items-center gap-2"
        >
          {isLoadingLocation ? (
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
          {isLoadingLocation ? 'Getting Location...' : 'Use My Location'}
        </button>
      </div>

      {/* Map Type Controls */}
      <div className="absolute top-4 right-4 flex gap-2">
        <button className="px-3 py-2 bg-white rounded-lg text-sm font-medium shadow-lg hover:bg-gray-50">
          Map
        </button>
        <button className="px-3 py-2 bg-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-300">
          Satellite
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1">
        <button className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
          </svg>
        </button>
      </div>
      
      {/* Location Info */}
      <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 p-3 rounded-lg shadow-lg max-w-xs">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">🏠</span>
          </div>
          <span className="text-sm font-medium">Property Location</span>
        </div>
        <div className="text-xs text-gray-600">
          {propertyLocation.address || `${propertyLocation.lat.toFixed(4)}, ${propertyLocation.lng.toFixed(4)}`}
        </div>
        {userLocation && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Your Location</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
            </div>
          </div>
        )}
      </div>

      {/* Nearby Places Info */}
      {nearbyPlaces.length > 0 && (
        <div className="absolute top-16 right-4 bg-white bg-opacity-95 p-3 rounded-lg shadow-lg max-w-xs">
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
