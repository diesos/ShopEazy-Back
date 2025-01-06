const User = require("../models/userModels");


const createUser = async (email, pwd, firstName, lastName) => {
  const userData = {
    email,
    password: pwd,
    firstName,
    lastName
  };
  const user = await User.create(userData);

  return { user };
};

module.exports = createUser;
