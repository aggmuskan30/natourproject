import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  let { destination, days, interests, budget } = await req.json();

  const numDays = parseInt(days) || 3; 

  if (!destination) destination = "Unknown Destination";
  if (!budget) budget = "Standard";
  if (!interests) interests = "General Sightseeing";

  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Gemini API Key missing");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      ROLE: You are an elite travel concierge.
      TASK: Create a ${numDays}-day itinerary for ${destination}.
      
      USER PROFILE:
      - Budget: ${budget}
      - Interests: ${interests}

      REQUIREMENTS:
      1. Use real names of hotels and restaurants.
      2. Organize days logically by neighborhood.
      3. Return ONLY valid JSON.

      JSON FORMAT:
      {
        "tripName": "Creative Trip Title",
        "price": "${budget}", 
        "hotelRecommendation": { 
           "name": "Hotel Name",
           "location": "Location"
        },
        "dailyPlan": [
          {
            "day": 1,
            "theme": "Theme",
            "morning": "Activity",
            "afternoon": "Activity",
            "evening": "Activity"
          }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) throw new Error("No JSON found");
    
    const parsedData = JSON.parse(jsonMatch[0]);
    const root = parsedData.trip || parsedData;

    const safeTrip = {
      tripName: root.tripName || `Trip to ${destination}`,
      price: budget, 
      hotelRecommendation: { name: root.hotelRecommendation?.name || "City Center Hotel" },
      dailyPlan: Array.isArray(root.dailyPlan) ? root.dailyPlan : []
    };

    return NextResponse.json({ trip: safeTrip });

  } catch (error) {
    console.error("AI Generation Error:", error);

  
    const fallbackPlan = [];
    
    for (let i = 1; i <= numDays; i++) {
      fallbackPlan.push({
        day: i,
        theme: `Exploring ${destination} (Day ${i})`,
        morning: `Enjoy a local breakfast and visit the top landmarks in ${destination}.`,
        afternoon: `Lunch at a popular local spot and continue sightseeing nearby.`,
        evening: `Relaxing dinner and a walk through the city center.`
      });
    }

    return NextResponse.json({ 
      trip: {
        tripName: `Explore ${destination} `,
        price: budget,
        hotelRecommendation: { name: "Local Boutique Hotel" },
        dailyPlan: fallbackPlan 
      }
    });
  }
}