"use strict";
exports.__esModule = true;
var routes = [
    {
        method: 'GET',
        path: '/js/{param*}',
        handler: {
            directory: {
                path: './public/js',
                redirectToSlash: true,
                index: true
            }
        }
    },
    {
        method: 'GET',
        path: '/css/{param*}',
        handler: {
            directory: {
                path: './public/css',
                redirectToSlash: true,
                index: true
            }
        }
    },
    {
        method: 'GET',
        path: '/img/{param*}',
        handler: {
            directory: {
                path: './public/img',
                redirectToSlash: true,
                index: true
            }
        }
    },
    {
        method: 'GET',
        path: '/fonts/{param*}',
        handler: {
            directory: {
                path: './public/fonts',
                redirectToSlash: true,
                index: true
            }
        }
    },
    {
        method: 'GET',
        path: '/media/{param*}',
        handler: {
            directory: {
                path: './public/media',
                redirectToSlash: true,
                index: true
            }
        }
    },
    {
        method: 'GET',
        path: '/{path*}',
        handler: function (request, reply) {
            reply.view('index');
        }
    }
];
exports["default"] = routes;
