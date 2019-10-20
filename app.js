(() => {
    'use strict';

    const
        express = require('express'),
        app = express(),
        fs = require('fs'),
        https = require('https'),
        bodyParser = require('body-parser'),
        server = require('http').Server(app);

    const 
        privatekey = fs.readFileSync('/etc/letsencrypt/live/wesprodev.com/privkey.pem', 'utf8'),
        certificate = fs.readFileSync('/etc/letsencrypt/live/wesprodev.com/cert.pem', 'utf8'),
        ca = fs.readFileSync('/etc/letsencrypt/live/weprodev.com/chain.pem', 'utf8'),
        credentials = {
            key: privatekey,
            cert: certificate,
            ca: ca
        };

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/', express.static(__dirname + '/dist/portfolio'));
    app.use('/node_modules', express.static(__dirname + '/node_modules'));

    app.set('PORT', process.env.PORT || 80);
    app.set('SECURE_PORT', process.env.SECURE_PORT || 443);

    server.listen(app.get('PORT'), () => {
        console.log(`Listening on port ${app.get('PORT')}...`);
    });

    https.createServer(credentials, app).listen(app.get('SECURE_PORT'), () => {
        console.log(`Listening on secure port ${app.get('SECURE_PORT')}...`);
    });

})();