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
    api: {
        default: 'v1',
        // WebAPI for V2 - Microservice
        v2: {
            baseUrl: ''
        },
        // WebAPI for V1
        v1: {
            baseUrl: '',
            appKey: '',
            withHeaders: true
        },
        // User Center
        userCenter: {
            baseUrl: '',
            appKey: '',
            authUri: ''
        },
        // Message Center
        messageCenter: {
            signalR: '',
            baseUrl: '',
            appKey: ''
        },
        // Data Center
        dataCenter: {
            baseUrl: '',
            appKey: ''
        },
        // Customer Center
        customerCenter: {
            baseUrl: '',
            appKey: ''
        }
    }
};
