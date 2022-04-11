const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
  const db = req.app.get('db')
  return db.Clinic_Area.findAll({
    include: [db.Hospital],
  })
    .then((Clinic_Area) => res.send(Clinic_Area))
    .catch((err) => {
      console.log(
        'There was an error querying Clinic Area 1',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})

router.get('/find/:clinicid', (req, res, next) => {
  const db = req.app.get('db')

  return db.Clinic_Area.find({
    where: {
      clinicID: req.params.clinicid,
    },
  })
    .then((Clinic_Area) => {
      res.send(Clinic_Area)
    })
    .catch((err) => {
      console.log(
        'There was an error querying Clinic Area 2',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})

//finds by hospitalID
router.get('/find_by_hospital/:hospitalID', (req, res, next) => {
  const db = req.app.get('db')

  return db.Clinic_Area.findAll({
    where: {
      hospitalID: req.params.hospitalID,
    },
  })
    .then((Clinic_Area) => {
      res.send(Clinic_Area)
    })
    .catch((err) => {
      console.log(
        'There was an error querying Clinic Area 2',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})
router.post('/create', (req, res, next) => {
  const db = req.app.get('db')
  db.Clinic_Area.create({
    clinicAreaName: req.body.ClinicAreaName,
    hospitalID: req.body.HospitalID,
    clinicAreaLead: req.body.ClinicAreaLead,
    clinicAreaLeadPhone: req.body.ClinicAreaLeadPhone,
    clinicAreaLeadEmail: req.body.ClinicAreaLeadEmail,
  })
    .then(() => {
      res.status(200).send('OK')
    })
    .catch((err) => {
      console.log(
        'There was an error creating Clinic Area',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})
router.put('/update/:clinicid', (req, res, next) => {
  const db = req.app.get('db')

  db.Clinic_Area.update(
    {
      clinicAreaName: req.body.ClinicAreaName,
      hospitalID: req.body.HospitalID,
      clinicAreaLead: req.body.ClinicAreaLead,
      clinicAreaLeadPhone: req.body.ClinicAreaLeadPhone,
      clinicAreaLeadEmail: req.body.ClinicAreaLeadEmail,
    },
    {
      where: {
        clinicID: req.params.clinicid,
      },
    },
  )
    .then(() => {
      res.status(200).send('OK')
    })
    .catch((err) => {
      console.log(
        'There was an error updating Clinic Area',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})
router.delete('/delete/:clinicid', (req, res, next) => {
  const db = req.app.get('db')

  db.Clinic_Area.destroy({
    where: { clinicID: req.params.clinicid },
  })
    .then(() => {
      res.status(200).send('The record has been deleted!')
    })
    .catch((err) => {
      console.log(
        'There was an error deleting Clinic Area',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})

module.exports = router
