require('file-loader?emitFile=false!./index.html');
require('./stylesheets/app.scss'); /* This loads the css and foces the sass to compile... */
require('file-loader?emitFile=false!./images/averie-woodard-123973.jpg');
require('file-loader?emitFile=false!./images/piyanut-suntaranil-223184.jpg');
require('file-loader?emitFile=false!./images/aaron-burden-75599.jpg');
require('file-loader?emitFile=false!./images/averie-woodard-123972.jpg');

import app from './scripts/app.js';

app();
