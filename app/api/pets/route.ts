// app/api/pets/route.ts
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data: pets, error } = await supabase
      .from("pets")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Database connection failed:", error);
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(pets || []);
  } catch (error) {
    console.error("Error fetching pets:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch pets",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId, name, description, species, age } = await req.json();

    if (!userId || !name) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data: newPet, error } = await supabase
      .from("pets")
      .insert({
        user_id: userId,
        name,
        description,
        species,
        age,
        image_url: null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating pet:", error);
      return NextResponse.json(
        { error: "Failed to create pet" },
        { status: 500 }
      );
    }

    return NextResponse.json(newPet);
  } catch (error) {
    console.error("Error creating pet:", error);
    return NextResponse.json(
      {
        error: "Failed to create pet",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}
