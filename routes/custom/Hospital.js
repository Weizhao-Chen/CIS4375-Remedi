const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')
    return db.Hospital.findAll({
      raw: true,
    })
        .then((Hospital) => res.send(Hospital))
        .catch((err) => {
            console.log('There was an error querying Hospital 1', JSON.stringify(err))
            return res.send(err)
        });
})
router.get('/find/:hospitalid', (req, res, next) => {
    const db = req.app.get('db')

    return db.Hospital.find({
        where: {
          hospitalID:req.params.hospitalid
        }
    })
        .then((Hospital) => {
            res.send(Hospital)
        })
        .catch((err) => {
            console.log('There was an error querying Hospital 2', JSON.stringify(err))
            return res.send(err)
        });
})
router.post('/create', (req, res, next) => {
    const db = req.app.get('db')
    db.Hospital.create({
        hospitalName: req.body.HospitalName,
        hospitalAddressLineOne: req.body.HospitalAddressLineOne,
        hospitalAddressLineTwo: req.body.HospitalAddressLineTwo,
        hospitalCity: req.body.HospitalCity,
        hospitalState: req.body.HospitalState,
        hospitalZipCode: req.body.HospitalZipCode,
        hospitalContactName: req.body.HospitalContactName,
        hospitalContactPhone: req.body.HospitalContactPhone,
        hospitalContactEmail: req.body.HospitalContactEmail
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
        console.log('There was an error creating Hospital', JSON.stringify(err))
        return res.send(err)
    })
})
router.put('/update/:hospitalid', (req, res, next) => {
    const db = req.app.get('db')

    db.Hospital.update({
        hospitalName: req.body.HospitalName,
        hospitalAddressLineOne: req.body.HospitalAddressLineOne,
        hospitalAddressLineTwo: req.body.HospitalAddressLineTwo,
        hospitalCity: req.body.HospitalCity,
        hospitalState: req.body.HospitalState,
        hospitalZipCode: req.body.HospitalZipCode,
        hospitalContactName: req.body.HospitalContactName,
        hospitalContactPhone: req.body.HospitalContactPhone,
        hospitalContactEmail: req.body.HospitalContactEmail
        }, {
           where: {
            hospitalID: req.params.hospitalid
           }
        })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
           console.log('There was an error updating Hospital', JSON.stringify(err))
           return res.send(err)
   })
})
router.delete('/delete/:hospitalid', (req, res, next) => {
    const db = req.app.get('db')

    db.Hospital.destroy({
        where: { hospitalID: req.params.hospitalid }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting Hospital', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router