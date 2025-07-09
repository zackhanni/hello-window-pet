// app/api/users/route.ts
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email || !name) {
      return NextResponse.json(
        { error: "Email and name are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Database connection failed:", checkError);
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Create new user
    const { data: newUser, error: createError } = await supabase
      .from("users")
      .insert({ email, name })
      .select()
      .single();

    if (createError) {
      console.error("Error creating user:", createError);
      return NextResponse.json(
        { error: "Failed to create user" },
        { status: 500 }
      );
    }

    console.log("User created successfully:", {
      id: newUser.id,
      email: newUser.email,
    });
    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      {
        error: "Failed to create user",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}

// export async function GET() {
//   const { data: users, error } = await supabase
//     .from('users')
//     .select('*');
//
//   if (error) {
//     return NextResponse.json(
//       { error: "Failed to fetch users" },
//       { status: 500 }
//     );
//   }
//
//   return NextResponse.json(users);
// }
