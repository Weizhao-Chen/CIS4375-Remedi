const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')
    return db.EMR.findAll({
        raw : true,
    })
        .then((EMR) => res.send(EMR))
        .catch((err) => {
            console.log('There was an error querying EMR', JSON.stringify(err))
            return res.send(err)
        });
})

//placeholder
router.get('/findlist', (req, res, next) => {
    const db = req.app.get('db')

    return db.EMR.findAll({
        attributes:['emrID','emrName']
    })
        .then((EMR) => res.send(EMR))
        .catch((err) => {
            console.log('There was an error querying EMR', JSON.stringify(err))
            return res.send(err)
        });
})

//placeholder
router.get('/find/:emrid', (req, res, next) => {
    const db = req.app.get('db')

    return db.EMR.find({
        where: {
            emrID:req.params.emrid
        }
    })
        .then((EMR) => {
            res.send(EMR)
        })
        .catch((err) => {
            console.log('There was an error querying EMR', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    // const name_text = req.body.emrName
    const db = req.app.get('db')
    db.EMR.create({
        emrName: req.body.emrName
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
        console.log('There was an error creating EMR', JSON.stringify(err))
        return res.send(err)
    })
})

router.put('/update/:emrid', (req, res, next) => {
    // const emrID = req.body.emrID
    // const name_text = req.body.emrName
    const db = req.app.get('db')

    db.EMR.update({
        emrName: req.body.emrName
        }, {
            where: {
                emrID: req.body.emrid
            }
        })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
            console.log('There was an error updating EMR', JSON.stringify(err))
            return res.send(err)
    })
})

router.delete('/delete/:emrid', (req, res, next) => {
    // const id = req.params.emrid;
    const db = req.app.get('db')

    db.EMR.destroy({
        where: { emrID: req.params.emrid }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting EMR', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router