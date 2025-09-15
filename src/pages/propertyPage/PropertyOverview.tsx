import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Phone,
  Heart,
  Share2,
  Clock,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import heroBG from "../../assets/heroBG.jpg";
import heroBG2 from "../../assets/property.jpg";
import heroBG3 from "../../assets/mission1.webp";
import heroBG4 from "../../assets/mission2.webp";
import heroBG5 from "../../assets/banner.jpg";
import heroBG6 from "../../assets/AboutHero.webp";
import heroBG7 from "../../assets/contactHandshake.webp";
import heroBG8 from "../../assets/Frame 2147223900-1.webp";
import heroBG9 from "../../assets/Frame 2147223900-2.webp";
import heroBG10 from "../../assets/Frame 2147223900.webp";

// Dummy data structure
const propertyData = {
  id: 1,
  price: 160000000,
  title: "Osapa Island, Off Freedom way, Lekki phase 1, Lagos",
  propertyType: "Apartment",
  bedrooms: 3,
  bathrooms: 3,
  size: "255 Sq. mtr",
  postedDate: "2 weeks ago",
  forSale: true,
  images: [
    heroBG,
    heroBG2,
    heroBG3,
    heroBG4,
    heroBG5,
    heroBG6,
    heroBG7,
    heroBG8,
    heroBG9,
    heroBG10,
  ],
  description: `It is a luxury residential flat that a resident will be distinguished by the inevitable corner of a 4-page when booked at the peak. The peak of urbane, upper square, is that is has a metro-oldaas, central distribution and reflects in its approach to using "Current from, current, from" nothing is took few unmistable Propety. Many standing publishing spectators and wide place editions "turn told calotte" below as their reflected, face and is a space for its own "corner" with successive sharp reed sales, just in their industry. Vintage, wennings have evolved over the years, personnalized by occasion, sommeliers on purpose invested control and low risk.`,
  trademarks: {
    bedrooms: 3,
    bathrooms: 3,
    spaciousLivingRoom: true,
    fullyFittedKitchen: true,
    masterEnSuiteWithDressingRoom: true,
    floorToCeilingWindows: true,
    parkingSpaces: 2,
    totalArea: "255 sq. ft",
  },
  amenities: [
    "Water Fountain",
    "Laundry/Dry Cleaning",
    "Steam and Sauna",
    "Security",
    "Lakefront View",
    "Supermarket Nearby",
    "Waterfront",
    "Restaurant/Eateries Nearby",
    "Waterfront",
    "Jogging Tracks",
    "Luxury and High-end Finishing",
    "Lobby in Building",
    "Community Center",
    "Shared Pool",
    "Fire Coffee",
    "Restaurants",
    "Stable Power Supply System",
    "Shared Building",
    "Concierge Service",
    "Shared Spa",
    "Medical Center",
    "Shared Gym",
    "CCTV Coverage",
    "Children Play Area",
  ],
  propertyIntelligence: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  location: {
    address: "16th Avenue Tiled Steps",
    lat: 6.4474,
    lng: 3.4553,
  },
  nearbyPlaces: [
    {
      name: "Restaurant Hermits",
      type: "Restaurant",
      rating: 3.5,
      distance: "0.2 km",
    },
    {
      name: "Restaurant Hermits",
      type: "Restaurant",
      rating: 3.5,
      distance: "0.3 km",
    },
    {
      name: "Restaurant Hermits",
      type: "Restaurant",
      rating: 4.0,
      distance: "0.4 km",
    },
    {
      name: "Restaurant Hermits",
      type: "Restaurant",
      rating: 3.5,
      distance: "0.5 km",
    },
    {
      name: "Restaurant Hermits",
      type: "Restaurant",
      rating: 4.0,
      distance: "0.6 km",
    },
    {
      name: "Restaurant Hermits",
      type: "Restaurant",
      rating: 4.5,
      distance: "0.7 km",
    },
  ],
  mortgage: {
    purchasePrice: 160000000,
    downPayment: 20000000,
    loanDuration: 25,
    interestRate: 7.5,
    monthlyPayment: 2050039,
  },
};

const PropertyListing = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryImageIndex, setGalleryImageIndex] = useState(0);
  const [showAllThumbnails, setShowAllThumbnails] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    description: true,
    trademarks: true,
    amenities: false,
    intelligence: false,
    map: false,
    nearby: false,
    affordability: false,
  });

  const [isSticky, setIsSticky] = useState(true);
  const stickyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current && stickyRef.current) {
        const contentRect = contentRef.current.getBoundingClientRect();
        const stickyRect = stickyRef.current.getBoundingClientRect();

        console.log(contentRect, stickyRect);

        // Remove sticky behavior when reaching the end of content
        if (contentRect.bottom <= stickyRect.bottom) {
          setIsSticky(false);
        } else {
          setIsSticky(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation for gallery
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isGalleryOpen) return;

      switch (event.key) {
        case "Escape":
          closeGallery();
          break;
        case "ArrowLeft":
          prevImage();
          break;
        case "ArrowRight":
          nextImage();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isGalleryOpen]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  const openGallery = () => {
    setGalleryImageIndex(activeImage);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const nextImage = () => {
    setGalleryImageIndex((prev) =>
      prev === propertyData.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setGalleryImageIndex((prev) =>
      prev === 0 ? propertyData.images.length - 1 : prev - 1
    );
  };

  const selectGalleryImage = (index: number) => {
    setGalleryImageIndex(index);
  };

  const toggleShowAllThumbnails = () => {
    setShowAllThumbnails(!showAllThumbnails);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const CollapsibleSection = ({
    title,
    isExpanded,
    onToggle,
    children,
  }: {
    title: string;
    isExpanded: boolean;
    onToggle: () => void;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left"
      >
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
      {isExpanded && <div className="mt-4">{children}</div>}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2" ref={contentRef}>
          {/* Image Gallery */}
          <div className="mb-8">
            <div className="relative">
              <img
                src={propertyData.images[activeImage]}
                alt="Property main view"
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded text-sm font-medium">
                For Sale
              </div>

              <button
                onClick={openGallery}
                className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded text-sm hover:bg-opacity-80 transition-all duration-200"
              >
                Show {propertyData.images.length} photos
              </button>
            </div>
            <div className="mt-4">
              <div className="flex gap-2 sm:gap-4 flex-wrap">
                {(showAllThumbnails
                  ? propertyData.images
                  : propertyData.images.slice(0, 2)
                ).map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Property view ${index + 1}`}
                    className={`w-20 h-16 sm:w-24 sm:h-20 object-cover rounded cursor-pointer border-2 transition-all duration-200 ${
                      activeImage === index
                        ? "border-gray_text2 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setActiveImage(index)}
                  />
                ))}
              </div>

              {!showAllThumbnails && propertyData.images.length > 2 && (
                <button
                  onClick={toggleShowAllThumbnails}
                  className="mt-3 text-sm text-gray_text2  font-medium transition-colors duration-200"
                >
                  Show {propertyData.images.length - 2} more photos
                </button>
              )}

              {showAllThumbnails && propertyData.images.length > 2 && (
                <button
                  onClick={toggleShowAllThumbnails}
                  className="mt-3 text-sm text-gray-600 hover:text-gray-700 font-medium transition-colors duration-200"
                >
                  Show less
                </button>
              )}
            </div>
          </div>

          {/* Property Info */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {formatPrice(propertyData.price)}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className=" bg-accent text-white px-3 py-1 rounded text-sm font-medium">
                  For Sale
                </div>
                <div className="items-center flex gap-2">
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
                    <Heart color="red" className="w-5 h-5" />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="size-3" />
                <span>{propertyData.title}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="size-3" />2 weeks ago
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center flex items-center gap-2">
                <div className="text-sm text-gray-600">Property Type</div>
                <div className="font-semibold">{propertyData.propertyType}</div>
              </div>
              <div className="text-center flex items-center gap-2">
                <div className="text-sm text-gray-600">Bedrooms</div>
                <div className="font-semibold flex items-center justify-center gap-1">
                  <Bed className="w-4 h-4" />
                  {propertyData.bedrooms}
                </div>
              </div>
              <div className="text-center flex items-center gap-2">
                <div className="text-sm text-gray-600">Bathrooms</div>
                <div className="font-semibold flex items-center justify-center gap-1">
                  <Bath className="w-4 h-4" />
                  {propertyData.bathrooms}
                </div>
              </div>
              <div className="text-center flex items-center gap-2">
                <div className="text-sm text-gray-600">Property Size</div>
                <div className="font-semibold flex items-center justify-center gap-1">
                  <Maximize className="w-4 h-4" />
                  {propertyData.size}
                </div>
              </div>
            </div>
          </div>

          {/* Collapsible Sections */}
          <div className="space-y-0">
            <CollapsibleSection
              title="Description"
              isExpanded={expandedSections.description}
              onToggle={() => toggleSection("description")}
            >
              <p className="text-gray-700 leading-relaxed">
                {propertyData.description}
              </p>
            </CollapsibleSection>

            <CollapsibleSection
              title="Property Trademarks"
              isExpanded={expandedSections.trademarks}
              onToggle={() => toggleSection("trademarks")}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2">
                  <li>• Bedrooms: {propertyData.trademarks.bedrooms}</li>
                  <li>• Bathrooms: {propertyData.trademarks.bathrooms}</li>
                  <li>• Spacious Living Room</li>
                  <li>• Fully Fitted Kitchen</li>
                  <li>• Master En-Suite with Dressing Room</li>
                </ul>
                <ul className="space-y-2">
                  <li>• Floor to Ceiling Windows</li>
                  <li>
                    • Parking Spaces: {propertyData.trademarks.parkingSpaces}
                  </li>
                  <li>• Total Area: {propertyData.trademarks.totalArea}</li>
                </ul>
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Amenities and Features"
              isExpanded={expandedSections.amenities}
              onToggle={() => toggleSection("amenities")}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {propertyData.amenities.map((amenity, index) => (
                  <div key={index} className="text-sm py-1">
                    • {amenity}
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Property Intelligence Report"
              isExpanded={expandedSections.intelligence}
              onToggle={() => toggleSection("intelligence")}
            >
              <p className="text-gray-700 leading-relaxed mb-4">
                {propertyData.propertyIntelligence}
              </p>
              <button className="text-accent  font-medium">
                View Full Report →
              </button>
            </CollapsibleSection>

            <CollapsibleSection
              title="Neighbourhood Map"
              isExpanded={expandedSections.map}
              onToggle={() => toggleSection("map")}
            >
              <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Interactive Map Component</p>
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="See what's Nearby"
              isExpanded={expandedSections.nearby}
              onToggle={() => toggleSection("nearby")}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {propertyData.nearbyPlaces.map((place, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-300 rounded"></div>
                      <div>
                        <div className="font-medium">{place.name}</div>
                        <div className="text-sm text-gray-600">
                          {place.type}
                        </div>
                        <div className="text-sm text-yellow-600">
                          ★ {place.rating}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {place.distance}
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Can you afford this property?"
              isExpanded={expandedSections.affordability}
              onToggle={() => toggleSection("affordability")}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purchase Price
                    </label>
                    <div className="text-lg font-semibold">
                      {formatPrice(propertyData.mortgage.purchasePrice)}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Duration (Years)
                    </label>
                    <input
                      type="number"
                      defaultValue={propertyData.mortgage.loanDuration}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Down payment
                    </label>
                    <div className="text-lg font-semibold">
                      {formatPrice(propertyData.mortgage.downPayment)}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest Rate
                    </label>
                    <div className="text-lg font-semibold">
                      {propertyData.mortgage.interestRate}%
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-1">
                    Monthly payment
                  </div>
                  <div className="text-2xl font-bold text-gray_text2">
                    {formatPrice(propertyData.mortgage.monthlyPayment)}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">2.75%</div>
                </div>
              </div>
              <button className="w-full mt-4 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-900">
                Get Results
              </button>
            </CollapsibleSection>
          </div>
        </div>

        {/* Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div
            ref={stickyRef}
            className={`bg-white border border-gray-200 rounded-lg p-6 ${
              isSticky ? "lg:sticky lg:top-8" : ""
            }`}
          >
            <h3 className="text-lg font-semibold mb-4">
              Interested in this Property?
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Simply select how you'd like to be contacted and we'll be in touch
              within 24 hours.
            </p>

            <div className="space-y-4">
              <button className="w-full bg-accent text-white py-3 px-4 rounded-lg  font-medium">
                Request a Tour
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 font-medium flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Chat With Us
              </button>
            
            </div>

           
          </div>
        </div>
      </div>

      {/* Photo Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full max-w-7xl max-h-full p-4">
            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <div className="flex items-center justify-center h-full">
              <img
                src={propertyData.images[galleryImageIndex]}
                alt={`Property view ${galleryImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
              {galleryImageIndex + 1} of {propertyData.images.length}
            </div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto pb-2">
              {propertyData.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 h-12 object-cover rounded cursor-pointer border-2 transition-all duration-200 ${
                    galleryImageIndex === index
                      ? "border-white"
                      : "border-transparent hover:border-gray-400"
                  }`}
                  onClick={() => selectGalleryImage(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyListing;
