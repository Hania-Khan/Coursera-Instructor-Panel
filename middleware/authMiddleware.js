import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secret = process.env.JWT_SECRET;

export const setInstructor = (instructor) => {
  try {
    console.log("Token signed");
    const token =jwt.sign({ id: instructor._id, email: instructor.email }, secret, {
      expiresIn: "1h",
    });
    console.log("Token: ", token);
    return token;
  } catch (err) {
    console.log(err);
  }
};

export const authenticateToken = (req, res, next) => {
  try {
    console.log("authenticateToken called");
    console.log("Secret or Private Key: ", secret);
    let token = req.headers.authorization.split(" ")[1];
    if (token) {
      let instructor = jwt.verify(token, secret);
      req.id = instructor.id;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized User" });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorized User error" });
  }
};
