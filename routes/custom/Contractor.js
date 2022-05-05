const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
  const db = req.app.get('db')
  return db.Contractor.findAll({
    include: [db.Contractor_Status],
  })
    .then((Contractor) => res.send(Contractor))
    .catch((err) => {
      console.log(
        'There was an error querying Contractor 1',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})

router.get('/find/:contractorid', (req, res, next) => {
  const db = req.app.get('db')

  return db.Contractor.find({
    where: {
      contractorID: req.params.contractorid,
    },
  })
    .then((Contractor) => {
      res.send(Contractor)
    })
    .catch((err) => {
      console.log(
        'There was an error querying Contractor 2',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})
router.post('/create', (req, res, next) => {
  const db = req.app.get('db')
  console.log(req.body)
  db.Contractor.create({
    virtualOnsite: req.body.VirtualOnsite,
    lastName: req.body.LastName,
    firstName: req.body.FirstName,
    preferredName: req.body.PreferredName,
    addressLineOne: req.body.AddressLineOne,
    addressLineTwo: req.body.AddressLineTwo,
    city: req.body.City,
    state: req.body.State,
    zipCode: req.body.ZipCode,
    phoneNumber: req.body.PhoneNumber,
    email: req.body.Email,
    remediHistory: req.body.RemediHistory,
    supportWisdom: req.body.SupportWisdom,
    numberOfGoLives: req.body.NumberOfGoLives,
    numberofEpicProjects: req.body.NumberofEpicProjects,
    yearsOfSupportEpic: req.body.YearsOfSupportEpic,
    supportVirtualEpic: req.body.SupportVirtualEpic,
    creditCardHotel: req.body.CreditCardHotel,
    hotelName: req.body.HotelName,
    hotelCheckIn: req.body.HotelCheckIn,
    hotelCheckOut: req.body.HotelCheckOut,
    contractorStatusID: req.body.ContractorStatusID,
  })
    .then(() => {
      res.status(200).send('OK')
    })
    .catch((err) => {
      console.log('There was an error creating Contractor', JSON.stringify(err))
      return res.send(err)
    })
})
router.put('/update/:contractorid', (req, res, next) => {
  const db = req.app.get('db')

  db.Contractor.update(
    {
      virtualOnsite: req.body.VirtualOnsite,
      lastName: req.body.LastName,
      firstName: req.body.FirstName,
      preferredName: req.body.PreferredName,
      addressLineOne: req.body.AddressLineOne,
      addressLineTwo: req.body.AddressLineTwo,
      city: req.body.City,
      state: req.body.State,
      zipCode: req.body.ZipCode,
      phoneNumber: req.body.PhoneNumber,
      email: req.body.Email,
      remediHistory: req.body.RemediHistory,
      supportWisdom: req.body.SupportWisdom,
      numberOfGoLives: req.body.NumberOfGoLives,
      numberofEpicProjects: req.body.NumberofEpicProjects,
      yearsOfSupportEpic: req.body.YearsOfSupportEpic,
      supportVirtualEpic: req.body.SupportVirtualEpic,
      creditCardHotel: req.body.CreditCardHotel,
      hotelName: req.body.HotelName,
      hotelCheckIn: req.body.HotelCheckIn,
      hotelCheckOut: req.body.HotelCheckOut,
      contractorStatusID: req.body.ContractorStatusID,
    },
    {
      where: {
        contractorID: req.params.contractorid,
      },
    },
  )
    .then(() => {
      res.status(200).send('OK')
    })
    .catch((err) => {
      console.log('There was an error updating Contractor', JSON.stringify(err))
      return res.send(err)
    })
})
router.delete('/delete/:contractorid', (req, res, next) => {
  const db = req.app.get('db')

  db.Contractor.destroy({
    where: { contractorID: req.params.contractorid },
  })
    .then(() => {
      res.status(200).send('The record has been deleted!')
    })
    .catch((err) => {
      console.log('There was an error deleting Contractor', JSON.stringify(err))
      return res.send(err)
    })
})

module.exports = router
