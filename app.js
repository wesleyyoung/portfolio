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
    app.use('/.well-known/acme-challenge/y8WChrFxgpwqKTj96uJ4x-8VsbjQ1VRneboLVB9oJp4', express.static(__dirname + '../portfolio.pem'));
    app.use('/node_modules', express.static(__dirname + '/node_modules'));

    app.set('PORT', process.env.PORT || 80);
    app.set('SECURE_PORT', process.env.SECURE_PORT || 443);

    server.listen(app.get('PORT'), () => {
        console.log(`Listening on port ${app.get('PORT')}...`);
    });

    https.createServer({
        key: fs.readFileSync('./key.pem'),
        cert: fs.readFileSync('./cert.pem'),
        passphrase: 'rottentomatoes'
    }, app).listen(app.get('SECURE_PORT'), () => {
        console.log(`Listening on secure port ${app.get('SECURE_PORT')}...`);
    });

})();