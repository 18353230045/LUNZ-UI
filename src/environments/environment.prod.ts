// `.env.json` is generated by the `npm run build` command
import env from './.env.json';

export const environment = {
    appName: 'LUNZ+',
    production: true,
    version: env.npm_package_version,
    localeId: 'zh-CN',
    defaultLanguage: 'en-US',
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
