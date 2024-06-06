export function isLogged(req, res, next) {
  try {
  
    if (!req.cookies.user) {
      next();
    } else {
      res.status(400).json("Vous avez deja une session ouverte. Deconnectez vous pour continer");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
}
