const express = require('express')
const router = express.Router({ caseSensitive: true })

//crud - read
//raw : true = returning all values and findAll is where it'll return all of the data
//not using shortcuts like what we use in 4339 cause 
//and 1. its for mongoose 2. its calling sections of a massive table
//where as in here, we are calling the entire code of a table
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
//crud - create
router.post('/create', (req, res, next) => {
    //since the id is auto increment, there is no need to call it again.
    //the reason to use req.body.name instead of req.body.emrName is that its calling from the label and not the field type when we did our export in emrList.vue
    //u can see it from emrList.vue from line 61 to 66.
    const name_text = req.body.name
    const db = req.app.get('db')
    db.Module.create({
        emrID: req.body.emrid,
        moduleName: name_text
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
        console.log('There was an error creating Module', JSON.stringify(err))
        return res.send(err)
    })
})
// crud - update
router.put('/update/:moduleid', (req, res, next) => {
    //preload the data into emrID and emrName
    const db = req.app.get('db')

    db.Module.update({
        emrID: req.body.emrid,
        moduleName: req.body.name
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