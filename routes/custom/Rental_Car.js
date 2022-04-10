const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')
    return db.Rental_Car.findAll({
        // include: [
        //     db.Hospital,
        //     db.Project_Status
        // ]
    })
        .then((Rental_Car) => res.send(Rental_Car))
        .catch((err) => {
            console.log('There was an error querying Rental Car 1', JSON.stringify(err))
            return res.send(err)
        });
})

router.get('/find/:rentalcarid', (req, res, next) => {
    const db = req.app.get('db')

    return db.Rental_Car.find({
        where: {
            rentalCarID:req.params.rentalcarid
        }
    })
        .then((Rental_Car) => {
            res.send(Rental_Car)
        })
        .catch((err) => {
            console.log('There was an error querying Rental Car 2', JSON.stringify(err))
            return res.send(err)
        });
})
router.post('/create', (req, res, next) => {
    const db = req.app.get('db')
    db.Rental_Car.create({
        rentalCarModel: req.body.RentalCarModel,
        rentalCarMake: req.body.RentalCarMake,
        rentalLicense: req.body.RentalLicense
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
        console.log('There was an error creating Rental Car', JSON.stringify(err))
        return res.send(err)
    })
})
router.put('/update/:rentalcarid', (req, res, next) => {
    const db = req.app.get('db')

    db.Rental_Car.update({
        rentalCarModel: req.body.RentalCarModel,
        rentalCarMake: req.body.RentalCarMake,
        rentalLicense: req.body.RentalLicense
        }, {
           where: {
            rentalCarID: req.params.rentalcarid
           }
        })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
           console.log('There was an error updating Rental Car', JSON.stringify(err))
           return res.send(err)
   })
})
router.delete('/delete/:rentalcarid', (req, res, next) => {
    const db = req.app.get('db')

    db.Rental_Car.destroy({
        where: { rentalCarID: req.params.rentalcarid }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting Rental Car', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router