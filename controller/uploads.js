const multer = require('multer')

// Multer Upload
const multerDiskStore_Payement = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, 'public/uploads/payment/')
    },
    filename: (req, file, callback) =>{
        const originalFile = file.originalname
        const nameArr = originalFile.split('.')
        var extension = ''
        if(nameArr.length > 1){
            extension = nameArr[nameArr.length - 1]
        }
        callback(null, `${file.fieldname}-${Date.now()}.${extension}`)
    }
})

const multerUpload_Payment = multer({storage: multerDiskStore_Payement})


exports.uploadPayment = multerUpload_Payment.single('payment'), (req, res, next)=>{
    next()
}
