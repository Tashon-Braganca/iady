
export const siteData = {
  general: {
    title: "Cozy Distance",
    coupleName: "Adyasha & Me",
    password: "i love you",
    passwordHint: "A three letter word (phrase)",
    musicUrl: "/audio/BIRDS OF A FEATHER - Billie Eilish free mp3.mp3",
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
      image: "/photos/The Cold DM/main.png",
      images: [
        "/photos/The Cold DM/1.jpg",
        "/photos/The Cold DM/2.png",
        "/photos/The Cold DM/3.png",
        "/photos/The Cold DM/4.png",
        "/photos/The Cold DM/main.png"
      ]
    },
    { 
      date: "Sept 28", 
      title: "Officially Us", 
      icon: "Heart", 
      description: "The start of forever.",
      image: "/photos/Officialy Us/main.png",
      images: [
        "/photos/Officialy Us/3.jpg",
        "/photos/Officialy Us/4.jpg",
        "/photos/Officialy Us/main.png"
      ]
    },
    { 
      date: "Oct 1", 
      title: "First 'I Love You'", 
      icon: "Lock", 
      description: "Locked in.",
      image: "/photos/First I Love You/main.png",
      images: [
        "/photos/First I Love You/1.png",
        "/photos/First I Love You/2.png",
        "/photos/First I Love You/main.png"
      ]
    },
  ],

  levels: [
    // 1. VC Memories
    {
      id: "vc",
      title: "VC Memories",
      icon: "Video",
      description: "Screenshots of us.",
      color: "bg-indigo-500",
      accent: "blue",
      group: "The Beginning",
      previewImages: [
        "/photos/Vc Memories/1.jpg",
        "/photos/Vc Memories/2.jpg",
        "/photos/Vc Memories/3.jpeg",
        "/photos/Vc Memories/4.png",
        "/photos/Vc Memories/5.png",
        "/photos/Vc Memories/6.png",
        "/photos/Vc Memories/7.png",
        "/photos/Vc Memories/8.png",
        "/photos/Vc Memories/9.png",
        "/photos/Vc Memories/10.png",
        "/photos/Vc Memories/11.png",
        "/photos/Vc Memories/12.png",
        "/photos/Vc Memories/13.png",
        "/photos/Vc Memories/14.png",
        "/photos/Vc Memories/15.jpg",
        "/photos/Vc Memories/main.jpg"
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
      color: "bg-emerald-700",
      accent: "green",
      group: "Obsessions",
      previewImages: [
        "/photos/AOT/1.jpg",
        "/photos/AOT/2.jpg",
        "/photos/AOT/3.jpg",
        "/photos/AOT/4.jpg",
        "/photos/AOT/5.jpg",
        "/photos/AOT/6.jpg",
        "/photos/AOT/main.jpg"
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
      color: "bg-rose-500",
      accent: "red",
      group: "Romance",
      previewImages: [
        "/photos/Times I fell for you/1.jpg",
        "/photos/Times I fell for you/2.jpg",
        "/photos/Times I fell for you/3.jpg",
        "/photos/Times I fell for you/4.jpg",
        "/photos/Times I fell for you/5.jpg",
        "/photos/Times I fell for you/6.jpg",
        "/photos/Times I fell for you/7.jpg",
        "/photos/Times I fell for you/8.jpg",
        "/photos/Times I fell for you/9.png",
        "/photos/Times I fell for you/10.jpg",
        "/photos/Times I fell for you/main.jpg"
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
      color: "bg-purple-500",
      accent: "pink",
      group: "Little Things",
      previewImages: [
        "/photos/White Lillies/1.jpg",
        "/photos/White Lillies/2.jpg",
        "/photos/White Lillies/3.jpg",
        "/photos/White Lillies/4.jpg",
        "/photos/White Lillies/5.jpg",
        "/photos/White Lillies/6.jpg",
        "/photos/White Lillies/7.jpg",
        "/photos/White Lillies/8.jpg",
        "/photos/White Lillies/main.jpg"
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
      color: "bg-pink-500",
      accent: "pink",
      previewImages: [
        "/photos/Sugar Rush/1.jpeg",
        "/photos/Sugar Rush/2.jpg",
        "/photos/Sugar Rush/3.jpeg",
        "/photos/Sugar Rush/4.jpg",
        "/photos/Sugar Rush/5.jpg",
        "/photos/Sugar Rush/6.jpg",
        "/photos/Sugar Rush/main.jpg"
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
      color: "bg-amber-500",
      accent: "yellow",
      previewImages: [
        "/photos/Food Transport/1.jpg",
        "/photos/Food Transport/2.png",
        "/photos/Food Transport/3.png",
        "/photos/Food Transport/4.png",
        "/photos/Food Transport/5.jpg",
        "/photos/Food Transport/6.png",
        "/photos/Food Transport/7.png",
        "/photos/Food Transport/main.jpg"
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
      color: "bg-red-600",
      accent: "red",
      previewImages: [
        "/photos/Binge Watch/1.png",
        "/photos/Binge Watch/2.png",
        "/photos/Binge Watch/3.png",
        "/photos/Binge Watch/4.png",
        "/photos/Binge Watch/5.png",
        "/photos/Binge Watch/6.png",
        "/photos/Binge Watch/7.png",
        "/photos/Binge Watch/main.png"
      ],
      memoryNotes: ["Movie marathons", "Popcorn time"],
      content: {
        title: "Movie Night",
        text: "Cozy blankets and endless movies.",
        image: "/photos/Binge Watch/main.png",
      }
    },

    // 8. Art Gallery
    {
      id: "art",
      title: "Art Gallery",
      icon: "Palette",
      description: "Your masterpieces.",
      color: "bg-violet-500",
      accent: "purple",
      previewImages: [
        "/photos/Art gallery/1.jpg",
        "/photos/Art gallery/2.png",
        "/photos/Art gallery/3.jpeg",
        "/photos/Art gallery/4.jpeg",
        "/photos/Art gallery/5.jpg",
        "/photos/Art gallery/6.jpg",
        "/photos/Art gallery/7.jpg",
        "/photos/Art gallery/8.jpg",
        "/photos/Art gallery/9.webp",
        "/photos/Art gallery/10.jpg",
        "/photos/Art gallery/11.png",
        "/photos/Art gallery/main.jpg"
      ],
      memoryNotes: ["Sketching session", "Your beautiful art"],
      content: {
        title: "Your Art",
        text: "Dancing, painting, sketching... you do it all.",
        image: "/photos/Art gallery/main.jpg",
      }
    },

    // 9. Virtual Date (SECOND LAST - GMeet Link)
    {
      id: "date-night",
      title: "Virtual Date",
      icon: "Coffee",
      description: "Valentine's Day Call 💕",
      color: "bg-orange-500",
      accent: "orange",
      group: "Right Now",
      meetLink: "https://meet.google.com/qbx-rkcv-wxd",
      previewImages: [
        "/photos/The Cold DM/1.jpg",
        "/photos/The Cold DM/2.png",
        "/photos/The Cold DM/3.png",
        "/photos/The Cold DM/4.png",
        "/photos/The Cold DM/main.png"
      ],
      memoryNotes: ["February 14-15, 2026", "I'm waiting for you!", "Our Valentine's Date"],
      content: {
        title: "Valentine's Day Date",
        text: "Click the button to join our virtual coffee date. February 14-15, 2026.",
        image: "/photos/The Cold DM/main.png",
      }
    },

    // 10. The Hug (LAST)
    {
      id: "hug",
      title: "The Hug",
      icon: "Smile",
      description: "AI Generated Warmth.",
      color: "bg-teal-500",
      accent: "teal",
      group: "Until Real",
      previewImages: [
        "/photos/The Hug/1.png",
        "/photos/The Hug/2.png",
        "/photos/The Hug/3.png",
        "/photos/The Hug/4.png",
        "/photos/The Hug/5.png",
        "/photos/The Hug/6.png",
        "/photos/The Hug/main.png"
      ],
      memoryNotes: ["Warm embrace", "Until it's real"],
      content: {
        title: "A Virtual Hug",
        text: "Since we haven't met yet, I asked a computer to hug you for me. Best I can do until we meet in June.",
        image: "/photos/The Hug/main.png",
      }
    }
  ],

  gallery: [
      { src: "/photos/Times I fell for you/1.jpg", alt: "Us" },
      { src: "/photos/Times I fell for you/2.jpg", alt: "Us" },
      { src: "/photos/Times I fell for you/3.jpg", alt: "Us" },
      { src: "/photos/Times I fell for you/4.jpg", alt: "Us" },
      { src: "/photos/Times I fell for you/5.jpg", alt: "Us" },
      { src: "/photos/Vc Memories/1.jpg", alt: "VC" },
      { src: "/photos/Vc Memories/2.jpg", alt: "VC" },
      { src: "/photos/Vc Memories/3.jpeg", alt: "VC" },
      { src: "/photos/Sugar Rush/1.jpeg", alt: "Sweet" },
      { src: "/photos/Art gallery/1.jpg", alt: "Art" },
      { src: "/photos/Vc Memories/4.png", alt: "VC" },
      { src: "/photos/Vc Memories/5.png", alt: "VC" },
      { src: "/photos/Vc Memories/6.png", alt: "VC" },
      { src: "/photos/Vc Memories/7.png", alt: "VC" },
      { src: "/photos/Vc Memories/8.png", alt: "VC" },
      { src: "/photos/Vc Memories/9.png", alt: "VC" },
      { src: "/photos/Vc Memories/10.png", alt: "VC" },
      { src: "/photos/Vc Memories/11.png", alt: "VC" },
      { src: "/photos/Vc Memories/12.png", alt: "VC" },
      { src: "/photos/Vc Memories/13.png", alt: "VC" },
      { src: "/photos/Vc Memories/14.png", alt: "VC" },
      { src: "/photos/Vc Memories/15.jpg", alt: "VC" },
      { src: "/photos/Vc Memories/main.jpg", alt: "VC" },
  ],
  
  videos: {
    kissie: [
        { src: "/videos/kissie/VID-20250918-WA0030.mp4" },
        { src: "/videos/kissie/VID-20250921-WA0039.mp4" },
        { src: "/videos/kissie/VID-20250925-WA0039.mp4" },
        { src: "/videos/kissie/VID-20251010-WA0041.mp4" },
        { src: "/videos/kissie/VID-20251018-WA0031.mp4" },
        { src: "/videos/kissie/PXL_20260106_170649482.mp4" },
        { src: "/videos/kissie/WhatsApp Video 2026-02-01 at 9.20.22 PM.mp4" },
        { src: "/videos/kissie/WhatsApp Video 2026-02-01 at 9.20.49 PM.mp4" },
    ],
    dance: [
        { src: "/videos/dance/VID-20251213-WA0058.mp4" },
        { src: "/videos/dance/PXL_20260105_062453252.mp4" },
        { src: "/videos/dance/PXL_20260204_130647146.mp4" },
        { src: "/videos/dance/WhatsApp Video 2026-02-01 at 9.20.29 PM.mp4" },
        { src: "/videos/dance/WhatsApp Video 2026-02-01 at 9.20.41 PM.mp4" },
        { src: "/videos/dance/WhatsApp Video 2026-02-01 at 9.20.48 PM.mp4" },
    ],
    finale: [
        { src: "/videos/the finale/PXL_20260201_162839765.mp4" },
    ]
  },

  letters: [
    {
      id: "love",
      title: "To My Kitten",
      content: "My love, being with you has changed my world in the most beautiful way. Even when though we are apart, I feel close to you in my heart. Your smile makes my hard days softer, and your voice brings me peace I never knew I needed. You are kind, warm, and so beautiful, inside and out. I love the way you care, the way you laugh, and the way you make ordinary moments feel special.  I am so thankful for you, and I cherish every memory we have  together. I love you my pugu you mean the world to me."
    },
    {
      id: "vows",
      title: "My Promises",
      content: "I promise to always be honest with you and to treat your heart with care. I will stand by you during good days and hard ones too. I promise to listen to you and drown in your words. I will support your dreams and remind you how strong and amazing you are. I promise to stay patient,  to grow with you, not away from you. My loyalty is real, and my effort will always show in the way I love you.\nYou are mine right now and always will be mine till we are 70 and old."
    },
    {
      id: "roast",
      title: "To My Forever",
      content: "When I think about the future, I see you there with me. I imagine quiet mornings, shared meals, long talks, and laughter filling our home, those three dogs that you want to cook so bad and two little kids (defn both daugthers) who will share your laughter and have the smile that made me fall for you . I want to build a life where we both feel safe, valued, and deeply loved. You are not just someone I love today, you are someone I want beside me in all the days to come. I look forward to the memories we have not made yet, the places we will go, and the dreams we will chase together. My heart feels at home when it is with you. \n"
    }
  ],
  
  bucketList: [
    "Virtual Date (Cafe hopping online)",
    "Watch AOT together (500 times)",
    "Give you the Mikasa Scarf",
    "Binge JJK & make you fall in love",
    "A House with 2 floors (Dogs on ground, Us on top)",
    "Countryside house with two kids running and 3 dogs one that follows you everywhere",
    "Meet in June (the most important)"
  ],
  
  final: {
      text: "Love you, always, my forever.",
      image: "/photos/Officialy Us/main.png"
  }
};
