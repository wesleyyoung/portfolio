(() => {
    'use strict';

    const
        express = require('express'),
        app = express(),
        fs = require('fs'),
        https = require('https'),
        bodyParser = require('body-parser'),
        server = require('http').Server(app);

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/', express.static(__dirname + '/dist/portfolio'));
    app.use('/node_modules', express.static(__dirname + '/node_modules'));

    app.set('PORT', process.env.PORT || 80);
    app.set('SECURE_PORT', process.env.SECURE_PORT || 443);
    
    app.get('/.well-known/acme-challenge/ZibEaizWsGA1R2JcugHGYKsiYgfO85uZ2EaBPYOxvd0', (res, req) => {
        res.end(fs.readFileSync(__dirname + '../portfolio.pem'));
    })

    server.listen(app.get('PORT'), () => {
        console.log(`Listening on port ${app.get('PORT')}...`);
    });

    /*https.createServer(app).listen(app.get('SECURE_PORT'), () => {
        console.log(`Listening on secure port ${app.get('SECURE_PORT')}...`);
    });*/

})();