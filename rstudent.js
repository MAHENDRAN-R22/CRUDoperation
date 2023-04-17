"use strict";
const mFormRecord = require('/home/mahendran/Desktop/expressjs/public/mvalidation.js')
//to save student form details
const savestuRecord = (req, res) => {
     const oQry = {
          "$and": []
     }
     oQry["$and"].push({
          num: req.body.num
     });
     oQry["$and"].push({
          stfl: 'A'
     });
     mFormRecord.find(oQry, {
          _id: 1
     }, {
          lean: true
     }, (err, docs) => {
          console.log(docs)
          if (err) {
               res.status(500).send("error occured")
          } else if (docs.length === 0) {
               const contact = new mFormRecord();
               contact.fName = req.body.fName;
               contact.mName = req.body.mName;
               contact.lName = req.body.lName;
               contact.mailId = req.body.mailId;
               contact.num = req.body.num;
               contact.dob = req.body.dob;
               contact.gender = req.body.gender;
               contact.univ = req.body.univ;
               contact.save((err, sucess) => {
                    if (err) {
                         res.status(500).send("error occured")
                    } else {
                         res.status(200).send("text received..")
                    }
               });
          } else {
               const obj = {
                    code: "DUPLICATE_EXISTS"
               };
               res.status(200).json(obj);
          }
     })
}
// to show record to ui from database
const viewstuRecord = (req, res) => {
     mFormRecord.find({
          stfl: "A"
     }, {
          lean: true
     }, (err, records) => {
          if (err) {
               res.status(500).send("error occured")
          } else {
               res.status(200).send(records);
          }
     });
}
//update form details
const updatestuRecord = (req, res) => {
     const oQry = {
          "$and": []
     }
     oQry["$and"].push({
          _id: {
               $ne: req.body._id
          }
     });
     oQry["$and"].push({
          num: req.body.num
     });
     oQry["$and"].push({
          stfl: 'A'
     });
     mFormRecord.find(oQry, {
          _id: 1
     }, {
          lean: true
     }, (err, docs) => {
          if (docs.length === 0) {
               const osetObj = {
                    $set: {
                         fName: req.body.fName,
                         mName: req.body.mName,
                         lName: req.body.lName,
                         mailId: req.body.mailId,
                         num: req.body.num,
                         dob: req.body.dob,
                         gender: req.body.gender,
                         univ: req.body.univ
                    }
               }
               mFormRecord.updateOne({
                    _id: req.body._id
               }, osetObj,(err, sucess) => {
                    if (err) {
                         res.status(500).send("error occured")
                    } else {
                         res.status(200).send(sucess);
                    }
               });
          } else {
               const obj = {
                    code: "DUPLICATE_EXISTS"
               };
               res.status(200).json(obj);
          }
     })

}
// delete the form record
const deletestuRecord = (req, res) => {
     mFormRecord.updateOne({
          _id: req.body._id
     }, {
          '$set': {
               stfl: "D"
          }
     }).then(function (data) {
          res.status(200).send(data);
     }).catch(function (err) {
          res.status(500).send("error occured")
     })
}
module.exports = {
     savestuRecord,
     viewstuRecord,
     updatestuRecord,
     deletestuRecord
}
