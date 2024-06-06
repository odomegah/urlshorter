import jwtSign from "../config/jwt/jwt.sign.js";
import jwtConfig from "../config/jwt/jwt.sign.js";
import { sendMail } from "../config/nodemailer/nodemailer.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const logup = async (req, res) => {
  try {
    const { email, password, passwordc, fullname, gender } = req.body;

    if (email.trim() == "")
      return res.status(400).json("Entrez un email valid");
    if (password.trim() == "")
      return res.status(400).json("Entrez un mot de passe valid");
    if (password.trim().length < 2)
      return res.status(400).json("Mot de passe inferieur a 3 lettres");
    if (password !== passwordc)
      return res.status(400).json("Les mots de passe ne sont pas les memes");

    const user = await User.findOne({ email });
    if (user) return res.status(400).json("Cet email existe deja");

    //criptage du mot de pass
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      fullname: fullname || "",
      password: hashpass,
      gender: gender || "",
      passForget: "",
    });

    jwtConfig(newUser.id, res);
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) return res.status(400).json("Entrer un email");
    if (!password) return res.status(400).json("Entrer un mot de passe");

    const user = await User.findOne({ email });
    const isPassword = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPassword)
      return res.status(400).json("E-mail ou mot de passe incorect");

    jwtConfig(user.id, res);

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
}

export function logout(req, res) {
  try {
    res.cookie("user", "", { maxAge: 0 });
    res.status(200).json("Vous etes deconnecte");
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
}

export const passForger = async (req, res) => {
  try {
    const { email, code, password, passwordc } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("L'email n'est associe a aucun compte");
    }

    if (email && !code && !password && !passwordc) {

      // const oldToken = await User.findOne({email})

      if (user.passForget) {
      return res.status(200).json({"email":`Un code ${user.passForget} vous est envoye a l'email: ${email}`});
        
      }

      let passToken = "";

      for (let index = 0; index < 10; index++) {
        passToken += Math.floor(Math.random() * 10);
      }

      await User.findOneAndUpdate({ email }, { passForget: passToken });
      //Envoie de mail a l'utilisateur

      res.status(200).json({"email":`Un code ${passToken} vous est envoye a l'email: ${email}`});

    } else if (email && code && !password && !passwordc) {
      const isCodeOk = await User.findOne({ email:email, passForget: code });
      console.log(isCodeOk)

      if (!isCodeOk) {
        return res
          .status(400)
          .json("Ce code de verification n'est pas correcte");
      }
      res.status(200).json({"code":`Votre code est valide`});

    } else if (email && code && password && passwordc) {
      const isCodeOk = await User.findOne({ email, passForget: code });
      if (!isCodeOk) {
        return res
          .status(400)
          .json("Ce code de verification n'est pas correcte");
      }
      
      // console.log(password.length)

      if (password.length <= 2) {
        return res
          .status(400)
          .json("Le mot de passe doit contenir plus de trois(3) caracteres");
      }
      
      if (password !== passwordc) {
        return res
          .status(400)
          .json("Les deux mots de passe ne sont passe les meme");
      }


     

      const s = await bcrypt.genSalt(10)
      const hashPass = await bcrypt.hash(password,s)

     await User.findOneAndUpdate({_id:user._id},{password:hashPass})

     jwtSign(user._id,res)

      res.status(200).json({"pass":"Votre mot de passe a ete modifie avec success"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
