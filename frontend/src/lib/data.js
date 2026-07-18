// Centralized realistic content for Bikemates

export const STATS = [
  { label: "Verified Users & Students", value: 48200, suffix: "+" },
  { label: "Bikes Listed", value: 9600, suffix: "+" },
  { label: "Colleges & cities Connected", value: 320, suffix: "+" },
  { label: "Successful Trips", value: 1250000, suffix: "+", format: "compact" },
  { label: "Money Saved", value: 42, suffix: "Cr+", prefix: "₹" },
];

export const COLLEGES = [
  "IIT Bombay", "ADYPSOE PUNE", "JSPM PUNE", "VIT Vellore", "D.Y.PATIL",
  "Manipal University", "COEP", "ADYPU PUNE", "VIT PUNE", "Symbiosis Pune",
  "Anna University", "Jadavpur University",
];

export const MODULES = [
  {
    id: "bike-owner",
    tag: "Earn",
    title: "Bike Owner",
    tagline: "Turn your idle bike into passive income.",
    description: "List your bike, set your own pricing, and earn from verified users & students on — fully insured and GPS-tracked.",
    accent: "#FF4B00",
    features: ["List Bike", "Manage Bikes", "Upload Photos", "Bike Specifications", "Hourly, Daily & Weekly Pricing", "Availability Calendar", "Booking Requests", "Accept/Reject Requests", "Security Deposit", "Live GPS Tracking", "QR Handover", "Rental Analytics", "Earnings Dashboard", "Wallet", "Withdraw Earnings", "Ratings & Reviews", "Insurance", "Maintenance Status"],
    cta: "Become a Bike Owner",
    link: "/bike-rental",
  },
  {
    id: "ride-sharer",
    tag: "Share",
    title: "Ride Sharer",
    tagline: "Share your daily commute, split the fuel.",
    description: "Post your regular route and let verified riders join along. Cut your fuel bill in half while helping your city move greener.",
    accent: "#22C55E",
    features: ["Post Ride", "Daily Commute", "Route Selection", "Pickup & Drop Points", "Schedule", "Seat Availability", "Fuel Cost Sharing", "Accept/Reject Passengers", "Live Navigation", "GPS Tracking", "Chat", "Ride History", "Earnings Dashboard", "Ratings", "SOS"],
    cta: "Share a Ride",
    link: "/ride-sharing",
  },
  {
    id: "rent-bike",
    tag: "Ride",
    title: "Rent Bike",
    tagline: "Rent a bike from a verified owner nearby in seconds.",
    description: "Find verified bikes near you, book instantly, unlock with a QR + OTP handover, and ride worry-free.",
    accent: "#3B82F6",
    features: ["Search Nearby Bikes", "Advanced Filters", "Bike Details", "Owner Profile", "Pricing", "Availability", "Book Instantly", "Digital Payment", "QR Pickup", "OTP Verification", "Live Tracking", "Extend Booking", "Return Bike", "Upload Return Photos", "Damage Reporting", "Review Owner", "Rental History"],
    cta: "Rent a Bike",
    link: "/bike-rental",
  },
  {
    id: "book-ride",
    tag: "Travel",
    title: "Book Ride",
    tagline: "Grab a seat on a ride going your way.",
    description: "Match with trusted riders on your route, book a seat, split fuel transparently, and track your ride live end-to-end.",
    accent: "#A855F7",
    features: ["Search Ride", "Route Matching", "Seat Booking", "Driver Profile", "Driver Ratings", "Fuel Cost Split", "Online Payment", "Chat", "Pickup Navigation", "Live Ride Tracking", "ETA", "Ride History", "Reviews", "Emergency SOS"],
    cta: "Book a Ride",
    link: "/ride-sharing",
  },
];

export const WHY = [
  { icon: "ShieldCheck", title: "Students & Verified Users Only", text: "Every member is verified with a ID & driving licence. No strangers, ever." },
  { icon: "Wallet", title: "Genuinely Affordable", text: "Peer pricing means rides and rentals cost a fraction of commercial options." },
  { icon: "MapPin", title: "Right Around you", text: "Bikes and rides are always minutes away, matched to your route." },
  { icon: "Leaf", title: "Greener Commutes", text: "Shared rides cut emissions and campus congestion, one trip at a time." },
  { icon: "Zap", title: "Instant Booking", text: "Search, book, and unlock in under a minute with QR + OTP handover." },
  { icon: "HeartHandshake", title: "Trusted Community", text: "Ratings, reviews and dispute resolution keep the ecosystem safe." },
];

export const HOW_IT_WORKS = [
  { step: "01", title: "Verify Your Identity", text: "Sign up with your email, ID, driving licence and KYC. Get verified in minutes." },
  { step: "02", title: "Find or List", text: "Search nearby bikes and rides, or list your own bike and post your daily route." },
  { step: "03", title: "Book Securely", text: "Confirm with digital payment, security deposit and a QR + OTP handover." },
  { step: "04", title: "Ride & Earn", text: "Enjoy live GPS tracking, complete the trip, and rate each other. Earnings hit your wallet." },
];

export const SAFETY = [
  { icon: "BadgeCheck", title: "Students & Verified Users", text: "College email , government ID verification for every user." },
  { icon: "IdCard", title: "Verified Driving Licences", text: "Riders must upload a valid, verified licence before booking." },
  { icon: "Navigation", title: "Live GPS Tracking", text: "Every ride and rental is tracked in real time, start to finish." },
  { icon: "Siren", title: "Emergency SOS", text: "One-tap SOS shares your live location with contacts and our team." },
  { icon: "ShieldCheck", title: "Insurance Protection", text: "Bikes and riders are covered by our partner insurance." },
  { icon: "CreditCard", title: "Secure Digital Payments", text: "Encrypted payments with escrow-held deposits." },
  { icon: "QrCode", title: "Timestamped Handover", text: "QR + OTP handover with photos protects both parties." },
  { icon: "FileWarning", title: "Damage Reporting", text: "Report and resolve damage with photo evidence and support." },
];

export const BUSINESS_MODEL = [
  { title: "Booking Commission", text: "A small transparent fee on every completed rental and ride." },
  { title: "Premium Membership", text: "Bikemates+ unlocks lower fees, priority support and perks." },
  { title: "Insurance Partnerships", text: "Revenue share with insurance partners on protected trips." },
  { title: "Campus Advertising", text: "Hyper-local brand campaigns targeted to students." },
  { title: "Referral Program", text: "Growth-driven rewards that expand the trusted network." },
];

export const FUTURE = [
  "Inter-college Ride Sharing", "Inter-city User Travel", "Electric Bike Rentals",
  "AI Route Recommendations", "Smart Locks", "Smart Helmet Integration",
  "Carbon Savings Tracker", "Gamification", "Loyalty Program", "Campus Ambassador Network",
];

export const TESTIMONIALS = [
  { name: "Ananya Sharma", role: "3rd Year, VIT Vellore", text: "I list my scooter when I'm in class and earn enough to cover my mess bill. It's genuinely effortless.", rating: 5 },
  { name: "Rohan Mehta", role: "2nd Year, IIT Bombay", text: "Booking a ride to the station is cheaper than an auto and I'm always riding with someone from campus.", rating: 5 },
  { name: "Priya Nair", role: "Final Year, Christ Bengaluru", text: "The verification made my parents comfortable. Live tracking and SOS make it feel safe every single time.", rating: 5 },
  { name: "Karan Singh", role: "1st Year, BITS Pilani", text: "Rented a bike for the weekend fest in two taps. QR handover was smooth and the owner was super chill.", rating: 5 },
  { name: "Ishita Verma", role: "3rd Year, SRM Chennai", text: "Splitting fuel on my daily commute means I basically ride for free now. Wish I'd found this sooner.", rating: 5 },
  { name: "Aditya Rao", role: "2nd Year, Manipal", text: "Earnings hit my wallet instantly and withdrawals are quick. The analytics show exactly what I make.", rating: 5 },
];

export const FAQS = [
  { q: "Who can join Bikemates?", a: "Only college students & verified users . You must sign up with a valid email and complete ID and KYC verification to book or list." },
  { q: "How do you verify students & user ", a: "We verify your college email, government ID, and driving licence (for riders). Verification usually takes just a few minutes." },
  { q: "Is my bike insured while rented out?", a: "Yes. Every trip on Bikemates is covered by our partner insurance, and a refundable security deposit protects owners against damage." },
  { q: "How does payment work?", a: "Payments are handled securely in-app. Rental fees and fuel splits are transparent, and deposits are held safely until the trip completes." },
  { q: "What if there's an emergency during a ride?", a: "Every ride has one-tap Emergency SOS that shares your live location with your emergency contacts and our safety team." },
  { q: "How much can I earn as a bike owner?", a: "It depends on your bike and availability, but owners on active campuses commonly earn ₹3,000–₹8,000 per month from idle hours." },
  { q: "What happens if a bike is damaged?", a: "Renters upload photos at pickup and return. Any damage is reported in-app with evidence, and our team helps resolve it fairly using the deposit and insurance." },
  { q: "Which cities and colleges are supported?", a: "We're live across 320+ campuses in major Indian cities and adding new colleges every week. Check Partner Colleges for the latest." },
];

export const PRICING = [
  { name: "Student", price: "₹0", period: "forever", highlight: false, tagline: "Everything you need to start.", features: ["Verified student profile", "Rent bikes & book rides", "Live GPS tracking", "Standard booking fee", "In-app chat & support", "Ratings & reviews"], cta: "Get Started" },
  { name: "Bikemates+", price: "₹149", period: "per month", highlight: true, tagline: "For daily commuters & power users.", features: ["Everything in Student", "Reduced booking fees", "Priority ride matching", "Priority customer support", "Free booking extensions", "Exclusive campus perks"], cta: "Go Premium" },
  { name: "Owner Pro", price: "₹299", period: "per month", highlight: false, tagline: "Maximise your rental earnings.", features: ["Everything in Bikemates+", "Advanced rental analytics", "Featured bike listings", "Lowest commission rate", "Instant withdrawals", "Dedicated owner manager"], cta: "Scale Earnings" },
];

export const USER_DASHBOARD_CARDS = [
  { icon: "User", label: "Profile", to: "/app/profile" }, { icon: "Wallet", label: "Wallet", to: "/app/wallet" },
  { icon: "CalendarCheck", label: "Bookings", to: "/app/bookings" }, { icon: "History", label: "Ride History", to: "/app/ride-history" },
  { icon: "Heart", label: "Saved Bikes", to: "/app/saved-bikes" }, { icon: "Bell", label: "Notifications", to: "/app/notifications" },
  { icon: "MessageSquare", label: "Messages", to: "/app/messages" }, { icon: "Gift", label: "Rewards", to: "/app/rewards" },
  { icon: "Users", label: "Referral", to: "/app/referral" }, { icon: "Settings", label: "Settings", to: "/app/settings" },
];

export const OWNER_DASHBOARD_CARDS = [
  { icon: "PlusCircle", label: "Add Bike", to: "/app/list-bike" }, { icon: "Bike", label: "Manage Bikes", to: "/app/my-bikes" },
  { icon: "Inbox", label: "Booking Requests", to: "/app/booking-requests" }, { icon: "Calendar", label: "Calendar", to: "/app/calendar" },
  { icon: "Navigation", label: "GPS Tracking", to: "/app/gps-tracking" }, { icon: "TrendingUp", label: "Earnings", to: "/app/earnings" },
  { icon: "Wallet", label: "Wallet", to: "/app/wallet" }, { icon: "BarChart3", label: "Analytics", to: "/app/analytics" },
  { icon: "Star", label: "Reviews", to: "/app/reviews" },
];

export const FEATURE_LIST = [
  "Student Verification", "College Email Verification", "Driving Licence Verification", "KYC Verification",
  "Secure Authentication", "Google Maps Integration", "Live GPS Tracking", "Emergency SOS",
  "QR Pickup & Return", "Digital Payments", "Wallet", "Real-time Notifications",
  "Chat System", "Ratings & Reviews", "Referral Program", "Rewards",
  "Insurance", "Booking Calendar", "Search & Filters", "Push Notifications",
  "Help & Support", "Dispute Resolution",
];

export const BLOG_POSTS = [
  { title: "How students on 320 campuses are cutting commute costs by 60%", category: "Insights", date: "Dec 8, 2025", read: "6 min", img: "https://images.unsplash.com/photo-1600497934947-23786a93f382?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { title: "The safety playbook: how we verify every single student", category: "Trust & Safety", date: "Dec 2, 2025", read: "5 min", img: "https://images.unsplash.com/photo-1597755269789-89407cf1a199?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { title: "From idle scooter to ₹8,000/month: an owner's story", category: "Community", date: "Nov 24, 2025", read: "4 min", img: "https://images.unsplash.com/photo-1760917094679-d33f2ec13110?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { title: "Building greener campuses through shared mobility", category: "Sustainability", date: "Nov 15, 2025", read: "7 min", img: "https://images.unsplash.com/photo-1600497934947-23786a93f382?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { title: "Designing trust: the psychology of peer-to-peer rentals", category: "Product", date: "Nov 6, 2025", read: "8 min", img: "https://images.unsplash.com/photo-1597755269789-89407cf1a199?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
  { title: "Why student-only communities are the future of mobility", category: "Vision", date: "Oct 28, 2025", read: "5 min", img: "https://images.unsplash.com/photo-1760917094679-d33f2ec13110?crop=entropy&cs=srgb&fm=jpg&q=85&w=800" },
];

export const CAREERS = [
  { role: "Senior Product Designer", team: "Design", location: "Bengaluru / Remote", type: "Full-time" },
  { role: "Backend Engineer (Go)", team: "Engineering", location: "Bengaluru", type: "Full-time" },
  { role: "Campus Growth Lead", team: "Growth", location: "Mumbai", type: "Full-time" },
  { role: "Trust & Safety Specialist", team: "Operations", location: "Remote", type: "Full-time" },
  { role: "Data Scientist, Matching", team: "Engineering", location: "Bengaluru", type: "Full-time" },
  { role: "Community Manager", team: "Marketing", location: "Delhi", type: "Contract" },
];

export const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Bike Rental", to: "/bike-rental" },
  { label: "Ride Sharing", to: "/ride-sharing" },
  { label: "Features", to: "/features" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Safety", to: "/safety" },
  { label: "Pricing", to: "/pricing" },
];

export const MORE_LINKS = [
  { label: "About", to: "/about" }, { label: "Blog", to: "/blog" },
  { label: "Careers", to: "/careers" }, { label: "Campus Ambassador", to: "/campus-ambassador" },
  { label: "Refer & Earn", to: "/refer-earn" }, { label: "Insurance", to: "/insurance" },
  { label: "Partner Colleges", to: "/partner-colleges" }, { label: "Support", to: "/support" },
  { label: "FAQ", to: "/faq" }, { label: "Contact", to: "/contact" }, { label: "Press Kit", to: "/press-kit" },
];

export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1600497934947-23786a93f382?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  commute: "https://images.unsplash.com/photo-1597755269789-89407cf1a199?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
  campus: "https://images.unsplash.com/photo-1760917094679-d33f2ec13110?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
};
