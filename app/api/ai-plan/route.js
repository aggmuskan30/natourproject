import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1. Log the real inputs (so you see it working)
    const { destination, budget } = await req.json();
    console.log(`📝 MOCK AI: Generating plan for ${destination} with budget ${budget}`);

    // 2. Simulate AI "thinking" time (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 3. Return "Fake" but perfect data
    const mockTrip = {
      tripName: `The Golden ${destination} Adventure`,
      price: `Est. Cost: ${budget}`,
      hotelRecommendation: {
        name: "Hotel Royal Heritage (Mock Recommendation)",
        reason: "Fits perfectly within your budget with great reviews."
      },
      travelTips: [
        "Wear comfortable shoes for walking.",
        "Carry a water bottle to stay hydrated.",
        "Try the local street food at the night market."
      ],
      dailyPlan: [
        {
          day: 1,
          theme: "History & Culture",
          morning: "Visit the City Palace and explore the museum.",
          afternoon: "Lunch at 'The Grand Peacock' followed by a fort tour.",
          evening: "Sunset walk at the Ridge and dinner at a rooftop cafe."
        },
        {
          day: 2,
          theme: "Hidden Gems",
          morning: "Explore the ancient stepwells.",
          afternoon: "Shopping for local crafts in the old bazaar.",
          evening: "Live music event at the cultural center."
        },
        {
          day: 3,
          theme: "Relaxation",
          morning: "Morning yoga session or spa visit.",
          afternoon: "Leisurely lunch and visit to the botanical gardens.",
          evening: "Farewell dinner at a luxury restaurant."
        }
      ]
    };

    return NextResponse.json({ trip: mockTrip });

  } catch (error) {
    return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
  }
}
// import { NextResponse } from "next/server";
// import OpenAI from "openai";

// // Initialize OpenAI with your key
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });


// export async function POST(req) {
    
//   try {
//     const { destination, days, budget, interests } = await req.json();

//     // A much stricter, richer prompt for "Pro" results
//     const prompt = `
//       Act as an expert local travel guide. Create a detailed ${days}-day itinerary for ${destination}.
      
//       User Preferences:
//       - Budget: ${budget} (Select hotels/restaurants matching this tier)
//       - Interests: ${interests}
      
//       REQUIREMENTS:
//       1. Divide each day into Morning, Afternoon, and Evening (Night).
//       2. Suggest specific real names of places, restaurants, and hidden gems.
//       3. Include a hotel recommendation that fits the budget.
//       4. Provide 3 practical travel tips for this specific location.
      
//       RETURN ONLY JSON (Do not write any text outside the JSON). Use this exact structure:
//       {
//         "tripName": "A catchy, exciting title for the trip",
//         "hotelRecommendation": {
//           "name": "Name of a hotel",
//           "reason": "Why it fits the budget/location"
//         },
//         "travelTips": ["Tip 1", "Tip 2", "Tip 3"],
//         "dailyPlan": [
//           {
//             "day": 1,
//             "theme": "Theme of the day (e.g., Historic Dive)",
//             "morning": "Specific activity and location",
//             "afternoon": "Specific activity and lunch spot",
//             "evening": "Night activity, dinner spot, or nightlife recommendation"
//           }
//         ]
//       }
//     `;

//     const completion = await openai.chat.completions.create({
//       messages: [
//         { 
//           role: "system", 
//           content: "You are a helpful travel assistant. You output strictly valid JSON." 
//         },
//         { 
//           role: "user", 
//           content: prompt 
//         }
//       ],
//       model: "gpt-3.5-turbo-0125", 
//       response_format: { type: "json_object" }, 
//     });

//     // Parse the result
//     const tripData = JSON.parse(completion.choices[0].message.content);
    
//     return NextResponse.json({ trip: tripData });

//   } catch (error) {
//     console.error("OpenAI Error:", error);
//     return NextResponse.json({ message: "Failed to generate itinerary", error: error.message }, { status: 500 });
//   }
// }