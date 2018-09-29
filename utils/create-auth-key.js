const crypto = require('crypto');

module.exports = id => crypto.createHash('md5').update(id).digest('hex');
