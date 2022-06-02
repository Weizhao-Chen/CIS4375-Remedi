const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
  const db = req.app.get('db')
  return db.Contractor_Hotel.findAll({
    include: [db.Contractor, db.Hotel],
  })
    .then((Contractor_Hotel) => res.send(Contractor_Hotel))
    .catch((err) => {
      console.log(
        'There was an error querying Contractor Hotel 1',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})

router.get('/find/:hotelID', (req, res, next) => {
  const db = req.app.get('db')
  return db.Contractor_Hotel.findAll({
    where: {
        hotelID: req.params.hotelID,
    },
    include: [db.Contractor, db.Hotel],
  })
    .then((Contractor_Hotel) => res.send(Contractor_Hotel))
    .catch((err) => {
      console.log(
        'There was an error querying Contractor Hotel 1',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})

router.post('/create', (req, res, next) => {
  const db = req.app.get('db')
  db.Contractor_Hotel.create({
    contractorID: req.body.contractorID,
    hotelID: req.body.hotelID,
  })
    .then(() => {
      res.status(200).send('OK')
    })
    .catch((err) => {
      console.log(
        'There was an error creating Contractor Hotel',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})

router.delete('/delete/:hotelID/:contractorID', (req, res, next) => {
  const db = req.app.get('db')

  db.Contractor_Hotel.destroy({
    where: {
        hotelID: req.params.hotelID,
      contractorID: req.params.contractorID,
    },
  })
    .then(() => {
      res.status(200).send('The record has been deleted!')
    })
    .catch((err) => {
      console.log(
        'There was an error deleting Contractor Hotel',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})

module.exports = router
