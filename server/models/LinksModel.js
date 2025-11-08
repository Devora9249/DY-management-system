const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
  websiteName: { type:String, require:true },        
  websitelink: { type: String, required: true },    
  description: { type: String }                  // תיאור נוסף (לא חובה)
});

module.exports = mongoose.model('Link', LinkSchema);