const bcrypt = require("bcryptjs");
const helpers = {};

helpers.encryptPassword = async (password) => {
    //Generamos un patron
    const salt = await bcrypt.genSalt(10);
    //Usando el patron codificamos la contraseña
    const finalPassword = await bcrypt.hash(password, salt);
    //devolvemos la contraseña cifrada
    return finalPassword;
  };
  
  //contraseña en texto plano y la contraseña guardada en la bd
helpers.matchPassword = async (password, savedPassword) => {
    try {
      return await bcrypt.compare(password, savedPassword);
    } catch (e) {
      console.log(e);
    }
};




function toJson(data) {

    const string = JSON.stringify(data);
  
    const json = JSON.parse(string);
   
    return json;
}



module.exports = helpers;