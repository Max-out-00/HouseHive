import express from 'express'
import encrpt from '../controllers/encrpt.js'

// const app = express();
// const port = 5000;

// app.use(express.json())

// app.get('/' , (req , res) => {
//     res.send("Hello");
// })

// app.post('/register' , async(req , res)=>{
//     const data = req.body;
    
//     const name = data.name;
//     const email = data.email;
//     const phone = data.phone;
//     const password = data.password;

//     if(!name || !email || !phone || !password){
//         return res.send("Error not all field filled");
//     }
//     const hashedPassword = await encrpt(password);

//     res.send({ name, email, phone, hashedPassword });
// })

// app.listen(port , ()=>{
//     console.log(`server runs on ${port}`)
// })

