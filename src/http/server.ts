import fastify from "fastify";
import z from "zod";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";
import { createGoals } from "../functions/create-goals";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.post(
  "/goals",
  {
    schema: {
      body: z.object({
        title: z.string(),
        desiredWeeklyFrequency: z.number().int().min(1).max(7),
      }),
    },
  },
  async (request) => {
    const { title, desiredWeeklyFrequency } = request.body;
    await createGoals({
      title,
      desiredWeeklyFrequency,
    });
  }
);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("Deu certo");
  });
