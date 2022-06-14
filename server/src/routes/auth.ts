import express from 'express'
import Authentication from '../controllers/auth'
import { requireSignIn } from '../middlewares/middlewares'

const auth = new Authentication()

 const router = express.Router()
 
 router.post('/register', auth.registerUser)
 router.post('/register-seller', auth.registerSeller)
 router.post('/login', auth.loginUser)
 router.post('/forgot-password', auth.forgotPassword)
 router.post('/reset-password/:resetToken', auth.resetPassword)
 router.post('/enable-2fa', requireSignIn, auth.enableTwofactorAuth)
 router.post('/verify-2fa/:twoFactorToken', auth.verifyTwofactorAuth)
 router.put('/edit-profile', requireSignIn, auth.updateUser)
 
 router.get(
    "/users/:userId",
    requireSignIn,
    auth.getUsersById
  );

module.exports = router