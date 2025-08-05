import { Language, Lesson } from '@/types';

export const languages: Language[] = [
  {
    id: 'spanish',
    name: 'Spanish',
    flag: '🇪🇸',
    color: 'from-red-500 to-yellow-500'
  },
  {
    id: 'french',
    name: 'French',
    flag: '🇫🇷',
    color: 'from-blue-500 to-red-500'
  },
  {
    id: 'german',
    name: 'German',
    flag: '🇩🇪',
    color: 'from-gray-800 to-red-600'
  },
  {
    id: 'japanese',
    name: 'Japanese',
    flag: '🇯🇵',
    color: 'from-red-600 to-white'
  },
  {
    id: 'arabic',
    name: 'Arabic',
    flag: '🇸🇦',
    color: 'from-green-600 to-white'
  }
];

export const lessonsData: Record<string, Lesson[]> = {
  spanish: [
    {
      id: 'spanish-basics-1',
      languageId: 'spanish',
      title: 'Basic Greetings',
      description: 'Learn essential Spanish greetings and introductions',
      difficulty: 'beginner',
      xpReward: 50,
      funFact: "In Spain, it's common to give two kisses on the cheek when greeting friends!",
      exercises: [
        {
          id: 'sp-1-1',
          type: 'multiple-choice',
          question: 'How do you say "Hello" in Spanish?',
          options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
          correctAnswer: 'Hola',
          explanation: 'Hola is the most common way to say hello in Spanish.',
          xpValue: 10
        },
        {
          id: 'sp-1-2',
          type: 'fill-blank',
          question: 'Complete: Buenos _____ (Good morning)',
          correctAnswer: 'días',
          explanation: 'Buenos días means "Good morning" in Spanish.',
          xpValue: 15
        },
        {
          id: 'sp-1-3',
          type: 'drag-drop',
          question: 'Match the Spanish greetings with their English meanings:',
          options: ['Hola', 'Adiós', 'Buenas noches', 'Hasta luego'],
          correctAnswer: ['Hello', 'Goodbye', 'Good night', 'See you later'],
          xpValue: 20
        },
        {
          id: 'sp-1-4',
          type: 'story-mode',
          question: 'You meet María at a café in Madrid. What do you say?',
          options: ['¡Hola, María! ¿Cómo estás?', '¡Adiós, María!', 'No hablo español'],
          correctAnswer: '¡Hola, María! ¿Cómo estás?',
          explanation: 'This is the appropriate greeting when meeting someone you know.',
          xpValue: 25
        }
      ]
    },
    {
      id: 'spanish-food-1',
      languageId: 'spanish',
      title: 'Food & Drinks',
      description: 'Learn about Spanish cuisine and how to order food',
      difficulty: 'beginner',
      xpReward: 60,
      funFact: "Spanish people typically eat dinner very late, often after 9 PM!",
      exercises: [
        {
          id: 'sp-2-1',
          type: 'multiple-choice',
          question: 'What is "agua" in English?',
          options: ['Food', 'Water', 'Coffee', 'Tea'],
          correctAnswer: 'Water',
          explanation: 'Agua means water in Spanish.',
          xpValue: 10
        },
        {
          id: 'sp-2-2',
          type: 'fill-blank',
          question: 'I would like coffee: Quisiera _____',
          correctAnswer: 'café',
          explanation: 'Café means coffee in Spanish.',
          xpValue: 15
        },
        {
          id: 'sp-2-3',
          type: 'story-mode',
          question: 'You\'re at a Spanish restaurant. How do you ask for the menu?',
          options: ['¿La carta, por favor?', '¿Cuánto cuesta?', '¡Qué rico!'],
          correctAnswer: '¿La carta, por favor?',
          explanation: 'This is the polite way to ask for a menu in Spanish.',
          xpValue: 25
        }
      ]
    },
    {
      id: 'spanish-numbers-1',
      languageId: 'spanish',
      title: 'Numbers 1-20',
      description: 'Master Spanish numbers for everyday use',
      difficulty: 'beginner',
      xpReward: 55,
      funFact: "Spanish numbers are fairly easy - once you know 1-15, the rest follow patterns!",
      exercises: [
        {
          id: 'sp-3-1',
          type: 'multiple-choice',
          question: 'How do you say "five" in Spanish?',
          options: ['cuatro', 'cinco', 'seis', 'siete'],
          correctAnswer: 'cinco',
          explanation: 'Cinco means five in Spanish.',
          xpValue: 10
        },
        {
          id: 'sp-3-2',
          type: 'fill-blank',
          question: 'Ten in Spanish: _____',
          correctAnswer: 'diez',
          explanation: 'Diez means ten in Spanish.',
          xpValue: 15
        }
      ]
    }
  ],
  french: [
    {
      id: 'french-basics-1',
      languageId: 'french',
      title: 'French Essentials',
      description: 'Master basic French phrases and pronunciation',
      difficulty: 'beginner',
      xpReward: 50,
      funFact: "French is spoken in 29 countries around the world!",
      exercises: [
        {
          id: 'fr-1-1',
          type: 'multiple-choice',
          question: 'How do you say "Hello" in French?',
          options: ['Bonjour', 'Au revoir', 'Merci', 'S\'il vous plaît'],
          correctAnswer: 'Bonjour',
          explanation: 'Bonjour is the standard greeting in French.',
          xpValue: 10
        },
        {
          id: 'fr-1-2',
          type: 'fill-blank',
          question: 'Thank you: _____',
          correctAnswer: 'Merci',
          explanation: 'Merci means thank you in French.',
          xpValue: 15
        },
        {
          id: 'fr-1-3',
          type: 'story-mode',
          question: 'You enter a French café. How do you greet the server?',
          options: ['Bonjour!', 'Au revoir!', 'Bonsoir!'],
          correctAnswer: 'Bonjour!',
          explanation: 'Bonjour is used during the day to greet people politely.',
          xpValue: 20
        }
      ]
    },
    {
      id: 'french-numbers-1',
      languageId: 'french',
      title: 'Numbers 1-10',
      description: 'Learn to count from 1 to 10 in French',
      difficulty: 'beginner',
      xpReward: 55,
      funFact: "In French, 70 is 'soixante-dix' which literally means 'sixty-ten'!",
      exercises: [
        {
          id: 'fr-2-1',
          type: 'multiple-choice',
          question: 'What is "trois" in English?',
          options: ['Two', 'Three', 'Four', 'Five'],
          correctAnswer: 'Three',
          explanation: 'Trois means three in French.',
          xpValue: 10
        },
        {
          id: 'fr-2-2',
          type: 'fill-blank',
          question: 'One in French: _____',
          correctAnswer: 'un',
          explanation: 'Un means one in French.',
          xpValue: 15
        }
      ]
    },
    {
      id: 'french-food-1',
      languageId: 'french',
      title: 'French Cuisine',
      description: 'Learn vocabulary for French food and dining',
      difficulty: 'beginner',
      xpReward: 60,
      funFact: "France has over 400 types of cheese!",
      exercises: [
        {
          id: 'fr-3-1',
          type: 'multiple-choice',
          question: 'What is "pain" in English?',
          options: ['Wine', 'Bread', 'Cheese', 'Milk'],
          correctAnswer: 'Bread',
          explanation: 'Pain means bread in French.',
          xpValue: 10
        },
        {
          id: 'fr-3-2',
          type: 'drag-drop',
          question: 'Match French foods with English:',
          options: ['fromage', 'eau', 'vin', 'pomme'],
          correctAnswer: ['cheese', 'water', 'wine', 'apple'],
          xpValue: 20
        }
      ]
    }
  ],
  german: [
    {
      id: 'german-basics-1',
      languageId: 'german',
      title: 'German Greetings',
      description: 'Learn essential German greetings and expressions',
      difficulty: 'beginner',
      xpReward: 50,
      funFact: "German has the longest words in the world - some can be over 40 letters long!",
      exercises: [
        {
          id: 'de-1-1',
          type: 'multiple-choice',
          question: 'How do you say "Hello" in German?',
          options: ['Hallo', 'Tschüss', 'Danke', 'Bitte'],
          correctAnswer: 'Hallo',
          explanation: 'Hallo is the common way to say hello in German.',
          xpValue: 10
        },
        {
          id: 'de-1-2',
          type: 'fill-blank',
          question: 'Please in German: _____',
          correctAnswer: 'bitte',
          explanation: 'Bitte means please in German.',
          xpValue: 15
        },
        {
          id: 'de-1-3',
          type: 'story-mode',
          question: 'You meet Hans in Berlin. How do you introduce yourself?',
          options: ['Hallo, ich bin [your name]', 'Tschüss!', 'Sprechen Sie Englisch?'],
          correctAnswer: 'Hallo, ich bin [your name]',
          explanation: 'This is how you introduce yourself in German.',
          xpValue: 20
        }
      ]
    },
    {
      id: 'german-numbers-1',
      languageId: 'german',
      title: 'German Numbers',
      description: 'Master German numbers 1-20',
      difficulty: 'beginner',
      xpReward: 55,
      funFact: "German numbers are read backwards after 20! 21 is 'einundzwanzig' (one-and-twenty)",
      exercises: [
        {
          id: 'de-2-1',
          type: 'multiple-choice',
          question: 'What is "zwei" in English?',
          options: ['One', 'Two', 'Three', 'Four'],
          correctAnswer: 'Two',
          explanation: 'Zwei means two in German.',
          xpValue: 10
        },
        {
          id: 'de-2-2',
          type: 'fill-blank',
          question: 'Three in German: _____',
          correctAnswer: 'drei',
          explanation: 'Drei means three in German.',
          xpValue: 15
        }
      ]
    },
    {
      id: 'german-family-1',
      languageId: 'german',
      title: 'Family Members',
      description: 'Learn German vocabulary for family',
      difficulty: 'beginner',
      xpReward: 60,
      funFact: "In German, all nouns are capitalized!",
      exercises: [
        {
          id: 'de-3-1',
          type: 'multiple-choice',
          question: 'What is "Mutter" in English?',
          options: ['Father', 'Mother', 'Sister', 'Brother'],
          correctAnswer: 'Mother',
          explanation: 'Mutter means mother in German.',
          xpValue: 10
        },
        {
          id: 'de-3-2',
          type: 'drag-drop',
          question: 'Match German family words:',
          options: ['Vater', 'Schwester', 'Bruder', 'Kind'],
          correctAnswer: ['father', 'sister', 'brother', 'child'],
          xpValue: 20
        }
      ]
    }
  ],
  japanese: [
    {
      id: 'japanese-basics-1',
      languageId: 'japanese',
      title: 'Japanese Greetings',
      description: 'Learn polite Japanese greetings and basic expressions',
      difficulty: 'beginner',
      xpReward: 50,
      funFact: "Japanese has three writing systems: Hiragana, Katakana, and Kanji!",
      exercises: [
        {
          id: 'jp-1-1',
          type: 'multiple-choice',
          question: 'How do you say "Hello" in Japanese?',
          options: ['こんにちは (Konnichiwa)', 'さようなら (Sayonara)', 'ありがとう (Arigato)', 'すみません (Sumimasen)'],
          correctAnswer: 'こんにちは (Konnichiwa)',
          explanation: 'Konnichiwa is the standard greeting in Japanese.',
          xpValue: 10
        },
        {
          id: 'jp-1-2',
          type: 'fill-blank',
          question: 'Thank you: ありがとう (_____)',
          correctAnswer: 'Arigato',
          explanation: 'Arigato means thank you in Japanese.',
          xpValue: 15
        },
        {
          id: 'jp-1-3',
          type: 'story-mode',
          question: 'You bow and greet someone in Tokyo. What do you say?',
          options: ['こんにちは (Konnichiwa)', 'さようなら (Sayonara)', 'おはよう (Ohayo)'],
          correctAnswer: 'こんにちは (Konnichiwa)',
          explanation: 'Konnichiwa is appropriate for daytime greetings.',
          xpValue: 20
        }
      ]
    },
    {
      id: 'japanese-numbers-1',
      languageId: 'japanese',
      title: 'Japanese Numbers',
      description: 'Learn to count in Japanese using both systems',
      difficulty: 'beginner',
      xpReward: 55,
      funFact: "Japanese has two number systems - one native Japanese, one borrowed from Chinese!",
      exercises: [
        {
          id: 'jp-2-1',
          type: 'multiple-choice',
          question: 'What is "san (三)" in English?',
          options: ['One', 'Two', 'Three', 'Four'],
          correctAnswer: 'Three',
          explanation: 'San means three in Japanese.',
          xpValue: 10
        },
        {
          id: 'jp-2-2',
          type: 'fill-blank',
          question: 'One in Japanese: _____ (一)',
          correctAnswer: 'ichi',
          explanation: 'Ichi means one in Japanese.',
          xpValue: 15
        }
      ]
    },
    {
      id: 'japanese-food-1',
      languageId: 'japanese',
      title: 'Japanese Food',
      description: 'Essential vocabulary for Japanese cuisine',
      difficulty: 'beginner',
      xpReward: 60,
      funFact: "Japanese people say 'itadakimasu' before eating to show gratitude!",
      exercises: [
        {
          id: 'jp-3-1',
          type: 'multiple-choice',
          question: 'What is "sushi (寿司)" in English?',
          options: ['Rice', 'Fish', 'Sushi', 'Noodles'],
          correctAnswer: 'Sushi',
          explanation: 'Sushi is the same in both languages.',
          xpValue: 10
        },
        {
          id: 'jp-3-2',
          type: 'drag-drop',
          question: 'Match Japanese food words:',
          options: ['gohan', 'mizu', 'sakana', 'yasai'],
          correctAnswer: ['rice', 'water', 'fish', 'vegetables'],
          xpValue: 20
        }
      ]
    }
  ],
  arabic: [
    {
      id: 'arabic-basics-1',
      languageId: 'arabic',
      title: 'Arabic Essentials',
      description: 'Learn basic Arabic greetings and phrases',
      difficulty: 'beginner',
      xpReward: 50,
      funFact: "Arabic is read from right to left and has 28 letters!",
      exercises: [
        {
          id: 'ar-1-1',
          type: 'multiple-choice',
          question: 'How do you say "Peace be upon you" in Arabic?',
          options: ['السلام عليكم (As-salamu alaykum)', 'مع السلامة (Ma\'a salama)', 'شكرا (Shukran)', 'من فضلك (Min fadlik)'],
          correctAnswer: 'السلام عليكم (As-salamu alaykum)',
          explanation: 'As-salamu alaykum is the traditional Islamic greeting.',
          xpValue: 10
        },
        {
          id: 'ar-1-2',
          type: 'fill-blank',
          question: 'Thank you: _____ (شكرا)',
          correctAnswer: 'Shukran',
          explanation: 'Shukran means thank you in Arabic.',
          xpValue: 15
        },
        {
          id: 'ar-1-3',
          type: 'story-mode',
          question: 'You enter a mosque in Cairo. How do you greet people?',
          options: ['السلام عليكم (As-salamu alaykum)', 'مرحبا (Marhaba)', 'أهلا (Ahlan)'],
          correctAnswer: 'السلام عليكم (As-salamu alaykum)',
          explanation: 'This is the traditional and respectful greeting.',
          xpValue: 20
        }
      ]
    },
    {
      id: 'arabic-numbers-1',
      languageId: 'arabic',
      title: 'Arabic Numbers',
      description: 'Learn Arabic numerals and counting',
      difficulty: 'beginner',
      xpReward: 55,
      funFact: "Arabic numerals (1,2,3...) that we use today actually originated from Arabic!",
      exercises: [
        {
          id: 'ar-2-1',
          type: 'multiple-choice',
          question: 'What is "thalatha (ثلاثة)" in English?',
          options: ['One', 'Two', 'Three', 'Four'],
          correctAnswer: 'Three',
          explanation: 'Thalatha means three in Arabic.',
          xpValue: 10
        },
        {
          id: 'ar-2-2',
          type: 'fill-blank',
          question: 'One in Arabic: _____ (واحد)',
          correctAnswer: 'wahid',
          explanation: 'Wahid means one in Arabic.',
          xpValue: 15
        }
      ]
    },
    {
      id: 'arabic-family-1',
      languageId: 'arabic',
      title: 'Family in Arabic',
      description: 'Learn Arabic words for family members',
      difficulty: 'beginner',
      xpReward: 60,
      funFact: "Arabic has different words for maternal and paternal relatives!",
      exercises: [
        {
          id: 'ar-3-1',
          type: 'multiple-choice',
          question: 'What is "umm (أم)" in English?',
          options: ['Father', 'Mother', 'Sister', 'Brother'],
          correctAnswer: 'Mother',
          explanation: 'Umm means mother in Arabic.',
          xpValue: 10
        },
        {
          id: 'ar-3-2',
          type: 'drag-drop',
          question: 'Match Arabic family words:',
          options: ['ab', 'ukht', 'akh', 'ibn'],
          correctAnswer: ['father', 'sister', 'brother', 'son'],
          xpValue: 20
        }
      ]
    }
  ]
};