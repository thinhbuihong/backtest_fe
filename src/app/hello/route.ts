export async function GET() {
  return Response.json("ok");
}

export async function POST(req: Request) {
  const payload = await req.json();

  return Response.json({ mes: "hello", payload });
}
