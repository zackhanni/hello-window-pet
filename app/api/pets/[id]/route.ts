// app/api/pets/[id]/route.ts
import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data: pet, error } = await supabase
      .from("pets")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Database connection failed:", error);
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    if (!pet)
      return NextResponse.json({ error: "Pet not found" }, { status: 404 });
    return NextResponse.json(pet);
  } catch (error) {
    console.error("Error fetching pet:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch pet",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { name, description, species, age, imageUrl } = await req.json();

    const { data: updatedPet, error } = await supabase
      .from("pets")
      .update({ name, description, species, age, image_url: imageUrl })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Database connection failed:", error);
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedPet);
  } catch (error) {
    console.error("Error updating pet:", error);
    return NextResponse.json(
      {
        error: "Failed to update pet",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { error } = await supabase.from("pets").delete().eq("id", id);

    if (error) {
      console.error("Database connection failed:", error);
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Pet deleted" });
  } catch (error) {
    console.error("Error deleting pet:", error);
    return NextResponse.json(
      {
        error: "Failed to delete pet",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}
