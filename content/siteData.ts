
export const siteData = {
  general: {
    title: "Cozy Distance",
    coupleName: "Adyasha & Me",
    password: "i love you",
    passwordHint: "A three letter word (phrase)",
    musicUrl: "/audio/theme.mp3",
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
      image: "/photos/The Cold DM/1.jpg" 
    },
    { 
      date: "Sept 28", 
      title: "Officially Us", 
      icon: "Heart", 
      description: "The start of forever.",
      image: "/photos/Officialy Us/1.jpg"
    },
    { 
      date: "Oct 1", 
      title: "First 'I Love You'", 
      icon: "Lock", 
      description: "Locked in.",
      image: "/photos/First I Love You/1.jpg"
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
        "/photos/Vc Memories/1.jpg",
        "/photos/Vc Memories/2.jpg",
        "/photos/Vc Memories/3.jpg"
      ],
      memoryNotes: ["Late night calls", "Bad connection, good vibes"],
      content: {
        title: "Digital Closeness",
        text: "Every pixel of you is perfect.",
        image: "/photos/Vc Memories/main.jpg",
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
        "/photos/AOT/2.jpg"
      ],
      memoryNotes: ["Shinzo wo Sasageyo!", "Mikasa's scarf"],
      content: {
        title: "To You, 2000 Years From Now",
        text: "We will watch it 500 times. I'll get you the scarf.",
        image: "/photos/AOT/main.jpg",
      }
    },

    // 3. Times I Fell Hard For You (Replaces Italy Dream)
    {
      id: "fell-hard",
      title: "Times I Fell Hard",
      icon: "Heart", 
      description: "Moments my heart skipped a beat.",
      color: "bg-red-50",
      accent: "red",
      group: "Romance",
      previewImages: [
        "/photos/Times I fell for you/1.jpg",
        "/photos/Times I fell for you/2.jpg",
        "/photos/Times I fell for you/3.jpg"
      ],
      memoryNotes: ["That specific smile", "When you laughed", "Your kindness"],
      content: {
        title: "Falling For You",
        text: "It wasn't just one moment. It was a million little things that made me realize you're the one.",
        image: "/photos/Times I fell for you/main.jpg",
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
        "/photos/White Lillies/1.jpg",
        "/photos/White Lillies/2.jpg"
      ],
      memoryNotes: ["Pure beauty", "Just for you"],
      content: {
        title: "For My Flower",
        text: "Pure and beautiful, just like you.",
        image: "/photos/White Lillies/main.jpg",
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
        "/photos/Sugar Rush/1.jpg",
        "/photos/Sugar Rush/2.jpg"
      ],
      memoryNotes: ["Sweet cravings", "Chocolate runs"],
      content: {
        title: "Sweet Treats",
        text: "Dark chocolate, cheesecake, and everything sweet.",
        image: "/photos/Sugar Rush/main.jpg",
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
        "/photos/Food Transport/1.jpg",
        "/photos/Food Transport/2.jpg"
      ],
      memoryNotes: ["Spicy food challenge", "Street food cravings"],
      content: {
        title: "Our Menu",
        text: "From spicy curries to crispy tacos.",
        image: "/photos/Food Transport/main.jpg",
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
        "/photos/Binge Watch/1.jpg",
        "/photos/Binge Watch/2.jpg"
      ],
      memoryNotes: ["Movie marathons", "Popcorn time"],
      content: {
        title: "Movie Night",
        text: "Cozy blankets and endless movies.",
        image: "/photos/Binge Watch/main.jpg",
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
        "/photos/Art gallery/1.jpg",
        "/photos/Art gallery/2.jpg"
      ],
      memoryNotes: ["Sketching session", "Your beautiful art"],
      content: {
        title: "Your Art",
        text: "Dancing, painting, sketching... you do it all.",
        image: "/photos/Art gallery/main.jpg",
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
        "/photos/Virtual Date/1.jpg",
        "/photos/Virtual Date/2.jpg"
      ],
      memoryNotes: ["I'm waiting...", "Click the button!"],
      content: {
        title: "It's Date Time",
        text: "I'm waiting for you on the other side. Come say hi!",
        image: "/photos/Virtual Date/main.jpg",
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
        "/photos/The Hug/1.jpg",
        "/photos/The Hug/2.jpg"
      ],
      memoryNotes: ["Warm embrace", "Until it's real"],
      content: {
        title: "A Virtual Hug",
        text: "Since we haven't met yet, I asked a computer to hug you for me. Best I can do until Italy.",
        image: "/photos/The Hug/main.jpg",
      }
    }
  ],

  // Placeholder for gallery: User must add images to public/photos/gallery/
  gallery: Array.from({ length: 30 }, (_, i) => ({
      src: `/photos/gallery/gallery-${i + 1}.jpg`,
      alt: "Us"
  })),
  
  videos: {
    kissie: [
        { src: "/videos/kissie-1.mp4", poster: "/videos/posters/kissie-poster.jpg" },
    ],
    dance: [
        { src: "/videos/dance-1.mp4", poster: "/videos/posters/dance-poster.jpg" },
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
      image: "/photos/final-moment.jpg"
  }
};
