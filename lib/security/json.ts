export class BodySizeLimitError extends Error {
  constructor(message = "Request body exceeds the allowed size.") {
    super(message);
    this.name = "BodySizeLimitError";
  }
}

export async function readJsonBody<T>(
  req: Request,
  maxBytes: number
): Promise<T> {
  const contentLength = req.headers.get("content-length");
  if (contentLength) {
    const parsedLength = Number(contentLength);
    if (Number.isFinite(parsedLength) && parsedLength > maxBytes) {
      throw new BodySizeLimitError();
    }
  }

  const rawBody = await req.text();
  if (Buffer.byteLength(rawBody, "utf8") > maxBytes) {
    throw new BodySizeLimitError();
  }

  return JSON.parse(rawBody) as T;
}
