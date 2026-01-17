import dbConnect from '@/lib/db';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await dbConnect();

    const { name, email, password } = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const newUser = await User.create({
      name,
      email,
      password, 
    });

    return NextResponse.json({ message: "User created!", user: newUser }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: "Error creating user", error: error.message }, { status: 500 });
  }
}