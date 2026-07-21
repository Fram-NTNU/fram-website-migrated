import { NextResponse } from "next/server";
import legacyHandler from "@/lib/legacy-forslag";

export const runtime = "nodejs";

type LegacyHeaders = Record<string, string>;

async function handle(request: Request) {
  const headers: LegacyHeaders = Object.fromEntries(request.headers.entries());
  let body: unknown;
  if (request.method !== "GET" && request.method !== "HEAD") {
    try {
      body = await request.json();
    } catch {
      body = undefined;
    }
  }

  let statusCode = 200;
  const responseHeaders = new Headers();
  const responseFacade = {
    setHeader(name: string, value: string) {
      responseHeaders.set(name, value);
      return responseFacade;
    },
    status(code: number) {
      statusCode = code;
      return responseFacade;
    },
    json(payload: unknown) {
      return NextResponse.json(payload, { status: statusCode, headers: responseHeaders });
    },
  };

  const result = await legacyHandler(
    { method: request.method, headers, body },
    responseFacade,
  );

  return result instanceof Response
    ? result
    : NextResponse.json({ error: "Klarte ikke behandle forespørselen." }, { status: 500 });
}

export const POST = handle;
export const GET = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
export const OPTIONS = handle;
