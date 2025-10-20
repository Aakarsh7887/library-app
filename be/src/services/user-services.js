const inputValidationException = require("../exceptions/inputValidationException");
const User = require("../models/user");
const addNewUser = async (user) => {
    try {
        user = new User(user);
        await user.save();
        console.log(`User with ID: ${user._id} was added in database.`);
        const token = user.generateToken();
        return {user, token};
    } catch (error) {
        console.error(`Please enter valid fields. the error is: ${error}`);
        throw new inputValidationException(error.message);
    }
};

const loginUser = async ({email,password}) => {
    const user = await User.findByEmailAndPasswordForAuth(email,password);
    console.log(`User with email: ${email} has logged in`);
    const token = user.generateToken();
    return {user,token};
};

module.exports = {addNewUser,loginUser};