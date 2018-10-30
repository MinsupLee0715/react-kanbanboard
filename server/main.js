import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';

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

// import api from './routes';
import api from './sampleRoutes';
app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../dist/index.html'));
});

/* server open */
app.listen(port, () => {
  console.log('Express is listening on port', port);
});
