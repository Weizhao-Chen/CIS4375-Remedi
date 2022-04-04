const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')
    return db.Project.findAll({
        include: [
            db.Hospital,
            db.Project_Status
        ]
    })
        .then((Project) => res.send(Project))
        .catch((err) => {
            console.log('There was an error querying Project 1', JSON.stringify(err))
            return res.send(err)
        });
})

router.get('/find/:projectid', (req, res, next) => {
    const db = req.app.get('db')

    return db.Project.find({
        where: {
            projectID:req.params.projectid
        }
    })
        .then((Project) => {
            res.send(Project)
        })
        .catch((err) => {
            console.log('There was an error querying Project 2', JSON.stringify(err))
            return res.send(err)
        });
})
router.post('/create', (req, res, next) => {
    const db = req.app.get('db')
    db.Project.create({
        projectName: req.body.ProjectName,
        projectStartDate: req.body.ProjectStartDate,
        projectEndDate: req.body.ProjectEndDate,
        projectNotes: req.body.ProjectNotes,
        hospitalID: req.body.HospitalID,
        projectStatusID: req.body.ProjectStatusID
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
        console.log('There was an error creating Project', JSON.stringify(err))
        return res.send(err)
    })
})
router.put('/update/:projectid', (req, res, next) => {
    const db = req.app.get('db')

    db.Project.update({
        projectName: req.body.ProjectName,
        projectStartDate: req.body.ProjectStartDate,
        projectEndDate: req.body.ProjectEndDate,
        projectNotes: req.body.ProjectNotes,
        hospitalID: req.body.HospitalID,
        projectStatusID: req.body.ProjectStatusID
        }, {
           where: {
            projectID: req.params.projectid
           }
        })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
           console.log('There was an error updating Project', JSON.stringify(err))
           return res.send(err)
   })
})
router.delete('/delete/:projectid', (req, res, next) => {
    const db = req.app.get('db')

    db.Project.destroy({
        where: { projectID: req.params.projectid }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting Project', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router