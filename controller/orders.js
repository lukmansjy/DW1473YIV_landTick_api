const Model = require('../models')
const Train = Model.train
const TypeTrains = Model.typeTrain
const Order = Model.order
const User = Model.user

const {baseUrl} = require('../config/myConfig')

exports.myTickets = (req, res) =>{
    const userId = req.user.userId
    Order.findAll({
        attributes: ["id", "trainId", "userId", "qty", "totalPrice"],
        include: [
            {
                model: Train,
                attributes: ["id", "nameTrain", "dateStart", "startStation", "startTime", "destinationStation", "arrivalTime", "price", "typeTrainId"],
                as: "train",
                include: [
                    {
                        model: TypeTrains,
                        attributes: ["id", "name"],
                        as: "typeTrain"
                    }
                ]
            },
            {
                model: User,
                attributes: ["id", "name", "username", "email", "gender", "phone", "address"],
                as: "user"
            }
        ],
        
        where: {userId: userId}
    }).then( data => { res.send(data) })
}

exports.payment = (req, res) => {
    const orderId = req.body.orderId
    if(orderId){
        if(req.file){
            const urlFile = `${baseUrl}${req.file.destination.replace(/public\//g, '')}${req.file.filename}`
            const dataUpdate = {
                attachment: urlFile
            }
            Order.update(dataUpdate, {where: {id: orderId}}).then( updated =>{
                if(updated){

                    Order.findOne({
                        attributes: ["id", "trainId", "userId", "qty", "totalPrice", "attachment"],
                        include: [
                            {
                                model: Train,
                                attributes: ["id", "nameTrain", "dateStart", "startStation", "startTime", "destinationStation", "arrivalTime", "price", "typeTrainId"],
                                as: "train",
                                include: [
                                    {
                                        model: TypeTrains,
                                        attributes: ["id", "name"],
                                        as: "typeTrain"
                                    }
                                ]
                            },
                            {
                                model: User,
                                attributes: ["id", "name", "username", "email", "gender", "phone", "address"],
                                as: "user"
                            }
                        ],
                        
                        where: {id: orderId}
                    }).then( data => { res.send(data) })
                }
            } )
        }else{
            res.status(401).send({
                error: true,
                message: "Required image picture"
            })
        }
    }else{
        res.status(401).send({
            error: true,
            message: "Id order null!"
        })
    }
}



exports.ordersAdmin = (req, res) =>{
    const admin = req.user.admin
    if(admin){
        Order.findAll({
            attributes: ["id", "trainId", "userId", "qty", "totalPrice"],
            include: [
                {
                    model: Train,
                    attributes: ["id", "nameTrain", "dateStart", "startStation", "startTime", "destinationStation", "arrivalTime", "price", "typeTrainId"],
                    as: "train",
                    include: [
                        {
                            model: TypeTrains,
                            attributes: ["id", "name"],
                            as: "typeTrain"
                        }
                    ]
                },
                {
                    model: User,
                    attributes: ["id", "name", "username", "email", "gender", "phone", "address"],
                    as: "user"
                }
            ]
        }).then( data => { res.send(data) })
    }else{
        res.status(401).send({
            error: true,
            message: "Your not admin"
        })
    }
}

exports.putOrderById = (req, res) => {
    const body = req.body
    const orderId = req.params.id
    const admin = req.user.admin
    if(admin){
        Order.update(body, {where: {id: orderId}}).then( updated =>{
            if(updated){

                Order.findOne({
                    attributes: ["id", "trainId", "userId", "qty", "totalPrice", "attachment", "status"],
                    include: [
                        {
                            model: Train,
                            attributes: ["id", "nameTrain", "dateStart", "startStation", "startTime", "destinationStation", "arrivalTime", "price", "typeTrainId"],
                            as: "train",
                            include: [
                                {
                                    model: TypeTrains,
                                    attributes: ["id", "name"],
                                    as: "typeTrain"
                                }
                            ]
                        },
                        {
                            model: User,
                            attributes: ["id", "name", "username", "email", "gender", "phone", "address"],
                            as: "user"
                        }
                    ],
                    
                    where: {id: orderId}
                }).then( data => { res.send(data) })

            }
        } )
    }else{
        res.status(401).send({
            error: true,
            message: "Your not admin"
        })
    }
}


exports.getOrderById = (req, res)=>{
    const orderId = req.params.id
    Order.findOne({
        attributes: ["id", "trainId", "userId", "qty", "totalPrice", "attachment"],
        include: [
            {
                model: Train,
                attributes: ["id", "nameTrain", "dateStart", "startStation", "startTime", "destinationStation", "arrivalTime", "price", "typeTrainId"],
                as: "train",
                include: [
                    {
                        model: TypeTrains,
                        attributes: ["id", "name"],
                        as: "typeTrain"
                    }
                ]
            },
            {
                model: User,
                attributes: ["id", "name", "username", "email", "gender", "phone", "address"],
                as: "user"
            }
        ],
        where: {id: orderId}
    }).then(data => {
        res.send(data)
    })
}

exports.orderTicket = (req, res) =>{
    const trainId = req.body.trainId
    const qty = req.body.qty
    Train.findOne({
        attributes: ["price"],
        where: {id: trainId}
    }).then(dataTrain => {
        const totalPrice = (dataTrain.price * qty)
        const dataOrder = {
            trainId: trainId,
            userId: req.user.userId,
            qty: qty,
            totalPrice: totalPrice,
            status: "Pending"
        }
        Order.create(dataOrder).then( order => {
            if(order){
                const orderId = order.id
                Order.findOne({
                    attributes: ["id", "trainId", "userId", "qty", "totalPrice", "attachment"],
                    include: [
                        {
                            model: Train,
                            attributes: ["id", "nameTrain", "dateStart", "startStation", "startTime", "destinationStation", "arrivalTime", "price", "typeTrainId"],
                            as: "train",
                            include: [
                                {
                                    model: TypeTrains,
                                    attributes: ["id", "name"],
                                    as: "typeTrain"
                                }
                            ]
                        },
                        {
                            model: User,
                            attributes: ["id", "name", "username", "email", "gender", "phone", "address"],
                            as: "user"
                        }
                    ],
                    where: {id: orderId}
                }).then(data => {
                    res.send(data)
                })
            }else{
                res.status(400).send({
                    error: true,
                    message: "Add order error"
                })
            }
        })

    })

}