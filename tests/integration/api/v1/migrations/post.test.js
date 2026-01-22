import database from "infra/database.js";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public");
});

test("POST to /api/v1/migrations should return 200", async () => {
  const res1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(res1.status).toBe(201);

  const res1ponseBody = await res1.json();

  expect(Array.isArray(res1ponseBody)).toBe(true);
  expect(res1ponseBody.length).toBeGreaterThan(0);

  const res2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(res2.status).toBe(200);

  const res2ponseBody = await res2.json();

  expect(Array.isArray(res2ponseBody)).toBe(true);
  expect(res2ponseBody.length).toBe(0);
});
