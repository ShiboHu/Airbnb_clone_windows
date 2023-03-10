const express = require('express')
const router = express.Router();

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


//methods start!!
const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Please provide a valid email or username.'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
];
//methods end!! 

//get the user else return null
router.get("/", (req, res, next) => {
  const { user } = req;
  if (user) user.token = req.cookies.token;
  if (user) {
    res.json({ user: user.toSafeObject()});
  } else return res.json({ user: null });
});


//login for a user
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;
  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error("Invalid credentials");
    err.status = 401;
    err.title = 'Login Failed';
    err.errors = ['The provided credentials were invalid']
    return next(err);
  }

  await setTokenCookie(res, user);


  return res.json({ 
   user: user.toSafeObject()
  });
});


//logout user
router.delete("/", (req, res, next) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

 
module.exports = router;
