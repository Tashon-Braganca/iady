
export const siteData = {
  general: {
    title: "Cozy Distance",
    coupleName: "Adyasha & Me",
    password: "i love you",
    passwordHint: "A three letter word (phrase)",
    musicUrl: "/audio/BIRDS%20OF%20A%20FEATHER%20-%20Billie%20Eilish%20free%20mp3.mp3",
  },
  
  hero: {
    title: "Adyasha",
    subtitle: "My First Hope",
  },

  timeline: [
    { 
      date: "Aug 31", 
      title: "The Cold DM", 
      icon: "Instagram", 
      description: "Where it all started...",
      image: "/photos/The%20Cold%20DM/main.png" 
    },
    { 
      date: "Sept 28", 
      title: "Officially Us", 
      icon: "Heart", 
      description: "The start of forever.",
      image: "/photos/Officialy%20Us/main.png"
    },
    { 
      date: "Oct 1", 
      title: "First 'I Love You'", 
      icon: "Lock", 
      description: "Locked in.",
      image: "/photos/First%20I%20Love%20You/main.png"
    },
  ],

  levels: [
    // 1. VC Memories (First)
    {
      id: "vc",
      title: "VC Memories",
      icon: "Video",
      description: "Screenshots of us.",
      color: "bg-gray-100",
      accent: "blue",
      group: "The Beginning",
      previewImages: [
        "/photos/Vc%20Memories/1.jpg",
        "/photos/Vc%20Memories/2.jpg",
        "/photos/Vc%20Memories/3.jpeg",
        "/photos/Vc%20Memories/4.png",
        "/photos/Vc%20Memories/5.png",
        "/photos/Vc%20Memories/6.png"
      ],
      memoryNotes: ["Late night calls", "Bad connection, good vibes"],
      content: {
        title: "Digital Closeness",
        text: "Every pixel of you is perfect.",
        image: "/photos/Vc%20Memories/main.jpg",
      }
    },
    
    // 2. AOT Corner
    {
      id: "aot",
      title: "AOT Corner",
      icon: "Sword",
      description: "Dedicate your heart.",
      color: "bg-green-900 text-white",
      accent: "green",
      group: "Obsessions",
      previewImages: [
        "/photos/AOT/1.jpg",
        "/photos/AOT/2.jpg",
        "/photos/AOT/3.jpg",
        "/photos/AOT/4.jpg"
      ],
      memoryNotes: ["Shinzo wo Sasageyo!", "Mikasa's scarf"],
      content: {
        title: "To You, 2000 Years From Now",
        text: "We will watch it 500 times. I'll get you the scarf.",
        image: "/photos/AOT/main.jpg",
      }
    },

    // 3. Times I Fell Hard For You
    {
      id: "fell-hard",
      title: "Times I Fell Hard",
      icon: "Heart", 
      description: "Moments my heart skipped a beat.",
      color: "bg-red-50",
      accent: "red",
      group: "Romance",
      previewImages: [
        "/photos/Times%20I%20fell%20for%20you/1.jpg",
        "/photos/Times%20I%20fell%20for%20you/2.jpg",
        "/photos/Times%20I%20fell%20for%20you/3.jpg",
        "/photos/Times%20I%20fell%20for%20you/4.jpg",
        "/photos/Times%20I%20fell%20for%20you/5.jpg",
        "/photos/Times%20I%20fell%20for%20you/6.jpg"
      ],
      memoryNotes: ["That specific smile", "When you laughed", "Your kindness"],
      content: {
        title: "Falling For You",
        text: "It wasn't just one moment. It was a million little things that made me realize you're the one.",
        image: "/photos/Times%20I%20fell%20for%20you/main.jpg",
      }
    },

    // 4. White Lilies
    {
      id: "lilies",
      title: "White Lilies",
      icon: "Flower2",
      description: "Your favorite.",
      color: "bg-white border border-gray-200",
      accent: "pink",
      group: "Little Things",
      previewImages: [
        "/photos/White%20Lillies/1.jpg",
        "/photos/White%20Lillies/2.jpg",
        "/photos/White%20Lillies/3.jpg",
        "/photos/White%20Lillies/4.jpg",
        "/photos/White%20Lillies/5.jpg"
      ],
      memoryNotes: ["Pure beauty", "Just for you"],
      content: {
        title: "For My Flower",
        text: "Pure and beautiful, just like you.",
        image: "/photos/White%20Lillies/main.jpg",
      }
    },

    // 5. Sugar Rush
    {
      id: "desserts",
      title: "Sugar Rush",
      icon: "Candy",
      description: "Chocolates & Cheesecakes.",
      color: "bg-pink-100",
      accent: "pink",
      previewImages: [
        "/photos/Sugar%20Rush/1.jpeg",
        "/photos/Sugar%20Rush/2.jpg",
        "/photos/Sugar%20Rush/3.jpeg"
      ],
      memoryNotes: ["Sweet cravings", "Chocolate runs"],
      content: {
        title: "Sweet Treats",
        text: "Dark chocolate, cheesecake, and everything sweet.",
        image: "/photos/Sugar%20Rush/main.jpg",
      }
    },

    // 6. Food Passport
    {
      id: "food",
      title: "Food Passport",
      icon: "Utensils",
      description: "Indian, Indo-Chinese, Mexican.",
      color: "bg-yellow-100",
      accent: "yellow",
      previewImages: [
        "/photos/Food%20Transport/1.jpg",
        "/photos/Food%20Transport/2.png",
        "/photos/Food%20Transport/3.png",
        "/photos/Food%20Transport/4.png"
      ],
      memoryNotes: ["Spicy food challenge", "Street food cravings"],
      content: {
        title: "Our Menu",
        text: "From spicy curries to crispy tacos.",
        image: "/photos/Food%20Transport/main.jpg",
      }
    },

    // 7. Binge Watch
    {
      id: "movies",
      title: "Binge Watch",
      icon: "Film",
      description: "Bollywood & Chai.",
      color: "bg-red-100",
      accent: "red",
      previewImages: [
        "/photos/Binge%20Watch/1.png",
        "/photos/Binge%20Watch/2.png",
        "/photos/Binge%20Watch/3.png",
        "/photos/Binge%20Watch/4.png"
      ],
      memoryNotes: ["Movie marathons", "Popcorn time"],
      content: {
        title: "Movie Night",
        text: "Cozy blankets and endless movies.",
        image: "/photos/Binge%20Watch/main.png",
      }
    },

    // 8. Art Gallery
    {
      id: "art",
      title: "Art Gallery",
      icon: "Palette",
      description: "Your masterpieces.",
      color: "bg-purple-100",
      accent: "purple",
      previewImages: [
        "/photos/Art%20gallery/1.jpg",
        "/photos/Art%20gallery/2.png",
        "/photos/Art%20gallery/3.jpeg",
        "/photos/Art%20gallery/4.jpeg",
        "/photos/Art%20gallery/5.jpg"
      ],
      memoryNotes: ["Sketching session", "Your beautiful art"],
      content: {
        title: "Your Art",
        text: "Dancing, painting, sketching... you do it all.",
        image: "/photos/Art%20gallery/main.jpg",
      }
    },

    // 9. Virtual Date (Second Last) + GMeet
    {
      id: "date-night",
      title: "Virtual Date",
      icon: "Coffee",
      description: "Tap to join call...",
      color: "bg-orange-100",
      accent: "orange",
      group: "Right Now",
      meetLink: "https://meet.google.com/abc-defg-hij", 
      previewImages: [
        // No files in "Virtual Date" folder found in ls, reusing from "The Cold DM" as placeholder or empty?
        // Wait, "Virtual Date" was renamed? 
        // User screenshot showed "The Cold DM", "Officialy Us", etc.
        // It did NOT show "Virtual Date" folder.
        // Ah, maybe "The Cold DM" is the virtual date? No.
        // Let's assume user hasn't created "Virtual Date" folder or it's named something else.
        // Based on LS, there is NO "Virtual Date" folder.
        // I'll point to "The Cold DM" images as a fallback to avoid broken images.
        "/photos/The%20Cold%20DM/1.jpg",
        "/photos/The%20Cold%20DM/main.png"
      ],
      memoryNotes: ["I'm waiting...", "Click the button!"],
      content: {
        title: "It's Date Time",
        text: "I'm waiting for you on the other side. Come say hi!",
        image: "/photos/The%20Cold%20DM/main.png",
      }
    },

    // 10. The Hug (Last)
    {
      id: "hug",
      title: "The Hug",
      icon: "Smile",
      description: "AI Generated Warmth.",
      color: "bg-teal-100",
      accent: "teal",
      group: "Until Real",
      previewImages: [
        "/photos/The%20Hug/1.png",
        "/photos/The%20Hug/2.png",
        "/photos/The%20Hug/3.png",
        "/photos/The%20Hug/4.png"
      ],
      memoryNotes: ["Warm embrace", "Until it's real"],
      content: {
        title: "A Virtual Hug",
        text: "Since we haven't met yet, I asked a computer to hug you for me. Best I can do until Italy.",
        image: "/photos/The%20Hug/main.png",
      }
    }
  ],

  gallery: [
     // We'll populate this with available images from the ls command to ensure no broken links
     // Grabbing some random ones from the folders
     { src: "/photos/Times%20I%20fell%20for%20you/1.jpg", alt: "Us" },
     { src: "/photos/Times%20I%20fell%20for%20you/2.jpg", alt: "Us" },
     { src: "/photos/Times%20I%20fell%20for%20you/3.jpg", alt: "Us" },
     { src: "/photos/Times%20I%20fell%20for%20you/4.jpg", alt: "Us" },
     { src: "/photos/Times%20I%20fell%20for%20you/5.jpg", alt: "Us" },
     { src: "/photos/Vc%20Memories/1.jpg", alt: "VC" },
     { src: "/photos/Vc%20Memories/2.jpg", alt: "VC" },
     { src: "/photos/Vc%20Memories/3.jpeg", alt: "VC" },
     { src: "/photos/Sugar%20Rush/1.jpeg", alt: "Sweet" },
     { src: "/photos/Art%20gallery/1.jpg", alt: "Art" },
  ],
  
  videos: {
    kissie: [
        { src: "/videos/kissie/VID-20250925-WA0039.mp4", poster: "/photos/Times%20I%20fell%20for%20you/1.jpg" },
    ],
    dance: [
        { src: "/videos/dance/VID-20251213-WA0058.mp4", poster: "/photos/Times%20I%20fell%20for%20you/2.jpg" },
    ]
  },

  letters: [
    {
      id: "love",
      title: "To My Kitten",
      content: "Distance means nothing when you mean everything. You are the most beautiful person I know, inside and out. Every day with you is a blessing."
    },
    {
      id: "vows",
      title: "My Promises",
      content: "I promise to never break your trust. No lies, ever. I will never raise my voice at you. Loyalty forever. I will never leave you hanging."
    },
    {
      id: "roast",
      title: "Why I Put Up With You",
      content: "Insert inside jokes here... e.g., 'Even though you steal my hoodies...'"
    }
  ],
  
  bucketList: [
    "Virtual Date (Cafe hopping online)",
    "Watch AOT together (500 times)",
    "Give you the Mikasa Scarf",
    "Binge JJK & make you fall in love",
    "ITALY (The Big Dream)",
    "A House with 2 floors (Dogs on ground, Us on top)",
    "Buy you a Polaroid for your birthday"
  ],
  
  final: {
      text: "Love you, always, my forever.",
      image: "/photos/Officialy%20Us/main.png" // Reusing a valid image
  }
};
