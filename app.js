(() => {
    'use strict';

    const
        express = require('express'),
        app = express(),
        fs = require('fs'),
        https = require('https'),
        bodyParser = require('body-parser'),
        server = require('http').Server(app),
        nodemailer = require('nodemailer');

    /*const 
        privatekey = fs.readFileSync('/etc/letsencrypt/live/wesprodev.com/privkey.pem', 'utf8'),
        certificate = fs.readFileSync('/etc/letsencrypt/live/wesprodev.com/cert.pem', 'utf8'),
        ca = fs.readFileSync('/etc/letsencrypt/live/weprodev.com/fullchain.pem', 'utf8'),
        credentials = {
            key: privatekey,
            cert: certificate,
            ca: ca
        };*/

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/', express.static(__dirname + '/dist/portfolio'));
    app.use('/node_modules', express.static(__dirname + '/node_modules'));

    app.set('PORT', process.env.PORT || 8080);
    app.set('SECURE_PORT', process.env.SECURE_PORT || 443);

    app.post('/contact', (req, res) => {
        let body = req.body;
        console.log(req);
        send_mail(body);
        res.end();
    });

    async function send_mail(contactor) {

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        let info = await transporter.sendMail({
            from: `${contactor.email} <${contactor.email}>`,
            to: 'wesley.young.portfolio@gmail.com <wesley.young.portfolio@gmail.com>',
            subject: `${contactor.name} Sent You A Message`,
            text: `New message from ${contactor.name}! 
Phone: ${contactor.phone} 
Message: ${contactor.message}

At: ${contactor.sent}`
        });

        console.log('Message sent: %s', info.messageId);

        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }

    server.listen(app.get('PORT'), () => {
        console.log(`Listening on port ${app.get('PORT')}...`);
    });

    //https.createServer(credentials, app).listen(app.get('SECURE_PORT'), () => {
    //    console.log(`Listening on secure port ${app.get('SECURE_PORT')}...`);
    //});

})();