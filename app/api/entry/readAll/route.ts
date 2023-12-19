import { Client } from '@notionhq/client';

export const GET = async (req: Request): Promise<Response> => {
    let database_id: string = req.headers.get("database_id") ?? "";
    const access_token: string = req.headers.get("access_token") ?? "";
    const notion = new Client({ auth: access_token });

    let users: Array<any> = [];

    if (database_id) {
        const response = await notion.databases.query({
            database_id: database_id,
        });

        users = response.results.map((page) => {
            return {
                id: page.id,
                // @ts-ignore
                name: page?.properties.Name.title[0].plain_text ?? "",
                // @ts-ignore
                email: page?.properties.Email.email ?? "",
            };
        });
    }

    return new Response(JSON.stringify({ users }), {
        headers: { 'Content-Type': 'application/json' },
    });
};
