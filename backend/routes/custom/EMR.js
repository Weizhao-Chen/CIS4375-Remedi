const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const dbo = req.app.get('db')
    return dbo.EMR.findAll({
        raw : true,
    })
        .then((EMR) => res.send(EMR))
        .catch((err) => {
            console.log('There was an error querying EMR', JSON.stringify(err))
            return res.send(err)
        });
})

router.post('/create', (req, res, next) => {
    const name_text = req.body.name
    const dbo = req.app.get('dbo')
    dbo.EMR.create({
        emrName: name_text
        })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
        console.log('There was an error updating EMR', JSON.stringify(err))
        return res.send(err)
    })
})

router.put('/update', (req, res, next) => {
    const emrID = req.body.id
    const name_text = req.body.name
    const dbo = req.app.get('dbo')

    console.log(req.body.name)
    
    dbo.EMR.update({
        emrName: name_text
        }, {
            where: {
                emrID: emrID
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

router.delete('/delete/:emrID', (req, res, next) => {
    const id = req.params.emrID;
    const dbo = req.app.get('dbo')

    dbo.EMR.destroy({
        where: { emrID: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting EMR', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router