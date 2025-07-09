import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await params;

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      // If error is because no rows found, return 404
      if (
        error.code === "PGRST116" ||
        error.message?.toLowerCase().includes("no rows")
      ) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      // Otherwise, log and return 500
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Database error", details: error.message },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error finding user:", error);
    return NextResponse.json(
      {
        error: "Failed to find user",
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
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const { email } = await params;

    const { error } = await supabase.from("users").delete().eq("email", email);

    if (error) {
      console.error("Error deleting user:", error);
      return NextResponse.json(
        { error: "Failed to delete user" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "User deleted" });
  } catch (err) {
    console.log("Error deleting user:", err);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
