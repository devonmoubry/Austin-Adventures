require('file-loader?emitFile=false!./index.html');
require('./stylesheets/app.scss'); /* This loads the css and foces the sass to compile... */
require('file-loader?emitFile=false!./images/favicon.ico');

import app from './scripts/app.js';

app();
