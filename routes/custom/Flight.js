const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
  const db = req.app.get('db')
  return db.Flight.findAll({
    // include: [
    //     db.Hospital,
    //     db.Project_Status
    // ]
  })
    .then((Flight) => res.send(Flight))
    .catch((err) => {
      console.log('There was an error querying Flight 1', JSON.stringify(err))
      return res.send(err)
    })
})

router.get('/find/:flightid', (req, res, next) => {
  const db = req.app.get('db')

  return db.Flight.find({
    where: {
      flightID: req.params.flightid,
    },
  })
    .then((Flight) => {
      res.send(Flight)
    })
    .catch((err) => {
      console.log('There was an error querying Flight 2', JSON.stringify(err))
      return res.send(err)
    })
})
router.post('/create', (req, res, next) => {
  console.log(req.body)
  const db = req.app.get('db')
  db.Flight.create({
    flightName: req.body.FlightName,
    flightDate: req.body.FlightDate,
    departTime: req.body.DepartTime,
    departLocation: req.body.DepartLocation,
    arrivalLocation: req.body.ArrivalLocation,
    arrivalTime: req.body.ArrivalTime,
    seatNumber: req.body.SeatNumber,
    flightCost: req.body.FlightCost,
    specialApprovalGranted: req.body.ApprovalGranted,
    specialApprovalName: req.body.ApprovalName,
    specialApprovalDate: req.body.ApprovalDate,
  })
    .then(() => {
      res.status(200).send('OK')
    })
    .catch((err) => {
      console.log('There was an error creating Flight', JSON.stringify(err))
      return res.send(err)
    })
})
router.put('/update/:flightid', (req, res, next) => {
  const db = req.app.get('db')

  db.Flight.update(
    {
      flightName: req.body.FlightName,
      flightDate: req.body.FlightDate,
      departTime: req.body.DepartTime,
      departLocation: req.body.DepartLocation,
      arrivalLocation: req.body.ArrivalLocation,
      arrivalTime: req.body.ArrivalTime,
      seatNumber: req.body.SeatNumber,
      flightCost: req.body.FlightCost,
      specialApprovalGranted: req.body.ApprovalGranted,
      specialApprovalName: req.body.ApprovalName,
      specialApprovalDate: req.body.ApprovalDate,
    },
    {
      where: {
        flightID: req.params.flightid,
      },
    },
  )
    .then(() => {
      res.status(200).send('OK')
    })
    .catch((err) => {
      console.log('There was an error updating Flight', JSON.stringify(err))
      return res.send(err)
    })
})
router.delete('/delete/:flightid', (req, res, next) => {
  const db = req.app.get('db')

  db.Flight.destroy({
    where: { flightID: req.params.flightid },
  })
    .then(() => {
      res.status(200).send('The record has been deleted!')
    })
    .catch((err) => {
      console.log('There was an error deleting Flight', JSON.stringify(err))
      return res.send(err)
    })
})

module.exports = router
