const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const conectBD = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser :true,
            useUnifiedTopology :true
        })
        .then(() => console.log("Conexión a Mongo exitosa"))
    }catch(error){
        console.error('Error en la conexion a Mongo: ', error)
        process.exit(1)
    }
}

module.exports = conectBD