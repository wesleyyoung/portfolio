(() => {
    'use strict';

    const
        express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        server = require('http').Server(app);

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/', express.static(__dirname + '/dist/portfolio'));
    app.use('/node_modules', express.static(__dirname + '/node_modules'));

    app.set('PORT', process.env.PORT || 80);

    server.listen(app.get('PORT'), () => {
        console.log(`Listening on port ${app.get('PORT')}...`);
    });

})();