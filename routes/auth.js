// var mongoose = require("mongoose");
import passport, { authenticate } from "passport";
import { secret } from "../config/settings";
require("../config/passport")(passport);
import { Router } from "express";
import jwt, { sign } from "jsonwebtoken";
var router = Router();
import User, { findOneAndUpdate } from "../models/user";
import { hash } from "bcrypt";

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashCost = 10;
  try {
    const passwordHash = await hash(password, hashCost);
    const userDocument = new User({
      username: username,
      passwordHash: passwordHash,
      authlib: 0,
      economic: 0,
      quadrant: "",
      kudos: 0,
      joined: new Date(),
      online: false,
      available: true,
      connection: ""
    });
    await userDocument.save();

    res.status(200).send({ username });
  } catch (error) {
    res.status(400).send({
      error: "req body should take the form {username, password}"
    });
  }
});

router.post("/login", (req, res) => {
  authenticate("local", { session: false }, (error, user) => {
    if (error || !user) {
      res.status(400).json({ error: "Username may be incorrect." });
    }

    /** This is what ends up in our JWT */
    const payload = {
      username: user.username,
      expires: Date.now() + parseInt(process.env.JWT_EXPIRATION_MS)
    };

    /** assigns payload to req.user */
    req.login(payload, { session: false }, error => {
      if (error) {
        res.status(400).send({ error });
      }

      /** generate a signed json web token and return it in the response */
      const token = sign(JSON.stringify(payload), secret);

      /** assign our jwt to the cookie */
      res.cookie("jwt", jwt, { httpOnly: true, secure: true });
      res.status(200).send({ token: token, username: payload.username });
    });
  })(req, res);
});

router.post("/quiz", async (req, res) => {
  try {
    const filter = { username: req.body.username };
    const update = {
      authlib: req.body.authlib,
      economic: req.body.economic,
      quadrant: req.body.quadrant
    };

    await findOneAndUpdate(filter, update);

    res.status(200).json({ message: "Success!" });
  } catch (error) {
    res.status(400).send({ error });
  }
});

// router.post("/status", async (req, res) => {
//   try {
//     const filter = { username: req.body.username };
//     const update = {
//       online: req.body.online
//     };

//     await User.findOneAndUpdate(filter, update);

//     res.status(200).json({ message: "Success!" });
//   } catch (error) {
//     res.status(400).send({ error });
//   }
// });

// router.post("/match", async (req, res) => {
//   try {
//     const quadrant = req.body.quadrant;
//     const filter = {
//       online: true,
//       available: true,
//       quadrant: { $ne: quadrant }
//     };

//     const connection = uuid();

//     await User.findOneAndUpdate(filter, {
//       available: false,
//       connection: connection
//     });
//     await User.findOneAndUpdate(
//       { username: req.body.username },
//       { available: false, connection: connection }
//     );

//     res.status(200).json({ message: "Successfully matched!" });
//   } catch (error) {
//     res.status(400).send({ message: "Please retry." });
//   }
// });

// router.post("/quit", async (req, res) => {
//   try {
//     await User.findOneAndUpdate(
//       { username: req.body.username },
//       { available: true, connection: "", online: false }
//     );

//     res.status(200).json({ message: "Successfully disconnected." });
//   } catch (error) {
//     res.status(400).send({ error });
//   }
// });

// router.post("/uuid", async (req, res) => {
//   try {
//     const user = await User.findOne({ username: req.body.username });
//     res.status(200).json({ uuid: user.connection });
//   } catch (error) {
//     res.status(400).send({ error });
//   }
// });

router.get(
  "/protected",
  authenticate("jwt", { session: false }),
  (req, res) => {
    const { user } = req;

    res.status(200).send({ user });
  }
);

export default router;
