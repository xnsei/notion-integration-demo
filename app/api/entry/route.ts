import {Client} from "@notionhq/client";

export const POST = async (req: Request) => {
    const name = req.headers.get("name");
    const email = req.headers.get("email");
    const access_token = req.headers.get("access_token") ?? "";
    let page_id = req.headers.get("page_id") ?? "";
    let database_id = req.headers.get("database_id") ?? "";

    const notion = new Client({ auth: access_token });

    if(database_id === "") {
        if(page_id === "") {
            const allPages = await notion.search({
                filter: {
                    value: "page",
                    property: "object",
                },
            });
            page_id = allPages.results[0].id;
        }
        const response = await notion.databases.create({
            parent: {
                type: "page_id",
                page_id: page_id,
            },
            icon: {
                type: "emoji",
                emoji: "📝",
            },
            cover: {
                type: "external",
                external: {
                    url: "https://images.unsplash.com/photo-1702482858444-81b00ec28c27?q=80&w=4140&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                },
            },
            title: [
                {
                    type: "text",
                    text: {
                        content: "Users",
                        link: null,
                    },
                },
            ],
            properties: {
                Name: {
                    title: {},
                },
                Email: {
                    email: {},
                },
            }
        });
        database_id = response.id;
    }

    const response = await notion.pages.create({
        parent: {
            type: "database_id",
            database_id: database_id,
        },
        properties: {
            "Name": {
                "title": [
                    {
                        "text": {
                            "content": name ?? "",
                        }
                    }
                ]
            },
            Email: {
                email: email ?? "",
            },
        },
    });

    return Response.json({ name, email, database_id, page_id, response });
}