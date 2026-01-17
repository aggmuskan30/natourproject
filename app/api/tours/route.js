import connectDB from "@/lib/db";
import Tour from "@/models/tour";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
 
    return NextResponse.json({ message: "Database connection successful!" });
  } catch (error) {
    return NextResponse.json({ message: "Error connecting to DB" }, { status: 500 });
  }
}
