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
        type: 'oauth2',
        useServiceV1: true
    },
    odic: {
        config: {
            authority: 'https://identityauth.lunz.cn',
            client_id: 'lunz-ui-stage',
            redirect_uri: 'http://template.m.lunztech.cn/authentication/callback',
            response_type: 'id_token token',
            scope: 'openid profile api1',
            post_logout_redirect_uri: 'http://template.m.lunztech.cn'
        }
    },
    api: {
        default: 'v1',
        // WebAPI for V2 - Microservice
        v2: {
            baseUrl: '//apigwtemplate.m.lunztech.cn/api/v1/'
        },
        // WebAPI for V1
        v1: {
            baseUrl: '//lunz-sharp.lunztech.cn/api/',
            appKey: 'a9ee8aaa-9c5b-4f56-9cb0-3a840b6e27f9',
            withHeaders: true
        },
        // User Center
        userCenter: {
            baseUrl: '//usercenter2015.lunztech.cn/api/',
            appKey: '4f500000-4c4f-0200-903a-08d4ccde1e74',
            authUri: '//usercenter2015.lunztech.cn/'
        },
        // Message Center
        messageCenter: {
            signalR: '//messagecenter.lunztech.cn/',
            baseUrl: '//messagecenter.lunztech.cn/api/',
            appKey: '53cdc9ab-4c9f-420b-b727-fe0602a7387c'
        },
        // Data Center
        dataCenter: {
            baseUrl: '//datacenter.lunztech.cn/api/',
            appKey: '536babcc-dd54-42fb-b43e-31c80b7afa74'
        },
        // Customer Center
        customerCenter: {
            baseUrl: '//customercenter.lunztech.cn/api/',
            appKey: 'cc9065db-9b87-43b9-9917-0c4b5b4fc9d3'
        }
    }
};
