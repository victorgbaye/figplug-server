const createTokenUser = (user) => {
  return { firstname: user.firstname,lastname: user.lastname, userId: user._id, role: user.role, subscription: user.subscription };
};

module.exports = createTokenUser;
