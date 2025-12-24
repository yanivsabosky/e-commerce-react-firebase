// Utility functions for validating authentication inputs

// Validate full name (length + no digits)
const checkName = (st) => {
  const name = st.trim();
  if (name.length < 2 || name.length > 30) return false;
  if (/\d/.test(name)) return false;
  return true;
};

// Validate email format using regex
const checkemail = (st) => {
  return /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,}$/.test(st.trim());
};


// Validate password strength:
// - Minimum length
// - Contains a number
// - Contains a special character
const checkPassword = (st) => {
  if (st.trim().length < 6) return false;
  if (!/\d/.test(st)) return false;
  if (!/[!@#$%^&*]/.test(st)) return false;
  return true;
};


// Compare password and confirmation password
const mathcingPasswords = (st, st1) => st === st1;


export {checkName,checkemail,checkPassword,mathcingPasswords}
