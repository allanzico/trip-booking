import express from 'express'
import Authentication from '../controllers/auth'
import { requireSignIn } from '../middlewares/middlewares'

const auth = new Authentication()

 const router = express.Router()
 
 router.post('/register', auth.registerUser)
 router.post('/login', auth.loginUser)
 router.post('/forgot-password', auth.forgotPassword)
 router.post('/reset-password/:resetToken', auth.resetPassword)
 router.post('/enable-2fa', auth.enableTwofactorAuth)
 router.post('/verify-2fa/:twoFactorToken', auth.verifyTwofactorAuth)
 router.post('/create-user-interests', auth.createUserInterests)
 router.put('/edit-profile', requireSignIn, auth.updateUser)
 
 router.get(
    "/users/:userId",
    requireSignIn,
    auth.getUsersById
  );

  router.get(
    "/user-interests",
    auth.getUserInterests
  );
module.exports = router