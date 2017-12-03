'use strict';

// framework references
const assert = require('assert');

// package references
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

// application references
const Note = require('./Note.js');

// initialization

mongoose.Promise = global.Promise;
const connectionUrl = 'mongodb://127.0.0.1/noteworx';
const connectionOptions = { useMongoClient: true };

const filters = {
    id: (id) => {
        return { _id: new ObjectID(id) };
    },
    tag: (tag) => {
        return { tags: { $regex: new RegExp(tag, 'i') } };
    },
    title: (title) => {
        return { 'title': { $regex: new RegExp(title, 'i') } };
    }
};

class NoteRepository {    
    
    addNote(note) {
    
        assert(note, 'Note is required');
    
        return new Promise((resolve, reject) => {
    
            const onError = error => {
                mongoose.disconnect();
                reject(error);
            };
    
            const onConnected = () => {
    
                Note.on('index', (error) => {
                    if (error) {
                        onError(error);
                    } else {
                        const validationErrors = note.validateSync();
    
                        if (validationErrors) {
                            mongoose.disconnect();
                                
                            const validations = [];
    
                            for (const err in validationErrors.errors) {
                                validations.push(validationErrors.errors[err].message);
                            }
    
                            onError(new Error(validations.join('\n')));
                        } else {
                            note.save()
                                .then(result => {
                                    mongoose.disconnect();
                                    resolve({ id: result._id });
                                }, onError)
                                .catch(onError);
                        }
                    }
                });
            };
    
            mongoose.connect(connectionUrl, connectionOptions)
                .then(onConnected)
                .catch(onError);    
        });    
    }
    

    findNoteById(id) {
        
        assert(id, 'Id is required');
                
        return new Promise((resolve, reject) => {
                    
            const onError = error => {
                mongoose.disconnect();
                reject(error);
            };
                    
            const onConnected = () => {                
                Note.findOne(filters.id(id))
                    .then(note => {
                        mongoose.disconnect();
                        resolve(note);
                    })
                    .catch(onError);                
            };
                    
            mongoose.connect(connectionUrl, connectionOptions)
                .then(onConnected)
                .catch(onError);                
        });
    }

    
    findNotesByTag(tag) {
        
        assert(tag, 'Tag is required');
                
        return new Promise((resolve, reject) => {
                    
            const onError = error => {
                mongoose.disconnect();
                reject(error);
            };
                    
            const onConnected = () => {                
                Note.find(filters.tag(tag))
                    .then(notes => {
                        mongoose.disconnect();
                        resolve(notes);
                    })
                    .catch(onError);                
            };
                    
            mongoose.connect(connectionUrl, connectionOptions)
                .then(onConnected)
                .catch(onError);                
        });
    }


    findNotesByTitle(title) {
    
        assert(title, 'Title is required');
            
        return new Promise((resolve, reject) => {
                
            const onError = error => {
                mongoose.disconnect();
                reject(error);
            };
                
            const onConnected = () => {                
                Note.find(filters.title(title))
                    .then(notes => {
                        mongoose.disconnect();
                        resolve(notes);
                    })
                    .catch(onError);                
            };
                
            mongoose.connect(connectionUrl, connectionOptions)
                .then(onConnected)
                .catch(onError);                
        });
    }
    
    
    listNotes() {
        return new Promise((resolve, reject) => {
                
            const onError = error => {
                mongoose.disconnect();
                reject(error);
            };
                
            const onConnected = () => {
                Note
                    .find()
                    .then(notes => {
                        mongoose.disconnect();
                        resolve(notes);
                    })
                    .catch(onError);
            };
                
            mongoose.connect(connectionUrl, connectionOptions)
                .then(onConnected)
                .catch(onError);                
        });
    }


    removeNote(id) {
        assert(id, 'Id is required');
        
        return new Promise((resolve, reject) => {
            
            const onError = error => {
                mongoose.disconnect();
                reject(error);
            };
            
            const onConnected = () => {                
                Note.remove(filters.id(id))
                    .then(() => {
                        mongoose.disconnect();
                        resolve();
                    })
                    .catch(onError);
            };
            
            mongoose.connect(connectionUrl, connectionOptions)
                .then(onConnected)
                .catch(onError);                
        });
    }

    
    tagNote(id, tags) {
        
        return new Promise((resolve, reject) => {
        
            const onError = error => {
                mongoose.disconnect();
                reject(error);
            };
        
            const onConnected = () => {
                
                const tagUpdate = {
                    $addToSet: {
                        tags: {
                            $each: tags
                        }
                    }
                };
        
                Note.findOneAndUpdate(filters.id(id), tagUpdate)
                    .then(() => {
                        mongoose.disconnect();
                        resolve();
                    })
                    .catch(onError);
            };
        
            mongoose.connect(connectionUrl, connectionOptions)
                .then(onConnected)
                .catch(onError);        
        });        
    }


    updateNote(id, note) {
        
        return new Promise((resolve, reject) => {
        
            const onError = error => {
                mongoose.disconnect();
                reject(error);
            };
        
            const onConnected = () => {
                
                const tagUpdate = {
                    $set: {
                        title: note.title,
                        content: note.content,
                        tags: note.tags,
                        updated_date: note.updated_date
                    }
                };
        
                Note.findOneAndUpdate(filters.id(id), tagUpdate)
                    .then(() => {
                        mongoose.disconnect();
                        resolve();
                    })
                    .catch(onError);
            };
        
            mongoose.connect(connectionUrl, connectionOptions)
                .then(onConnected)
                .catch(onError);        
        });        
    }
}
    
module.exports = NoteRepository;