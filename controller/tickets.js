const Model = require('../models')
const { Op } = require('sequelize');
const Train = Model.train
const TypeTrain = Model.typeTrain

exports.getTicketsStartTime = (req, res) =>{
    const startTime = req.query.start_time
    const dateTimeGte = req.query.date_time_gte
    const dateTimeLte = req.query.date_time_lte
    const startStation = req.query.start_station
    const destinationStation = req.query.destination_station
    if(startTime){
        Train.findAll({
            attributes: ["id", "nameTrain", "dateStart", "startStation", "startTime", "destinationStation", "arrivalTime", "price", "qty"],
            include: [
                {
                  model: TypeTrain,
                  attributes: ["id", "name"],
                  as: "typeTrain"
                }
            ],
            where: {dateStart: req.query.start_time}
            }).then( data => {
                res.send(data)
        })
    }else if(dateTimeGte && dateTimeLte){
        console.log(req.query)
        Train.findAll({
            attributes: ["id", "nameTrain", "dateStart", "startStation", "startTime", "destinationStation", "arrivalTime", "price", "qty"],
            include: [
                {
                  model: TypeTrain,
                  attributes: ["id", "name"],
                  as: "typeTrain"
                }
            ],
            where: {
                [Op.and]: [
                  { dateStart:  {[Op.gte]: dateTimeGte} },
                  { dateStart: {[Op.lte]: dateTimeLte }}
                ],
                startStation: { [Op.like]: `%${startStation}%`},
                destinationStation: { [Op.like]: `%${destinationStation}%`}
            }
        }).then( data => {
                res.send(data)
        })
    }else{
        res.status(400).send({
            error: true,
            message: 'param start_time required example [api]/tickets?start_time=2020-03-03 OR [api]/tickets?date_time_gte=2020-03-01&date_time_lte=2020-03-02'
        })
    }
}


exports.crateTicket = (req, res) => {
    const admin = req.user.admin
    if(admin){
        const body = req.body
        const dataCrate = {
            nameTrain: body.nameTrain,
            typeTrainId: body.typeTrain.id,
            dateStart: body.dateStart,
            startStation: body.startStation,
            startTime: body.timeStart,
            destinationStation: body.destinationStation,
            arrivalTime: body.arrivalTime,
            price: body.price,
            qty: body.qty
        }
        Train.create(dataCrate).then( data => {
            if(data){
                Train.findOne({
                    attributes: ["id", "dateStart", "startStation", "startTime", "destinationStation", "arrivalTime", "price", "qty"],
                    include: [
                        {
                          model: TypeTrain,
                          attributes: ["id", "name"],
                          as: "typeTrain"
                        }
                    ],
                    where: {id: data.id}
                }).then( data => {
                    res.send(data)
                })
            }else{
                res.status(400).send({
                    error: true,
                    message: "System insert data error"
                })
            }
        })
    }else{
        res.status(401).send({
            error: true,
            message: "Your not admin"
        })
    }
}