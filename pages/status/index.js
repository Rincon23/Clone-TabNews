import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <Dependencies />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function Dependencies() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let dependencies_data = "Carregando...";

  if (!isLoading && data) {
    dependencies_data = (
      <>
        <div>
          <ul>
            <li>Versão do Banco: {data.dependencies.database.version_db}</li>
            <li>
              Máxima conexões permitidas:{" "}
              {data.dependencies.database.max_connection_db}
            </li>
            <li>
              Conexões abertas: {data.dependencies.database.open_connections_db}
            </li>
          </ul>
        </div>
      </>
    );
  }

  return (
    <>
      <h1>Data Base</h1>
      <div>{dependencies_data}</div>;
    </>
  );
}
