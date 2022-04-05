const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')
    return db.Assigned_Clinic_Area.findAll({
        include: [
            db.Contractor,
            db.Clinic_Area
        ]
    })
        .then((Assigned_Clinic_Area) => res.send(Assigned_Clinic_Area))
        .catch((err) => {
            console.log('There was an error querying Assigned Clinic Area', JSON.stringify(err))
            return res.send(err)
        });
})
router.get('/find/:assignedclinicareaid', (req, res, next) => {
    const db = req.app.get('db')

    return db.Assigned_Clinic_Area.find({
        where: {
            assignedClinicAreaID:req.params.assignedclinicareaid,
        }
    })
        .then((Assigned_Clinic_Area) => {
            res.send(Assigned_Clinic_Area)
        })
        .catch((err) => {
            console.log('There was an error querying Assigned Clinic Area 2', JSON.stringify(err))
            return res.send(err)
        });
})
router.post('/create', (req, res, next) => {
    const db = req.app.get('db')
    db.Assigned_Clinic_Area.create({
        contractorID: req.body.ContractorID,
        clinicID: req.body.ClinicID
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
        console.log('There was an error creating Assigned Clinic Area', JSON.stringify(err))
        return res.send(err)
    })
})
router.put('/update/:assignedclinicareaid', (req, res, next) => {
    const db = req.app.get('db')
    db.Assigned_Clinic_Area.update({
        contractorID: req.body.ContractorID,
        clinicID: req.body.ClinicID
        }, {
            where: {
                assignedClinicAreaID: assignedclinicareaid
            }
        })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
           console.log('There was an error updating Assigned Clinic Area', JSON.stringify(err))
           return res.send(err)
   })
})
router.delete('/delete/:ContractorID/ClinicID', (req, res, next) => {
    const db = req.app.get('db')
    const ContractorIDs = req.params.ContractorID
    const ClinicIDs = req.params.ClinicID
    db.Assigned_Clinic_Area.destroy({
        where: { ContractorID: ContractorIDs,
            ClinicID: ClinicIDs}
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting Assigned Clinic Area', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router