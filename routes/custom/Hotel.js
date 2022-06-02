const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
  const db = req.app.get('db')
  return db.Hotel.findAll({
    // include: [
    //     db.Hospital,
    //     db.Project_Status
    // ]
  })
    .then((Hotel) => res.send(Hotel))
    .catch((err) => {
      console.log('There was an error querying Hotel 1', JSON.stringify(err))
      return res.send(err)
    })
})

router.get('/find/:hotelID', (req, res, next) => {
  const db = req.app.get('db')

  return db.Hotel.find({
    where: {
        hotelID: req.params.hotelID,
    },
  })
    .then((Hotel) => {
      res.send(Hotel)
    })
    .catch((err) => {
      console.log('There was an error querying Hotel 2', JSON.stringify(err))
      return res.send(err)
    })
})
router.post('/create', (req, res, next) => {
  console.log(req.body)
  const db = req.app.get('db')
  db.Hotel.create({
    hotelname: req.body.HotelName,
    hotelcheckindate: req.body.HotelCheckInDate,
    hotelcheckintime: req.body.HotelCheckInTime,
    hotelcheckoutdate: req.body.HotelCheckOutDate,
    hotelcheckouttime: req.body.HotelCheckOutTime,
  })
    .then(() => {
      res.status(200).send('OK')
    })
    .catch((err) => {
      console.log('There was an error creating Hotel', JSON.stringify(err))
      return res.send(err)
    })
})
router.put('/update/:hotelID', (req, res, next) => {
  const db = req.app.get('db')

  db.Hotel.update(
    {
        hotelname: req.body.HotelName,
        hotelcheckindate: req.body.HotelCheckInDate,
        hotelcheckintime: req.body.HotelCheckInTime,
        hotelcheckoutdate: req.body.HotelCheckOutDate,
        hotelcheckouttime: req.body.HotelCheckOutTime,
    },
    {
      where: {
        hotelID: req.params.hotelID,
      },
    },
  )
    .then(() => {
      res.status(200).send('OK')
    })
    .catch((err) => {
      console.log('There was an error updating Hotel', JSON.stringify(err))
      return res.send(err)
    })
})
router.delete('/delete/:hotelID', (req, res, next) => {
  const db = req.app.get('db')

  db.Hotel.destroy({
    where: { hotelID: req.params.hotelID },
  })
    .then(() => {
      res.status(200).send('The record has been deleted!')
    })
    .catch((err) => {
      console.log('There was an error deleting Hotel', JSON.stringify(err))
      return res.send(err)
    })
})

module.exports = router
