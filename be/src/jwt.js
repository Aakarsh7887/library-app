const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
const secret_key = process.env.JWT_SECRET_KEY;

const generate_token = (_id,type) => {
    const token = jwt.sign({_id,type},secret_key);
    return token;
};

const verify_token = (token) => {
    try{
        const payload = jwt.verify(token, secret_key);
        return {status: true, payload};
    } catch (err) {
        console.error(err);
        return {status: false, payload: undefined};
    }
};

module.exports = {generate_token,verify_token};