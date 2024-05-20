module.exports = (sequelize) => {
  const User = sequelize.define("adherent", {
    'First name': {
      type: String
    },
    'Last name': {
      type: String
    },
    email: {
      type: String
    },
    'Profile picture': {
      type: String
    }
  });

  return User;
};
