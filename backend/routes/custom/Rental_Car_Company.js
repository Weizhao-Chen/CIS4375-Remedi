const express = require('express')
const router = express.Router({ caseSensitive: true })

//crud - read
//raw : true = returning all values and findAll is where it'll return all of the data
//not using shortcuts like what we use in 4339 cause 
//and 1. its for mongoose 2. its calling sections of a massive table
//where as in here, we are calling the entire code of a table
router.get('/find', (req, res, next) => {
    const db = req.app.get('db')
    return db.Rental_Car_Company.findAll({
        raw : true,
    })
        .then((Rental_Car_Company) => res.send(Rental_Car_Company))
        .catch((err) => {
            console.log('There was an error querying Rental Car Company', JSON.stringify(err))
            return res.send(err)
        });
})
router.post('/create', (req, res, next) => {
    const name_text = req.body.name
    const db = req.app.get('db')
    db.Rental_Car_Company.create({
        projectStatusType: name_text
    })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
        console.log('There was an error creating Rental Car Company', JSON.stringify(err))
        return res.send(err)
    })
})
router.put('/update', (req, res, next) => {
    const projectStatusID = req.body.id
    const projectStatusType = req.body.name
    const db = req.app.get('db')

    db.Rental_Car_Company.update({
        projectStatusType: projectStatusType
        }, {
           where: {
            projectStatusID: projectStatusID
           }
        })
        .then(() => {
            res.status(200).send('OK');
        })
        .catch(err => {
           console.log('There was an error updating Rental Car Company', JSON.stringify(err))
           return res.send(err)
   })
})
// crud - delete by id
router.delete('/delete/:projectstatusid', (req, res, next) => {
    //gets the value of what is being called above and set it to id
    const id = req.params.projectstatusid;
    const db = req.app.get('db')

    db.Rental_Car_Company.destroy({
        //destroy or delete from EMR where the id is equal to what we set earlier
        where: { projectStatusID: id }
    }).then(() => {
        res.status(200).send('The record has been deleted!');
    }).catch(err => {
        console.log('There was an error deleting Rental Car Company', JSON.stringify(err))
        return res.send(err)
    });
})

module.exports = router