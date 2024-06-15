const express = require('express')
const { getConnection } = require('./db/Connection');


require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());



const port = 3000;

getConnection();


app.use('/estadoEquipo', require('./router/estadoEquipo'));
app.use('/inventario', require('./router/inventario'));
app.use('/marca', require('./router/marca')) 
app.use('/tipoEquipo', require('./router/tipoEquipo')) 
app.use('/usuario', require('./router/usuario')) 



app.listen(port, () => {
  console.log(`conectado al puerto ${port}`);
})

