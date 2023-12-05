// auth.controllers.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccesToken } from "../libs/jwt.js";
import User from "../models/user.model.js";

export const register = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["Email en uso, ingrese uno no registrado"]);

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSave = await newUser.save();
    const token = await createAccesToken({ id: userSave._id });

    res.cookie("token", token);
    res.json({
      id: userSave._id,
      username: userSave.username,
      email: userSave.email,
      createAt: userSave.createdAt,
      updateAt: userSave.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).json({ message: "Usuario no válido" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = await createAccesToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  // Limpiar la cookie de sesión al cerrar sesión
  res.clearCookie('token');
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "User not found" });

  res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createAt: userFound.createdAt,
    updateAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      image: userFound.image,
    });
  });
};

export const updateUser = async (req, res) => { 
  const { id, ...body } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    return res.status(404).json({ message: "User not found" });
  }
};
