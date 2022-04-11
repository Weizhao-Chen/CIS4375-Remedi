const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
  const db = req.app.get('db')
  return db.Assigned_Clinic_Area.findAll({
    include: [db.Contractor, db.Clinic_Area],
  })
    .then((Assigned_Clinic_Area) => res.send(Assigned_Clinic_Area))
    .catch((err) => {
      console.log(
        'There was an error querying Assigned Clinic Area',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})
router.get('/find/:ContractorID/:ClinicID', (req, res, next) => {
  const db = req.app.get('db')

  return db.Assigned_Clinic_Area.find({
    where: {
      contractorID: req.params.ContractorID,
      clinicID: req.params.ClinicID,
    },
    include: [db.Contractor, db.Clinic_Area],
  })
    .then((Assigned_Clinic_Area) => {
      res.send(Assigned_Clinic_Area)
    })
    .catch((err) => {
      console.log(
        'There was an error querying Assigned Clinic Area 2',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})
//find by contractorID
router.get('/find/:ContractorID', (req, res, next) => {
  const db = req.app.get('db')

  return db.Assigned_Clinic_Area.findAll({
    where: {
      contractorID: req.params.ContractorID,
    },
    include: [db.Contractor, db.Clinic_Area],
  })
    .then((Assigned_Clinic_Area) => {
      res.send(Assigned_Clinic_Area)
    })
    .catch((err) => {
      console.log(
        'There was an error querying Assigned Clinic Area 2',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})
router.post('/create', (req, res, next) => {
  const db = req.app.get('db')

  return db.Assigned_Clinic_Area.create({
    contractorID: req.body.ContractorID,
    clinicID: req.body.ClinicID,
  })
    .then(() => {
      res.status(200).send('OK')
    })
    .catch((err) => {
      console.log(
        'There was an error creating Assigned Clinic Area',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})
router.put('/update/:assignedclinicareaid', (req, res, next) => {
  const db = req.app.get('db')
  db.Assigned_Clinic_Area.update(
    {
      contractorID: req.body.ContractorID,
      clinicID: req.body.ClinicID,
    },
    {
      where: {
        assignedClinicAreaID: assignedclinicareaid,
      },
    },
  )
    .then(() => {
      res.status(200).send('OK')
    })
    .catch((err) => {
      console.log(
        'There was an error updating Assigned Clinic Area',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})
router.delete('/delete/:ContractorID/:ClinicID', (req, res, next) => {
  const db = req.app.get('db')

  db.Assigned_Clinic_Area.destroy({
    where: {
      contractorID: req.params.ContractorID,
      clinicID: req.params.ClinicID,
    },
  })
    .then(() => {
      res.status(200).send('The record has been deleted!')
    })
    .catch((err) => {
      console.log(
        'There was an error deleting Assigned Clinic Area',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})

module.exports = router
