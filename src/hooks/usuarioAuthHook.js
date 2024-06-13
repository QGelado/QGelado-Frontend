import privateApi from "../service/privateApi";

async function deletarUsuario(
  id,
) {
  try {
    const response = await privateApi.delete(`/usuario/${id}`);

    return response.data;
  } catch (error) {
    return null;
  }
}

async function obterUsuarioPorToken(
) {
  const response = await privateApi.get('/me');
  console.log(response);
  return response.data;
}

async function atualizarUsuario(
  id,
  user,
) {
  try {
    const response = await privateApi.put(`/usuario/${id}`, user);

    return response.data;
  } catch (error) {
    return null;
  }
}

export { deletarUsuario, obterUsuarioPorToken, atualizarUsuario }