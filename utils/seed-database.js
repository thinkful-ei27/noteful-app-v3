'use strict';

const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config');
const Note = require('../models/note');
const Folder = require('../models/folder');
const {folders, notes} = require('../db/seed/data');

Promise.all([
  Note.insertMany(notes),
  Folder.insertMany(folders),
  Folder.createIndexes(),
])
  .then(results => {
    console.log('Inserted', results);
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });

/************************************************************
 ** FOR DEVELOPMENT ONLY - DO NOT USE IN EXPRESS ENDPOINTS **
 ************************************************************
 *
 * Connect to mongoose, which allows the queries above to execute
 * Then setTimeout() to disconnect mongoose after 1000 milliseconds
 *
 */

mongoose.connect(MONGODB_URI, { useNewUrlParser:true });
setTimeout(() => mongoose.disconnect(), 1000);

/************************************************************/
