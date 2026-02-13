import database from "/infra/database.js";
import { InternalServerError } from "/infra/errors";

async function status(req, res) {
  try {
    const updateAt = new Date().toISOString();
    const versionPostgres = await database.query("SHOW server_version;");
    const maxConnections = await database.query("SHOW max_connections;");

    const databaseName = process.env.POSTGRES_DB;

    const usesConnections = await database.query({
      text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
      values: [databaseName],
    });

    res.status(200).json({
      updated_at: updateAt,
      dependencies: {
        database: {
          version_db: versionPostgres.rows[0].server_version,
          max_connection_db: parseInt(maxConnections.rows[0].max_connections),
          open_connections_db: usesConnections.rows[0].count,
        },
      },
    });
  } catch (error) {
    const publicErrorObject = new InternalServerError({
      cause: error,
    });

    console.log("\n Erro do catch do controller:");
    console.error(publicErrorObject);
    res.status(500).json(publicErrorObject);
  }
}

export default status;
