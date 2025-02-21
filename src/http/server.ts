import fastify from "fastify";
import z from "zod";
import { createGoals } from "../functions/create-goals";

const app = fastify();

app.post("/goals", async (request) => {
  const createGoalsSchema = z.object({
    title: z.string(),
    desiredWeeklyFrequency: z.number().int().min(1).max(7),
  });
  const body = createGoalsSchema.parse(request.body);

  await createGoals({
    title: body.title,
    desiredWeeklyFrequency: body.desiredWeeklyFrequency,
  });
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Deu certo");
  });
