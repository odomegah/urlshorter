import { Url } from "../models/url.model.js";

export const create = async (req, res) => {
  try {
    const { former } = req.body;

    if (!former) {
      return res.status(400).json("Vous devez fournir une url correcte");
    }

    let result = "";
    let url;
    const urlLetter =
      "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm01223456789";

    // const urlLetter = "00001";

    const urlLength = 6;

    while (result === "" || url)
      for (let index = 0; index < urlLength; index++) {
        result += urlLetter.charAt(
          Math.floor(Math.random() * urlLetter.length)
        );
        url = await Url.findOne({ current: result });
      }

    const time = new Date().getTime();

    const newUrl = new Url({
      former,
      current: result,
      url: process.env.BASEURL + result,
      visited: 0,
      createdAt: time,
      updatedAt: time,
      owner: req.user,
    });

    await newUrl.save();

    res.status(201).json(newUrl);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

export const getall = async (req, res) => {
  try {
    const allUrl = await Url.find({ owner: req.user.id });

    res.status(200).json(allUrl);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: error.message });
  }
};

export const urlById = async (req, res) => {
  try {
    const oneUrl = await Url.findOne({ _id: req.params.id });
    res.status(200).json(oneUrl);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: error.message });
  }
};

export const urlvisite = async (req, res) => {
  try {
    const isUrl = await Url.findOne({ current: req.params.path });
    if (!isUrl) {
      res.redirect("http://localhost:4200");
    }
    let v = isUrl.visited + 1;
    await Url.findOneAndUpdate({ current: req.params.path }, { visited: v });
    res.redirect(isUrl.former);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ Error: error.message });
  }
};

export const urlDel = async (req, res) => {
  try {
    const {id,confirm} = req.params
    const url = await Url.findById(id);

    if (!url) {
      return res.status(400).json("Aucun url ne correspond")
    }

    if (id && !confirm) {
      res.status(200).json({"id":"Confirmer la suppression de cet url"})
    }else if(id && confirm){
      await Url.findByIdAndDelete(id)
      res.status(200).json({"confirm":"URL supprime avec success"})

    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
