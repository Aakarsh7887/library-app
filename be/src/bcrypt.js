const bcrypt = require("bcrypt");

const encryptPassword = async (plainPassword) => {
    try{
        return await bcrypt.hash(plainPassword, 8);
    } catch (err) {
        console.error(err);
    }
}


const checkPassword = async (plainPassword,encryptedPassword) => {
    return await bcrypt.compare(plainPassword,encryptedPassword);
}

module.exports = {encryptPassword, checkPassword};