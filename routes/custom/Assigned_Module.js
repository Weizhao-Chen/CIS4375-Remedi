const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
  const db = req.app.get('db')
  return db.Assigned_Module.findAll({
    include: [db.Contractor, db.Module, db.Project],
  })
    .then((Assigned_Module) => res.send(Assigned_Module))
    .catch((err) => {
      console.log(
        'There was an error querying Contractor Project 1',
        JSON.stringify(err),
      )
      return res.send(err)
    })
})

// router.get('/find', (req, res, next) => {
//   const db = req.app.get('db')
//   return db.Preferred_Module.findAll({})
//     .then((Module) => res.send(Module))
//     .catch((err) => {
//       console.log('There was an error querying Module', JSON.stringify(err))
//       return res.send(err)
//     })
// })

router.get('/find/:contractorID', (req, res, next) => {
  const db = req.app.get('db')

  return db.Assigned_Module.findAll({
    where: {
      contractorID: req.params.contractorID,
    },
    include: [db.Module, db.Project],
  })
    .then((Module) => {
      res.send(Module)
    })
    .catch((err) => {
      console.log('There was an error querying Module', JSON.stringify(err))
      return res.send(err)
    })
})
router.post('/create', (req, res, next) => {
  const db = req.app.get('db')
  db.Assigned_Module.create({
    contractorID: req.body.contractorID,
    moduleID: req.body.moduleID,
    projectID: req.body.projectID,
  })
    .then(() => {
      res.status(200).send('OK')
    })
    .catch((err) => {
      console.log('There was an error creating Module', JSON.stringify(err))
      return res.send(err)
    })
})
// router.put('/update/:moduleid', (req, res, next) => {
//   const db = req.app.get('db')

//   db.Module.update(
//     {
//       emrID: req.body.EMRID,
//       moduleName: req.body.ModuleName,
//     },
//     {
//       where: {
//         moduleID: req.params.moduleid,
//       },
//     },
//   )
//     .then(() => {
//       res.status(200).send('OK')
//     })
//     .catch((err) => {
//       console.log('There was an error updating Module', JSON.stringify(err))
//       return res.send(err)
//     })
// })

router.delete('/delete/:contractorID/:projectID', (req, res, next) => {
  const db = req.app.get('db')

  db.Assigned_Module.destroy({
    where: {
      contractorID: req.params.contractorID,
      projectID: req.params.projectID,
    },
  })
    .then(() => {
      res.status(200).send('The record has been deleted!')
    })
    .catch((err) => {
      console.log('There was an error deleting Module', JSON.stringify(err))
      return res.send(err)
    })
})

// router.delete('/delete/:moduleID', (req, res, next) => {
//   const db = req.app.get('db')

//   db.Assigned_Module.destroy({
//     where: {
//       moduleID: req.params.moduleID,
//     },
//   })
//     .then(() => {
//       res.status(200).send('The record has been deleted!')
//     })
//     .catch((err) => {
//       console.log('There was an error deleting Module', JSON.stringify(err))
//       return res.send(err)
//     })
// })

module.exports = router
