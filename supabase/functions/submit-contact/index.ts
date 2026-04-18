import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    // Server-side validation
    const errors: string[] = [];

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      errors.push("Name is required");
    } else if (name.trim().length > 100) {
      errors.push("Name must be 100 characters or less");
    }

    if (!email || typeof email !== "string" || !isValidEmail(email.trim())) {
      errors.push("A valid email is required");
    } else if (email.trim().length > 254) {
      errors.push("Email must be 254 characters or less");
    }

    if (phone && (typeof phone !== "string" || phone.trim().length > 20)) {
      errors.push("Phone must be 20 characters or less");
    }

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      errors.push("Message is required");
    } else if (message.trim().length > 2000) {
      errors.push("Message must be 2000 characters or less");
    }

    if (errors.length > 0) {
      return new Response(JSON.stringify({ error: errors.join(", ") }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Sanitize inputs
    const sanitized = {
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 254),
      phone: phone ? phone.trim().slice(0, 20) : null,
      message: message.trim().slice(0, 2000),
    };

    // Insert using service role to bypass RLS
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { error: dbError } = await supabaseAdmin
      .from("contact_messages")
      .insert([sanitized]);

    if (dbError) {
      console.error("DB insert error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save message" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ error: "Invalid request" }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
