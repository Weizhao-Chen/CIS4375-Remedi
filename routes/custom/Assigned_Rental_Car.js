const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
  const db = req.app.get('db')
  return db.Assigned_Rental_Car.findAll({
    include: [
        db.Contractor,
        db.Rental_Car
    ]
  })
    .then((Rental_Car) => res.send(Rental_Car))
    .catch((err) => {
      console.log(
        'There was an error querying Rental Car 1',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})

router.get('/find/:rentalCarID', (req, res, next) => {
  const db = req.app.get('db')
  return db.Assigned_Rental_Car.findAll({
    where: {
      rentalCarID: req.params.rentalCarID,
    },
    include: [db.Contractor, db.Rental_Car],
  })
    .then((Rental_Car) => res.send(Rental_Car))
    .catch((err) => {
      console.log(
        'There was an error querying Rental Car 1',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})

router.post('/create', (req, res, next) => {
  const db = req.app.get('db')
  db.Assigned_Rental_Car.create({
    rentalCarID: req.body.rentalCarID,
    contractorID: req.body.contractorID,
    driverPassenger: req.body.driverPassenger,
  })
    .then(() => {
      res.status(200).send('OK')
    })
    .catch((err) => {
      console.log(
        'There was an error creating Assigned Rental Car',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})

router.delete('/delete/:rentalCarID/:contractorID', (req, res, next) => {
  const db = req.app.get('db')

  db.Assigned_Rental_Car.destroy({
    where: {
      rentalCarID: req.params.rentalCarID,
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
