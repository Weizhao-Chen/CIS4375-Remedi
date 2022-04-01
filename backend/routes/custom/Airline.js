const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')
    return db.Airline.findAll({
        raw : true,
    })
        .then((Airline) => res.send(Airline))
        .catch((err) => {
            console.log('There was an error querying Airline 1', JSON.stringify(err))
            return res.send(err)
        });
})
router.post('/create', (req, res, next) => {
    const db = req.app.get('db')
    db.Airline.create({
        airlineName: req.body.AirlineName,
        airlinePhoneNumber: req.body.AirlinePhoneNumber,
        airlineAddressLineOne: req.body.AirlineAddressLineOne,
        airlineAddressLineTwo: req.body.AirlineAddressLineTwo,
        airlineCity: req.body.AirlineCity,
        airlineState: req.body.AirlineState,
        airlineZipCode: req.body.AirlineZipCode,
        airlineCountry: req.body.AirlineCountry,
        airlineWebsite: req.body.AirlineWebsite
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
        console.log('There was an error creating Airline', JSON.stringify(err))
        return res.send(err)
    })
})

router.get('/findlist', (req, res, next) => {
    const db = req.app.get('db')

    return db.Airline.findAll({
        attributes:['airlineName','airlinePhoneNumber']
    })
        .then((Airline) => res.send(Airline))
        .catch((err) => {
            console.log('There was an error querying Airline 2', JSON.stringify(err))
            return res.send(err)
        });
})

router.get('/findOne/:airlineid', (req, res, next) => {
    const db = req.app.get('db')

    return db.Airline.find({
        where: {airlineID:req.params.airlineid}
    })
        .then((Airline) => {
            res.send(Airline)
        })
        .catch((err) => {
            console.log('There was an error querying Airline 3', JSON.stringify(err))
            return res.send(err)
        });
})

router.put('/update/:airlineid', (req, res, next) => {
    const db = req.app.get('db')

    db.Airline.update({
        airlineName: req.body.AirlineName,
        airlinePhoneNumber: req.body.AirlinePhoneNumber,
        airlineAddressLineOne: req.body.AirlineAddressLineOne,
        airlineAddressLineTwo: req.body.AirlineAddressLineTwo,
        airlineCity: req.body.AirlineCity,
        airlineState: req.body.AirlineState,
        airlineZipCode: req.body.AirlineZipCode,
        airlineCountry: req.body.AirlineCountry,
        airlineWebsite: req.body.AirlineWebsite
        }, {
           where: {
            airlineID: airlineid
           }
        })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
           console.log('There was an error updating Airline', JSON.stringify(err))
           return res.send(err)
   })
})
router.delete('/delete/:airlineid', (req, res, next) => {
    const db = req.app.get('db')

    db.Airline.destroy({
        where: { airlineID: req.params.airlineid }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting Airline', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router