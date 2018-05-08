// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    appName: 'LUNZ+',
    production: false,
    version: '2.0',
    localeId: 'zh-CN',
    defaultLanguage: 'zh-CN',
    supportedLanguages: [
        'en-US',
        'fr-FR'
    ],
    authentication: {
        // oauth2 / usercenter
        type: 'usercenter',
        useServiceV1: true
    },
    odic: {
        config: {
            authority: 'http://{identity-server-domain}',
            client_id: '',
            redirect_uri: 'http://{domain}/authentication/callback',
            response_type: 'id_token token',
            scope: 'openid profile',
            post_logout_redirect_uri: 'http://{domain}'
        }
    },
    // Web Api
    serverUrl: '',
    appKey: '',
    withHeaders: false,
    // User Center
    userCenter: {
        serverUrl: '',
        appKey: '',
        authUri: ''
    },
    // Message Center
    msgCenter: {
        signalR: '',
        serverUrl: '',
        appKey: ''
    },
    // Data Center
    dataCenter: {
        serverUrl: '',
        appKey: ''
    },
    // Customer Center
    customerCenter: {
        serverUrl: '',
        appKey: '',
        authUri: ''
    }
};
