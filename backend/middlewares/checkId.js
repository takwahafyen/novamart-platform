import mongoose from "mongoose";

// Middleware pour vérifier si l'ID fourni est valide
const checkId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  next();
};

export default checkId;
