export const GET = async (req: Request, res: Response) => {
    const code = req.headers.get("code");
    const OAUTH_CLIENT_ID = "166dcda3-f0de-4629-807e-8ecd3f50778c";
    const OAUTH_CLIENT_SECRET = "secret_yWzrc4FxBpMgtVwe4mmXIBjlRYkJ2tIrRjhC2KhPRa6";
    const encoded = Buffer.from(`${OAUTH_CLIENT_ID}:${OAUTH_CLIENT_SECRET}`).toString("base64");
    const redirectUri = "http://localhost:3000/";

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