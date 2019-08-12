const express = require('express');
port = process.env.PORT || 5200;

// const app = express();

// const forceSSL = function() {
//     return function (req, res, next) {
//       if (req.headers['x-forwarded-proto'] !== 'https') {
//         return res.redirect(
//          ['https://', req.get('Host'), req.url].join('')
//         );
//       }
//       next();
//     }
//   }

// app.use(forceSSL());


// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname + '/dist/index.html'));
//   });

// // Run the app by serving the static files
// // in the dist directory
// app.use(express.static(__dirname + '/dist'));

// // Start the app by listening on the default
// // Heroku port
// app.listen(process.env.PORT || 5200);const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/index.html'));
});

// Start the app by listening on the default Heroku port

app.listen(process.env.PORT || 5200,function(){
    console.log('dashboard application started on: ' + port);
});

// app.listen(process.env.PORT || 5200);
