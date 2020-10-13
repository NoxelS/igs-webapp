import { environment } from 'src/environments/environment';


export const ApiEndpointArticle: { get; create; edit; remove } = {
    get: environment.backendUrl + '/articles/list',
    create: environment.backendUrl + '/articles/create',
    edit: environment.backendUrl + '/articles/edit',
    remove: environment.backendUrl + '/articles/remove'
};

export const ApiEndpointFile: { get; create; download: (id) => string; remove } = {
    get: environment.backendUrl + '/files/list',
    create: environment.backendUrl + '/files/create',
    remove: environment.backendUrl + '/files/remove',
    download: id => environment.backendUrl + '/files/get/' + id
};

export const ApiEndpointAuth: { login; info; sendRecoveryEmail; recoverPassword } = {
    login: environment.backendUrl + '/auth/login',
    info: environment.backendUrl + '/info/user',
    sendRecoveryEmail: environment.backendUrl + '/auth/recovery',
    recoverPassword: environment.backendUrl + '/auth/recover_password'
};
