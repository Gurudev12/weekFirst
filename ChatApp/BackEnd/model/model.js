
const mongoose = require('mongoose');
const bcrypt=require('bcrypt')
const nodemail=require('../middleware/sendMail')

let RegisterSchema = mongoose.Schema({
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    },
    {
    timestamps: true
    });
    
//creating function to encrypt password
 function passwordEncrypt(password)
{
    let saltRounds=10
    let salt=bcrypt.genSaltSync(saltRounds)
    let encrptedPass=bcrypt.hashSync(password,salt)
    return encrptedPass
}
//creating collection(registrationDetail)
let model= mongoose.model('registrationDetail',RegisterSchema);

exports.registrationModel=(userDetail,callback)=>{

    model.find({'email':userDetail.email},model.email,(err,data)=>{
   
        if(err)
        {
           console.log("Error occured while registration")
        }
        else if(data.length>0)
        {
            console.log("Already exist")
           return callback("Sorry..Already register")
        }
        //if registration is not done before then register to database
        else{
            let newUser=new model({
            firstname:userDetail.firstname,
            lastname:userDetail.lastname,
            email:userDetail.email,
            password:passwordEncrypt(userDetail.password),
            })
            
            //register new entry
            newUser.save((err,data)=>{
            if(err)
            {  
                callback(err)
            }
            else
            {
            console.log("Register Sucessfully")
            callback(null,data)
            }
        })
    }
})
}
/*login model***************************************************/

exports.loginModel=(loginDetail,callback)=>{
    console.log("model login")

    model.find({'email':loginDetail.email},(err,data)=>{ //data contain hole user information
        console.log(data)
        if(err) {
            console.log("error generated while login")
        } 
        else if(data.length>0)
        {
            for(let i=0;i<data.length;i++){
            bcrypt.compare(loginDetail.password,data[0].password,(err,res)=>{ //res contain true or false
                if(err)
                {
                    console.log(err)
                }
                else if(res===true)
                {
                   callback("password matches")
                }
                else if(res===false)
                {
                callback("password not matched")

                }
            })
            }
        } 
        else{
            callback("email not matched")
        }
      })
}


/*************************************************************** */
exports.forgotPasswordModel=(forgotPasswordEmail,callback)=>{

    model.find({'email':forgotPasswordEmail},(err,data)=>{
        if(err){
            callback(err)
        }
        else if(data.length>0){

            nodemail.sendMail(forgotPasswordEmail,(err,rsp)=>{
                if(err)
                {
                    callback(err)
                }
                else
                {
                    callback(rsp)
                }
            })

        }
        else{
            callback("Sorry..these email is invalid")
        }

    })
    
}














// var nodemailer=require('nodemailer')

// var transport=nodemailer.createTransport({
//     service:'gmail',
//     auth:{
//         user:'',
//         pass:'',
//     }
// });

// var mailOption={
//     from:'dd@gmail.com',
//     to:'@gmail.com',
//     subject:'sending mail using node js',
//     text:'hello'
// }
// transporter.sendMail(mailOption,function(err,info){
//     if(err)
//     {
//         console.log(err)
//     }
//     else{
//         console.log("Email sent:"+info.responce);
//     }
// })
