import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';

//import webpack from 'webpack';
//import WebpackDevServer from 'webpack-dev-server';

/* mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
mongoose.connect('mongodb://localhost:27017/kanbanboard');


const app = express();
const port = 4000;

/* use session */
app.use(session({
  secret: 'wvromi$%kanban#*snveud',
  resave: false,
  saveUninitialized: true
}));

/* middleware */
app.use(bodyParser.json());

/* static files */
app.use('/', express.static(__dirname + './../dist'));

import api from './routes';
app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../dist/index.html'));
});

/* server open */
app.listen(port, () => {
  console.log('Express is listening on port', port);
});

/* development setting */
/* if(process.env.NODE_ENV == 'development') {
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(config.devServer.port);
    console.log('Server is running on development mode', config.devServer.port);
} */