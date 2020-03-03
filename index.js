const express = require('express')
const bodyParer = require('body-parser')
const cors = require('cors')
require('express-group-routes')

// Middlewares
const { authenticated } = require('./middleware')

// Controller
const authContoller = require('./controller/auth')
const ticketsController = require('./controller/tickets')
const ordersController = require('./controller/orders')
const UploadsController = require('./controller/uploads')

const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(bodyParer.json())

app.group('/api/v1', (router)=>{
    // Tikets
    router.get('/tickets', ticketsController.getTicketsStartTime)
    router.get('/my_tickets', authenticated, ordersController.myTickets) // Get ALL my Ticket
    router.post('/ticket', authenticated, ticketsController.crateTicket) // Crate tiket

    // Auth
    router.post('/login', authContoller.login)
    router.post('/register', authContoller.register)
    
    // uploadPayment
    // Comfrim Payment
    router.post('/order_pay', authenticated, UploadsController.uploadPayment, ordersController.payment) // Komfrimasi payment
    router.post('/order', authenticated, ordersController.orderTicket) // Order ticket
    router.get('/orders', authenticated, ordersController.ordersAdmin) // get all orders (Admin)
    router.put('/order/:id', authenticated, ordersController.putOrderById) // aprove order (Admin)
    router.get('/order/:id', authenticated, ordersController.getOrderById) // Get Detail Order by id
})

app.get('/', (req, res)=>{
    res.send('Selamat Datang')
})

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({
            error: true,
            message: err.name + ": " + err.message
        });
    } else
        next(err)
});

app.listen(port, ()=> console.log(`Running in port ${port}`))
