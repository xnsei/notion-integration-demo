export const GET = async (req: Request, res: Response) => {
    const code = req.headers.get("code");
    const OAUTH_CLIENT_ID = "44b02fd9-d231-4c3f-857f-04d5e5f9779c";
    const OAUTH_CLIENT_SECRET = "secret_gysVyT5LFjJf7MVTXNuMiJeQVUHssBdpuq4lueNcwJ0";
    const encoded = Buffer.from(`${OAUTH_CLIENT_ID}:${OAUTH_CLIENT_SECRET}`).toString("base64");
    const redirectUri = "https://notion-integration-1.vercel.app/";

    const response = await fetch("https://api.notion.com/v1/oauth/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Basic ${encoded}`,
      },
      body: JSON.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: redirectUri,
      }),
    });
    const data = await response.json();

    return Response.json(data);
}
