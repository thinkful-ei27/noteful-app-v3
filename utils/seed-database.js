'use strict';

const mongoose = require('mongoose');

const { MONGODB_URI } = require('../config');
const Note = require('../models/note');
const Folder = require('../models/folder');
const Tag = require('../models/tag');

const { folders, notes, tags } = require('../db/seed/data');

/************************************************************
 ** FOR DEVELOPMENT ONLY - DO NOT USE IN EXPRESS ENDPOINTS **
 ***********************************************************/
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    setTimeout(() => mongoose.disconnect(), 1000);
    return mongoose.connection.db.dropDatabase();
  });
/************************************************************/

Promise.all([
  Note.insertMany(notes),
  Folder.insertMany(folders),
  Tag.insertMany(tags),
  Folder.createIndexes(),
  Tag.createIndexes()
])
  .then(results => {
    console.log('Inserted', results);
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });
