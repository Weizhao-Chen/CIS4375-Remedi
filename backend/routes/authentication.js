const express = require('express')

const router = express.Router({ caseSensitive: true })
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const validator = require('validator')

router.post('/auth/register', (req, res, next) => {
  const db = req.app.get('db')
  const newLogin = db.login.build(req.body)

  if (
    !newLogin.email ||
    !newLogin.password ||
    !validator.isEmail(newLogin.email) ||
    !validator.isLength(newLogin.password, {
      min: 8,
      max: 36
    })
  ) {
    res.sendStatus(400)
    return
  }

  newLogin.password = bcrypt.hashSync(newLogin.password, 8)

  db.login
    .findOne({
      where: {
        email: newLogin.email
      }
    })
    .then(login => {
      if (login) {
        res.sendStatus(409)
        return
      }
console.log("hello")
newLogin
        .save()
        .then(() => {
          res.sendStatus(200)
        })
        .catch(next)
    })
})

router.post('/auth/login', (req, res, next) => {
  const db = req.app.get('db')

  const email = req.body.username
  const password = req.body.password

  if (
    !email ||
    !password ||
    !validator.isEmail(email) ||
    !validator.isLength(password, {
      min: 8,
      max: 36
    })
  ) {
    res.sendStatus(400)
    return
  }
  db.login
    .findOne({
      where: {
        email
      }
    })
    .then(login => {
      if (!login) {
        res.sendStatus(401)
        return
      }

      bcrypt.compare(password, login.password, (err, isMatched) => {
        if (err) next(err)
        if (!isMatched) {
          res.sendStatus(401)
          return
        }

        // confidential data should not be sent to client
        login = login.get({ plain: true })
        delete login.password

        // signin
        jwt.sign(
          {
            iss: config.get('options.iss') || 'iss-not-specified',
            exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            data: login
          },
          config.get('options.secret'),
          (err, token) => {
            if (err) next(err)

            res.json({
              token,
              login: user
            })
          }
        )
      })
    })
    .catch(next)
})

router.use('/api/*', (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token']

  if (token) {
    jwt.verify(token, config.get('options.secret'), (err, payload) => {
      if (err) {
        res.sendStatus(401)
        return
      }

      req.account = payload.data
      next()
    })
  } else {
    res.sendStatus(401)
  }
})

module.exports = router
