const bcrypt = require("bcrypt");

 
const encryp = async (passwordPlain) => {
  const hash = bcrypt.hash(passwordPlain, 10);
  return hash;
};

const compare = async(passwordPlain, hash) => {
    return await bcrypt.compare(passwordPlain, hash)
}

module.exports = {
    encryp, compare
}