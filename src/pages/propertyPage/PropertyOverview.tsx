import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Heart,
  Share2,
  Clock,
  X,
  ChevronLeft,
  ChevronRight,
  Mail,
  CameraIcon,
  Utensils,
  GraduationCap,
  Building,
  ShoppingBag,
  Church,
  Plus,
  Star,
  ChevronRight as ChevronRightIcon,
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
import SqrMtr from "../../components/iconComponent/SqrMtr";
import BathIcon from "../../components/iconComponent/BathIcon";
import BedIcon from "../../components/iconComponent/BedIcon";
import PropertyIcon from "../../components/iconComponent/PropertyIcon";
import InteractiveMap from "../../components/InteractiveMap";
import ChatIcon from "../../components/iconComponent/ChatIcon";

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
  nearbyPlaces: {
    restaurants: [
      {
        name: "Restaurant Henrik",
        description: "Restaurant Henrik og kompani, Mogouli",
        rating: 3.5,
        distance: "0.2 km",
        image: heroBG,
        location: {
          lat: 6.4484,
          lng: 3.4563,
          address: "Restaurant Henrik, Lekki",
        },
        type: "restaurants",
      },
      {
        name: "Bella Vista",
        description: "Italian cuisine with waterfront view",
        rating: 4.2,
        distance: "0.3 km",
        image: heroBG2,
        location: { lat: 6.4494, lng: 3.4573, address: "Bella Vista, Lekki" },
        type: "restaurants",
      },
      {
        name: "Spice Garden",
        description: "Authentic Indian and Asian fusion",
        rating: 4.0,
        distance: "0.4 km",
        image: heroBG3,
        location: { lat: 6.4504, lng: 3.4583, address: "Spice Garden, Lekki" },
        type: "restaurants",
      },
      {
        name: "Café Central",
        description: "Coffee shop and light meals",
        rating: 3.8,
        distance: "0.5 km",
        image: heroBG4,
        location: { lat: 6.4514, lng: 3.4593, address: "Café Central, Lekki" },
        type: "restaurants",
      },
      {
        name: "Ocean View",
        description: "Seafood restaurant with terrace",
        rating: 4.5,
        distance: "0.6 km",
        image: heroBG5,
        location: { lat: 6.4524, lng: 3.4603, address: "Ocean View, Lekki" },
        type: "restaurants",
      },
      {
        name: "The Garden",
        description: "Farm-to-table organic dining",
        rating: 4.1,
        distance: "0.7 km",
        image: heroBG6,
        location: { lat: 6.4534, lng: 3.4613, address: "The Garden, Lekki" },
        type: "restaurants",
      },
    ],
    schools: [
      {
        name: "Lekki International School",
        description: "Primary and secondary education",
        rating: 4.3,
        distance: "0.8 km",
        image: heroBG7,
        location: {
          lat: 6.4544,
          lng: 3.4623,
          address: "Lekki International School",
        },
        type: "schools",
      },
      {
        name: "Greenfield Academy",
        description: "Montessori and early learning",
        rating: 4.0,
        distance: "1.2 km",
        image: heroBG8,
        location: { lat: 6.4554, lng: 3.4633, address: "Greenfield Academy" },
        type: "schools",
      },
    ],
    banks: [
      {
        name: "First Bank Lekki",
        description: "Full banking services and ATM",
        rating: 3.9,
        distance: "0.3 km",
        image: heroBG9,
        location: { lat: 6.4464, lng: 3.4543, address: "First Bank Lekki" },
        type: "banks",
      },
      {
        name: "GTBank Express",
        description: "Quick banking and transfers",
        rating: 4.1,
        distance: "0.5 km",
        image: heroBG10,
        location: { lat: 6.4454, lng: 3.4533, address: "GTBank Express" },
        type: "banks",
      },
    ],
    shopping: [
      {
        name: "Lekki Mall",
        description: "Shopping center with multiple stores",
        rating: 4.2,
        distance: "1.0 km",
        image: heroBG,
        location: { lat: 6.4564, lng: 3.4643, address: "Lekki Mall" },
        type: "shopping",
      },
      {
        name: "Fresh Market",
        description: "Local produce and groceries",
        rating: 3.7,
        distance: "0.4 km",
        image: heroBG2,
        location: { lat: 6.4444, lng: 3.4523, address: "Fresh Market" },
        type: "shopping",
      },
    ],
    worship: [
      {
        name: "St. Mary's Church",
        description: "Catholic church with daily services",
        rating: 4.4,
        distance: "0.6 km",
        image: heroBG3,
        location: { lat: 6.4434, lng: 3.4513, address: "St. Mary's Church" },
        type: "worship",
      },
      {
        name: "Lekki Central Mosque",
        description: "Islamic center and prayer hall",
        rating: 4.0,
        distance: "0.9 km",
        image: heroBG4,
        location: { lat: 6.4574, lng: 3.4653, address: "Lekki Central Mosque" },
        type: "worship",
      },
    ],
    healthcare: [
      {
        name: "Lekki Medical Center",
        description: "General hospital and emergency care",
        rating: 4.1,
        distance: "0.7 km",
        image: heroBG5,
        location: { lat: 6.4424, lng: 3.4503, address: "Lekki Medical Center" },
        type: "healthcare",
      },
      {
        name: "Family Clinic",
        description: "Primary healthcare and consultations",
        rating: 3.8,
        distance: "0.5 km",
        image: heroBG6,
        location: { lat: 6.4414, lng: 3.4493, address: "Family Clinic" },
        type: "healthcare",
      },
    ],
  },
  mortgage: {
    purchasePrice: 160000000,
    downPayment: 20000000,
    loanDuration: 25,
    interestRate: 7.5,
    monthlyPayment: 2050039,
  },
};

// Affordability Calculator Component
const AffordabilityCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState(160000000);
  const [downPayment, setDownPayment] = useState(20000000);
  const [loanDuration, setLoanDuration] = useState(5);
  const [interestRate, setInterestRate] = useState(7.8);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [calculatedInterestRate, _setCalculatedInterestRate] = useState(3.75);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-NG").format(num);
  };

  const calculateMortgage = () => {
    const principal = purchasePrice - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanDuration * 12;

    if (monthlyInterestRate === 0) {
      // If no interest, just divide principal by number of payments
      setMonthlyPayment(principal / numberOfPayments);
    } else {
      // Standard mortgage calculation
      const monthlyPaymentAmount =
        (principal *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
      setMonthlyPayment(monthlyPaymentAmount);
    }
  };

  const handlePurchasePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    setPurchasePrice(parseInt(value) || 0);
  };

  const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    setDownPayment(parseInt(value) || 0);
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d.]/g, "");
    setInterestRate(parseFloat(value) || 0);
  };

  useEffect(() => {
    calculateMortgage();
  }, [purchasePrice, downPayment, loanDuration, interestRate]);

  return (
    <div className=" text-white p-3 lg:p-6 rounded-lg">
      <div className="mb-4">
        <p className="text-sm text-gray_text2 mb-2">
          Find out in 2 minutes. Our smart calculator will give you a clear
          answer and also show how to make this property yours.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray_text2 mb-2">
            Purchase Price
          </label>
          <input
            type="text"
            value={formatNumber(purchasePrice)}
            onChange={handlePurchasePriceChange}
            className="w-full p-3 bg-[#FAFAFA] border border-gray_text1 rounded-lg text-primary_color placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary_color focus:border-transparent"
            placeholder="₦ 160,000,000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray_text2 mb-2">
            Down payment
          </label>
          <input
            type="text"
            value={formatNumber(downPayment)}
            onChange={handleDownPaymentChange}
            className="w-full p-3  border bg-[#FAFAFA] border-gray_text1 rounded-lg text-primary_color placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary_color focus:border-transparent"
            placeholder="₦ 20,000,000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray_text2 mb-2">
            Loan Duration (Years)
          </label>
          <input
            type="number"
            value={loanDuration}
            onChange={(e) => setLoanDuration(parseInt(e.target.value) || 0)}
            className="w-full p-3 bg-[#FAFAFA] border border-gray_text1 rounded-lg text-primary_color placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary_color focus:border-transparent"
            placeholder="5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray_text2 mb-2">
            Interest Rate
          </label>
          <input
            type="text"
            value={interestRate}
            onChange={handleInterestRateChange}
            className="w-full p-3 bg-[#FAFAFA]  border border-gray_text1 rounded-lg text-primary_color placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary_color focus:border-transparent"
            placeholder="7.8%"
          />
        </div>
      </div>

      <div className="text-center mb-6">
        <button
          onClick={calculateMortgage}
          className="bg-primary_color text-white px-8 py-3 rounded-lg font-medium transition-colors text-sm duration-200"
        >
          Get Results
        </button>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center lg:text-start">
            <div className="text-sm text-gray_text2 mb-1">Monthly payment</div>
            <div className="text-2xl font-bold text-primary_color">
              {formatPrice(monthlyPayment)}
            </div>
          </div>
          <div className="text-center lg:text-end ">
            <div className="text-sm text-gray_text2 mb-1">Interest rate</div>
            <div className="text-2xl font-bold text-primary_color">
              {calculatedInterestRate}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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

  const [selectedNearbyCategory, setSelectedNearbyCategory] =
    useState("restaurants");

  const [isSticky, setIsSticky] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const stickyRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current && stickyRef.current) {
        const contentRect = contentRef.current.getBoundingClientRect();
        const stickyRect = stickyRef.current.getBoundingClientRect();

        console.log(contentRect, stickyRect);

        // For mobile, always keep sticky at bottom
        if (isMobile) {
          setIsSticky(true);
        } else {
          // For desktop, remove sticky behavior when reaching the end of content
          if (contentRect.bottom <= stickyRect.bottom) {
            setIsSticky(false);
          } else {
            setIsSticky(true);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

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
        <h3 className="text-lg font-semibold text-accent">{title}</h3>
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
        <div
          className={`lg:col-span-2 ${isMobile && isSticky ? "pb-32" : ""}`}
          ref={contentRef}
        >
          {/* Image Gallery */}
          <div className="mb-8">
            <div className="relative">
              <img
                src={propertyData.images[activeImage]}
                alt="Property main view"
                className="w-full h-96 object-cover rounded-lg"
              />

              <div className="absolute bottom-4 left-4 flex items-center gap-5">
                <button
                  onClick={openGallery}
                  className=" flex items-center gap-2 bg-primary_color bg-opacity-70 text-white px-3 py-3 rounded-xl text-sm hover:bg-opacity-80 transition-all duration-200"
                >
                  <CameraIcon className="w-4 h-4" />
                  Show {propertyData.images.length} photos
                </button>
                <div className=" bg-[#F6F7FF4D]/50 border border-white text-white px-6 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  View on map
                </div>
              </div>
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
                        : "border-gray-200 hover:border-gray_text2"
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
                  className="mt-3 text-sm text-gray_text2 hover:text-gray-700 font-medium transition-colors duration-200"
                >
                  Show less
                </button>
              )}
            </div>
          </div>

          {/* Property Info */}
          <div className="mb-8">
            <div className="flex  items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {formatPrice(propertyData.price)}
              </h1>
              <div className="flex  items-center gap-4 text-sm text-gray_text2">
                <div className=" border bg-[#FFF4F4] border-accent text-accent px-3 py-1 rounded text-sm font-medium">
                  For Sale
                </div>
                <div className="items-center flex gap-2">
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
                    <Heart className="w-5 h-5 text-primary_color" />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-gray_text2 mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="size-3" />
                <span>{propertyData.title}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="size-3" />2 weeks ago
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 lg:p-4  rounded-lg">
              <div className="text-center flex items-center text-gray_text2 gap-1">
                <PropertyIcon />
                <div className="text-sm text-gray_text2">Property Type</div>
                <div className="font-semibold text-accent">
                  {propertyData.propertyType}
                </div>
              </div>
              <div className="text-center flex items-center gap-2">
                <BedIcon />
                <div className="text-sm text-gray_text2">Bedrooms</div>
                <div className="font-semibold flex text-accent items-center justify-center gap-1">
                  {propertyData.bedrooms}
                </div>
              </div>
              <div className="text-center flex items-center gap-2">
                <BathIcon />
                <div className="text-sm text-gray_text2">Bathrooms</div>
                <div className="font-semibold text-accent flex items-center justify-center gap-1">
                  {propertyData.bathrooms}
                </div>
              </div>
              <div className="text-center flex items-center gap-2">
                <SqrMtr />
                <div className="text-sm text-gray_text2">Property Size</div>
                <div className="font-semibold text-accent flex items-center justify-center gap-1">
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
              <InteractiveMap
                propertyLocation={propertyData.location}
                nearbyPlaces={Object.values(propertyData.nearbyPlaces).flat()}
                height="400px"
              />
            </CollapsibleSection>

            <CollapsibleSection
              title="See what's Nearby"
              isExpanded={expandedSections.nearby}
              onToggle={() => toggleSection("nearby")}
            >
              <div className=" rounded-lg p-3 lg:p-6">
                {/* Category Tabs */}
                <div className="flex items-center gap-2 mb-6 no-scrollbar overflow-x-auto">
                  {[
                    {
                      key: "restaurants",
                      label: "Restaurants",
                      icon: Utensils,
                    },
                    { key: "schools", label: "Schools", icon: GraduationCap },
                    { key: "banks", label: "Banks", icon: Building },
                    { key: "shopping", label: "Shopping", icon: ShoppingBag },
                    { key: "worship", label: "Worship", icon: Church },
                    { key: "healthcare", label: "Health Care", icon: Plus },
                  ].map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setSelectedNearbyCategory(key)}
                      className={`flex items-center gap-2 px-4 py-2 border border-gray_text2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                        selectedNearbyCategory === key
                          ? "bg-primary_color text-white"
                          : "bg-white text-gray_text1 hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>

                {/* Results Count */}
                <div className="text-gray_text3 mb-4">
                  {propertyData.nearbyPlaces[
                    selectedNearbyCategory as keyof typeof propertyData.nearbyPlaces
                  ]?.length || 0}{" "}
                  Results
                </div>

                {/* Places Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {propertyData.nearbyPlaces[
                    selectedNearbyCategory as keyof typeof propertyData.nearbyPlaces
                  ]?.map((place: any, index: number) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-2  transition-colors duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={place.image}
                          alt={place.name}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex items-start min-w-0 justify-between w-full ">
                          <div className=" mb-2">
                            <h4 className="text-gray_text2 font-semibold text-sm mb-1">
                              {place.name}
                            </h4>
                            <p className="text-gray-400 text-xs mb-2 line-clamp-2 w-[160px]">
                              {place.description}
                            </p>
                          </div>
                          <div className="flex flex-col items-stretch place-items-stretch justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-gray_text2 text-xs">
                                {place.rating} Ratings
                              </span>
                            </div>
                            <button className="flex items-center gap-1 text-accent text-xs font-semibold mt-4 hover:text-red-300 transition-colors duration-200">
                              See More
                              <ChevronRightIcon className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              title="Can you afford this property?"
              isExpanded={expandedSections.affordability}
              onToggle={() => toggleSection("affordability")}
            >
              <AffordabilityCalculator />
            </CollapsibleSection>
          </div>
        </div>

        {/* Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div
            ref={stickyRef}
            className={`bg-white border shadow-md border-gray-200 rounded-lg p-2 lg:p-6 ${
              isSticky
                ? isMobile
                  ? "fixed bottom-0 left-0 right-0 z-40 lg:sticky lg:top-[110px] lg:mx-0 lg:mb-0"
                  : "lg:sticky lg:top-[110px]"
                : ""
            }`}
          >
            {!isMobile && (
              <>
                <h3 className="text-lg font-semibold mb-4">
                  Interested in this Property?
                </h3>
                <p className="text-sm text-gray_text2 mb-2">
                  Simply select how you'd like to be contacted and we'll be in
                  touch within 24 hours.
                </p>
              </>
            )}

            <div className=" flex flex-row gap-2 justify-center !font-semibold items-center w-full">
              <button className="w-full bg-primary_color text-white py-3 px-1 rounded-lg text-sm lg:text-base flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" />
                Request a Tour
              </button>
              <button className="w-full border border-gray-200 text-primary_color py-3 px-1 text-sm lg:text-base rounded-lg  flex items-center justify-center gap-2">
                <ChatIcon color="green" />
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
