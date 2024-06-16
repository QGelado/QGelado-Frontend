import publicApi from "../service/publicApi";

async function login(
  email,
  senha,
)  {
  try {
    const response = await publicApi.post('/admin/login', { email, senha });

    return response.data;
  } catch (error) {

    return null;
  }
}

async function cadastrarUsuario(
  user,
) {
  try {
    const response = await publicApi.post('/admin', user);
    console.log(response)
    return response.data;
  } catch (error) {
    return null;
  }
}

export { login, cadastrarUsuario }