import publicApi from "../service/publicApi";

async function login(
  email,
  senha,
)  {
  try {
    const response = await publicApi.post('/usuario/login', { email, senha });

    return response.data;
  } catch (error) {

    return null;
  }
}

async function cadastrarUsuario(
  user,
) {
  try {
    const response = await publicApi.post('/usuario', user);
    console.log(response)
    return response.data;
  } catch (error) {
    return null;
  }
}

export { login, cadastrarUsuario }