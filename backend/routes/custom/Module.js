const express = require('express')
const router = express.Router({ caseSensitive: true })

router.get('/find', (req, res, next) => {
    const db = req.app.get('db')
    return db.Module.findAll({
        include: [
            db.EMR
        ]
    })
        .then((Module) => res.send(Module))
        .catch((err) => {
            console.log('There was an error querying Module', JSON.stringify(err))
            return res.send(err)
        });
})

router.get('/find/:moduleid', (req, res, next) => {
    const db = req.app.get('db')

    return db.Module.find({
        where: {
            moduleID:req.params.moduleid
        }
    })
        .then((Module) => {
            res.send(Module)
        })
        .catch((err) => {
            console.log('There was an error querying Module', JSON.stringify(err))
            return res.send(err)
        });
})
router.post('/create', (req, res, next) => {
    const db = req.app.get('db')
    db.Module.create({
        emrID: req.body.EMRID,
        moduleName: req.body.ModuleName
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
        console.log('There was an error creating Module', JSON.stringify(err))
        return res.send(err)
    })
})
router.put('/update/:moduleid', (req, res, next) => {
    const db = req.app.get('db')

    db.Module.update({
        emrID: req.body.EMRID,
        moduleName: req.body.ModuleName
        }, {
           where: {
               moduleID: req.params.moduleid
           }
        })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
           console.log('There was an error updating Module', JSON.stringify(err))
           return res.send(err)
   })
})
router.delete('/delete/:moduleid', (req, res, next) => {
    const db = req.app.get('db')

    db.Module.destroy({
        where: { moduleID: req.params.moduleid }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting EMR', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router