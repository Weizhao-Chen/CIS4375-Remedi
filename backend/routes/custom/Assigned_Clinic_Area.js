const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')
    return db.Assigned_Clinic_Area.findAll({
        include: [
            {
                model: db.Contractor,
                attributes: ['contractorID']
            },
            {
                model: db.Clinic_Area,
                attributes: ['clinicID']
            }
        ]
    })
        .then((Assigned_Clinic_Area) => res.send(Assigned_Clinic_Area))
        .catch((err) => {
            console.log('There was an error querying Assigned Clinic Area', JSON.stringify(err))
            return res.send(err)
        });
})
// router.get('/find/:contractorid', (req, res, next) => {
//     const db = req.app.get('db')

//     return db.Assigned_Clinic_Area.find({
//         where: {
//             contractorID:req.params.contractorid,
//             include: [
//                 db.Contractor,
//             db.Clinic_Area

//                 // {
//                 //     model: db.Contractor,
//                 //     attributes: ['contractorID','lastName']
//                 // },
//                 // {
//                 //     model: db.Clinic_Area,
//                 //     attributes: ['clinicID','clinicAreaName']
//                 // }
//             ]
//         }
//     })
//         .then((Assigned_Clinic_Area) => {
//             res.send(Assigned_Clinic_Area)
//         })
//         .catch((err) => {
//             console.log('There was an error querying Assigned Clinic Area 2', JSON.stringify(err))
//             return res.send(err)
//         });
// })
router.post('/create', (req, res, next) => {
    const db = req.app.get('db')

    const id1 = req.body.ContractorID
    const id2 = req.body.ClinicID
    db.Assigned_Clinic_Area.create({
        // lastName: req.body.LastName,
        // clinicAreaName: req.body.ClinicAreaName,
        contractorID: id1,
        clinicID: id2
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
        console.log('There was an error creating Assigned Clinic Area', JSON.stringify(err))
        return res.send(err)
    })
})
router.put('/update', (req, res, next) => {
    const db = req.app.get('db')
    const id1 = req.body.ContractorID
    const id2 = req.body.ClinicID
    db.Assigned_Clinic_Area.update({
        contractorID: id1,
        clinicID: id2
        }, {
           where: {
                contractorID: contractorID
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
router.delete('/delete/:contractorid', (req, res, next) => {
    const db = req.app.get('db')

    db.Assigned_Clinic_Area.destroy({
        where: { contractorID: contractorid }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting Assigned Clinic Area', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router