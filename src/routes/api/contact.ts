import type { RequestHandler } from "@sveltejs/kit";

interface Locals {}

export const post: RequestHandler<Locals, FormData> = async (req) => {
  const name = req.body.get("name");
  const email = req.body.get("email");
  const query = req.body.get("query");

  console.log(name, email, query);

  return {
    status: 200,
  };
};
