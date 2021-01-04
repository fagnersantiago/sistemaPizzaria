var conn = require('./../inc/db');
var express = require('express');
var menus = require('./../inc/menus');
var reservations = require('./../inc/reservation');
var contacts = require('./../inc/contacts');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  menus.getMenus().then(results => {
 
    res.render('index', { 
    
      title: 'Restaurante Saboroso!',
      menus: results,
      isHome: true
      
       });
     
    });
    
});

router.get('/contact', function (req, res, next){


 
  contacts.render(req, res);

});

router.post('/contact', function (req, res, next){

  console.log(req.body)

if(!req.body.name){

  contacts.render(req, res, 'Digite o nome!');

} else if(!req.body.email){

  contacts.render(req, res, 'Digite seu email');

} else if (!req.body.message){

   contacts.render(req, res, 'Digite uma mensagem!');

} else {

  console.log(req.body)
  contacts.save(req.body).then(results =>{

    req.body = {};

    contacts.render(req, res, null, 'contato enviado com sucesso!');
  
  }).catch(err =>{

    contacts.render(req, res, err.message);

    });

  }

});

router.get('/menu', function(req, res, next){

  menus.getMenus().then(results =>{


    res.render('menu',{

      title: 'Menu - Restaurante Saboroso',
      background:'images/img_bg_1.jpg',
      h1: 'Saboreie nosso menu!',
      menus: results,
  
    });

  });
 

});

router.get('/reservation', function(req, res, next){

  reservations.render(req, res);

});

router.post('/reservation', function(req, res, next){

  if(!req.body.name){
    
  reservations.render(req, res, "Digite o nome!");

  } else if(!req.body.email){

    reservations.render(req, res, "Digite o Email!");

  }  else if(!req.body.people){

    reservations.render(req, res, "Por favor, digite o números de pessoas!");

  }  else if(req.body.data){

    reservations.render(req, res, "Por favor, selecione a data!");

  } else if(!req.body.time){

    reservations.render(req, res, "Por favor, selecione a hora");
    

  } else{

    reservations.save(req.body).then(results => {

    req.body = { };

    reservations.render(req, res, null, "Reserva realizada com sucesso!");

    }).catch(err=>{

       reservations.render(req, res, err.message);

    });

  }

});


router.get('/services', function(req, res, next){

  res.render('services',{

    title: 'Serviços - Restaurante Saboroso',
    background:'images/img_bg_1.jpg',
    h1: 'É um prazer poder lhe servir!'

  });

});

module.exports = router;