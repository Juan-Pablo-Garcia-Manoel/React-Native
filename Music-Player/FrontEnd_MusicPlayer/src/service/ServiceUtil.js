import { apiGet, apiPost } from "../../apis"
import { jwtDecode } from 'jwt-decode';

const login = (usuario, senha, profile, sucesso, erro) => {
    apiPost('Usuario/Login', { Email: usuario, Password: senha, Profile: profile }, (result) => {

        const token = result;
        const decoded = jwtDecode(token);

        const { unique_name, roles } = decoded;

        localStorage.setItem('usuario_nome', unique_name);
        localStorage.setItem('usuario_permissao', roles);

        sucesso(unique_name, roles);

        const user = {
            login: usuario,
            profile: profile,
            token: decoded.jti
        }

        return user;

    }, erro);
};

const registrarUsuario = (usuario, senha, profile, sucesso, erro) => {

    apiPost('Usuario/Criar', { Email: usuario, Password: senha, Profile: profile }, (result) => {
        const token = result;
        const decoded = jwtDecode(token);

        const { unique_name, roles } = decoded;

        localStorage.setItem('usuario_nome', unique_name);
        localStorage.setItem('usuario_permissao', roles);

        sucesso(unique_name, roles);
    }, erro);
};

const adicionaMusica = (nome, link, sucesso, erro) => {

    apiPost('Musica', { Nome: nome, Link: link }, (result) => {

        sucesso(result);
    }, erro);
};

const listaMusica = (url, sucesso, erro) => {

    apiGet('Musica', (result) => {
        sucesso(result);
    }, erro);

}

export { login, registrarUsuario, adicionaMusica, listaMusica }
