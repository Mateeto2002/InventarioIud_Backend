const mongoose = require('mongoose');

const getConnection = async () => {

    try {
        const url = 'mongodb+srv://mateoperez:Mateito2002@asesoria-db.aha2fnz.mongodb.net/?retryWrites=true&w=majority&appName=asesoria-db'
        await mongoose.connect(url)

        console.log('Conexion exitosa');

    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    getConnection,
}