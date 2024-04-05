const mongoose = require('mongoose');

const dbConnect  = async () => {
    const URL = 'mongodb+srv://mayankjohari877:IvFAjqh4jjJRu56Z@cluster0.emynddl.mongodb.net/';

    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log('Database connected Successfully -> good');
    } catch (error) {
        console.log('Connection error:', error);
    }
};

module.exports = dbConnect;
