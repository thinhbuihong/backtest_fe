export async function GET() {
  return new Response(JSON.stringify("ok"), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  const payload = await req.json();

  return new Response(JSON.stringify({ mes: "hello", payload }), {
    headers: { "Content-Type": "application/json" },
  });
}
