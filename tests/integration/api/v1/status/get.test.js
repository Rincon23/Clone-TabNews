import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Retriving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody.updated_at).toBeDefined();

      const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

      expect(responseBody.dependencies.database.version_db).toEqual("16.0");

      expect(responseBody.dependencies.database.max_connection_db).toEqual(100);

      expect(responseBody.dependencies.database.open_connections_db).toEqual(1);
    });
  });
});
