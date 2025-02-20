import { client, db } from "./index";
import { goalsCompletions, goals } from "./schema";
import dayjs from "dayjs";

async function seed() {
  await db.delete(goalsCompletions);
  await db.delete(goals);

  const startOfWeek = dayjs().startOf("week");

  const result = await db
    .insert(goals)
    .values([
      {
        title: "Acordar cedo",
        desiredWeeklyFrequency: 7,
      },
      {
        title: "Meditar",
        desiredWeeklyFrequency: 2,
      },
      {
        title: "Academia",
        desiredWeeklyFrequency: 3,
      },
    ])
    .returning();

  await db.insert(goalsCompletions).values([
    { goalId: result[0].id, createdAt: startOfWeek.toDate() },
    { goalId: result[0].id, createdAt: startOfWeek.add(1, "day").toDate() },
  ]);
}

seed().finally(() => client.end());
