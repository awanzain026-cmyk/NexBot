import { Chatbot } from "./types";

export const DEMO_CHATBOT: Chatbot = {
  id: "demo-ahmad-restaurant",
  businessInfo: {
    name: "Ahmad's Restaurant",
    type: "Restaurant",
    description: "Authentic Pakistani cuisine restaurant located in Clifton, Karachi. We serve traditional dishes including biryani, karahi, nihari, and more. Family-friendly dining with both indoor and outdoor seating.",
    openingHours: "Mon-Sun: 11:00 AM - 11:00 PM",
    address: "Block 5, Clifton, Karachi",
    phone: "+92-300-1234567",
    website: "https://ahmadsrestaurant.com",
  },
  knowledgeBase: {
    faqs: [
      {
        question: "Do you offer delivery?",
        answer: "Yes! We offer free delivery within Clifton and Defence areas. Minimum order Rs.500. Delivery time is 30-45 minutes.",
      },
      {
        question: "Do you have parking?",
        answer: "Yes, we have free valet parking available for all customers.",
      },
      {
        question: "Can I make a reservation?",
        answer: "Absolutely! You can call us at +92-300-1234567 or book through our website. We recommend reserving on weekends.",
      },
      {
        question: "Do you have any special deals?",
        answer: "Yes! We have Lunch Special (12-4pm): 15% off on all main dishes. Family Deal (for 4 people): 2 Biryani + 1 Karahi + 4 Drinks at Rs.1,200.",
      },
      {
        question: "What are your most popular dishes?",
        answer: "Our customers love our Chicken Biryani (Rs.350), Mutton Karahi (Rs.450), and Nihari (Rs.400).",
      },
    ],
    services: [
      { name: "Chicken Biryani", description: "Fragrant basmati rice with tender chicken, aromatic spices", price: "Rs.350" },
      { name: "Mutton Karahi", description: "Slow-cooked mutton with tomatoes, ginger, and green chilies", price: "Rs.450" },
      { name: "Beef Nihari", description: "Slow-cooked beef shank in rich, spiced gravy", price: "Rs.400" },
      { name: "Chai (Tea)", description: "Traditional Pakistani milk tea with cardamom", price: "Rs.50" },
    ],
    extraInfo: "We also cater for events and parties. Our banquet hall can accommodate up to 100 guests. We serve both halal certified meat. Kids menu available.",
  },
  customization: {
    botName: "Zara",
    personality: "Friendly",
    primaryColor: "#00FFD1",
    welcomeMessage: "Hello! 👋 I'm Zara, Ahmad's Restaurant virtual assistant. I can help you with menu items, prices, opening hours, reservations, and more! How can I help you today?",
    fallbackMessage: "Great question! For more details, please call us at +92-300-1234567.",
    language: "English",
  },
  status: "active",
  createdAt: "2024-06-15",
  conversations: 1284,
};

export const SAMPLE_FAQS = [
  { question: "What are your opening hours?", answer: "We are open from 11 AM to 11 PM, seven days a week." },
  { question: "Do you offer delivery?", answer: "Yes, we offer free delivery within a 5km radius for orders above Rs.500." },
  { question: "Is parking available?", answer: "Yes, we have free parking available for all customers." },
];

export const SAMPLE_SERVICES = [
  { name: "Sample Service 1", description: "Description of service", price: "$XX" },
  { name: "Sample Service 2", description: "Description of service", price: "$XX" },
];

export const SAMPLE_ANALYTICS = {
  totalConversations: 1284,
  weeklyConversations: 247,
  satisfactionScore: 94,
  mostAskedQuestions: [
    { question: "What are your opening hours?", count: 342 },
    { question: "Do you deliver to my area?", count: 289 },
    { question: "What's on the menu?", count: 231 },
    { question: "How do I make a reservation?", count: 178 },
    { question: "What are your prices?", count: 156 },
  ],
  peakHours: [
    { hour: "9AM", conversations: 12 },
    { hour: "10AM", conversations: 18 },
    { hour: "11AM", conversations: 25 },
    { hour: "12PM", conversations: 42 },
    { hour: "1PM", conversations: 38 },
    { hour: "2PM", conversations: 30 },
    { hour: "3PM", conversations: 22 },
    { hour: "4PM", conversations: 20 },
    { hour: "5PM", conversations: 28 },
    { hour: "6PM", conversations: 45 },
    { hour: "7PM", conversations: 55 },
    { hour: "8PM", conversations: 48 },
    { hour: "9PM", conversations: 35 },
    { hour: "10PM", conversations: 20 },
  ],
};
