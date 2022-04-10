const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
  const db = req.app.get('db')
  return db.Contractor_Flight.findAll({
    include: [db.Contractor, db.Flight],
  })
    .then((Contractor_Flight) => res.send(Contractor_Flight))
    .catch((err) => {
      console.log(
        'There was an error querying Contractor Flight 1',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})

router.get('/find/:flightID', (req, res, next) => {
  const db = req.app.get('db')
  return db.Contractor_Flight.findAll({
    where: {
      flightID: req.params.flightID,
    },
    include: [db.Contractor, db.Flight],
  })
    .then((Contractor_Flight) => res.send(Contractor_Flight))
    .catch((err) => {
      console.log(
        'There was an error querying Contractor Flight 1',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})

router.post('/create', (req, res, next) => {
  const db = req.app.get('db')
  db.Contractor_Flight.create({
    contractorID: req.body.contractorID,
    flightID: req.body.flightID,
  })
    .then(() => {
      res.status(200).send('OK')
    })
    .catch((err) => {
      console.log(
        'There was an error creating Contractor Flight',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})

router.delete('/delete/:flightID/:contractorID', (req, res, next) => {
  const db = req.app.get('db')

  db.Contractor_Flight.destroy({
    where: {
      flightID: req.params.flightID,
      contractorID: req.params.contractorID,
    },
  })
    .then(() => {
      res.status(200).send('The record has been deleted!')
    })
    .catch((err) => {
      console.log(
        'There was an error deleting Assigned Rental Car',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})

module.exports = router
