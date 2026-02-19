const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const oauthController = require('../controllers/oauth.controller');

/**
 * @route   GET /api/auth/google
 * @desc    Google OAuth başlangıç endpoint'i
 * @access  Public
 */
router.get('/google', 
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    session: false 
  })
);

/**
 * @route   GET /api/auth/google/callback
 * @desc    Google OAuth callback endpoint'i
 * @access  Public
 */
router.get('/google/callback',
  (req, res, next) => {
    passport.authenticate('google', { session: false }, (err, user, info) => {
      if (err || !user) {
        // Hata durumunda frontend'e redirect et
        return res.redirect(`${process.env.FRONTEND_URL}/auth/login?error=google_auth_failed`);
      }
      // Başarılı durumda req.user'a kullanıcıyı ekle ve devam et
      req.user = user;
      next();
    })(req, res, next);
  },
  oauthController.googleCallback
);

/**
 * @route   GET /api/auth/google/failure
 * @desc    Google OAuth başarısız durumu
 * @access  Public
 */
router.get('/google/failure', oauthController.googleFailure);

module.exports = router;
