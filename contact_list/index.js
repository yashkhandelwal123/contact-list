const db = require('./config/mongoose');
const contact = require('./models/contacts');
const express = require('express');
const path = require('path');
const port = 8000;
const app = express();

app.set('view engine','ejs');
//to join main directry with views
app.set('views', path.join(__dirname, 'views'));
//to encoded the data from browser
app.use(express.urlencoded())

app.use(express.static('assets'))


var contactlist = [
    {
        name:"yash",
        phone: "3132121231" 
    },
    {
        name:"yash1",
        phone: "31321215243" 
    },
    {
        name:"yash2",
        phone: "313212165847" 
    },
]

app.get('/',function(req,res){
    // console.log(__dirname);
    // res.send('<h1>Coool, it is running</h1>');
//     contact.find({}, function(err , contacts){
//         if(err){
//             console.log('erro occured!');
//             return;
//         }
//     });
//   return res.render('home',{
//         title : "My Contact List" ,
//         contact_list: contacts
//     });
contact.find({}, function(err, contacts){
    if(err){
        console.log("error in fetching contacts from db");
        return;
    }
    return res.render('home',{
        title: "Contact List",
        contact_list: contacts
    });

})
});

app.post('/create_contact', function(req,res){
    console.log(req.body);
    // return re
    // contactlist.push({
    //     name : req.body.name,
    //     phone: req.body.Phone
    // });

    contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err, newcontact){
        if(err){
            console.log('error occured!');
            return;
        }
        console.log('***' , newcontact);
        return res.redirect('back');
    });

    // return res.redirect('/');
});



app.get('/delete_contact/', function(req,res){
    console.log(req.query);
    let p = req.query.id;
    // let contactindex = contactlist.findIndex( contact => contact.phone==p);

    // if(contactindex!=-1){
    //     contactlist.splice(contactindex ,1);
    // }
    contact.findByIdAndDelete(p , function(err){
        if(err){
            console.log('err occured in deleting');
            return;
        }

        return res.redirect('back');
    })

    
});


        
app.listen(port, function(err){
    if(err){
        console.log('opps! error occur in running server',err);
    }

    console.log('Yup,My server runs well on port',port);
});

