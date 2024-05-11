// validationUtils.js
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validateMobile = (mobile) => {
  // Check if the input consists of only digits
  return /^\d+$/.test(mobile);
};


module.exports = { validateEmail, validateMobile };
