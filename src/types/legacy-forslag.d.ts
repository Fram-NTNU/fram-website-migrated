declare module "@/lib/legacy-forslag" {
  type LegacyRequest = {
    method: string;
    headers: Record<string, string>;
    body: unknown;
  };

  type LegacyResponse = {
    setHeader(name: string, value: string): LegacyResponse;
    status(code: number): LegacyResponse;
    json(payload: unknown): Response;
  };

  export default function handler(request: LegacyRequest, response: LegacyResponse): Promise<Response>;
}
