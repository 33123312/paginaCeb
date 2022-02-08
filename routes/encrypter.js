const bcrypt = require('bcryptjs');


module.exports = {
    encrypt: (string) => {    
        var hash = bcrypt.hashSync(string, 10);
    
        return hash
    },
    compare: (pass,encrypt) => {
        return bcrypt.compareSync(pass,encrypt);
    }
}

