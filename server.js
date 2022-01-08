const express = require('express')
const { path } = require('path')
const connectDB = require('./config/db')



const app = express()

connectDB()
app.use(express.json({extented : false})) 


// Define routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get("*", (req,res) => res.sendFile(path.resolve(__dirname,'client','build','index.html')));
}

const PORT = process.env.port || 5000
app.listen(PORT,() => console.log(`Server startes on ${PORT}`))



