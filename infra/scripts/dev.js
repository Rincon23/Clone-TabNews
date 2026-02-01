const { spawn } = require("child_process");

function run(cmd, args) {
  return spawn(cmd, args, {
    stdio: "inherit",
    shell: true,
  });
}

console.log("Subindo serviços...");
run("npm", ["run", "services:up"]);

console.log("Aguardando banco...");
run("npm", ["run", "services:wait:database"]);

console.log("Rodando migrations...");
run("npm", ["run", "migrations:up"]);

console.log("Iniciando Next...");
const next = run("next", ["dev"]);

function shutdown() {
  console.log("\nEncerrando ambiente dev...");
  run("npm", ["run", "services:stop"]);

  process.exit(0);
}

// Captura Ctrl + C
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Se o Next cair por algum motivo
next.on("exit", shutdown);
