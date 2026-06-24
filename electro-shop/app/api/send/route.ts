import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, phone, address, items, total } = body;

    if (!name || !phone || !address) {
      return Response.json(
        { success: false, error: "Missing fields" },
        { status: 400 }
      );
    }

    const productList = items
      .map(
        (item: any) =>
          `${item.name} × ${item.quantity} = ${
            item.price * item.quantity
          } AZN`
      )
      .join("\n");

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["delivered@resend.dev"],
      subject: "Yeni sifariş 🛒",
      text: `
Ad: ${name}
Telefon: ${phone}
Ünvan: ${address}

Məhsullar:
${productList}

Total: ${total} AZN
      `,
    });

    return Response.json({ success: true, data });
  } catch (err: any) {
    console.error("EMAIL ERROR:", err);

    return Response.json(
      {
        success: false,
        error: err?.message || "Server error",
      },
      { status: 500 }
    );
  }
}