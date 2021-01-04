var conn = require("./db");

module.exports ={


  dashboard(){
 
    return new Promise((resolve, reject)=>{

     conn.query(`
     
     SELECT
    (SELECT COUNT(*) FROM tb_contacts) AS nrcontacts,
    (SELECT COUNT(*) FROM tb_menus) AS nrmenus,
    (SELECT COUNT(*) FROM tb_reservations) AS nrreservations,
    (SELECT COUNT(*) FROM tb_users) AS nrusers;
    
    `,(err, results) => {

      if(err) {

       reject(err);

      } else {

        resolve(results[0]);
      }


    });

  });

},

getParams(req, params){

return Object.assign({}, {

  menus: req.menus,
  user: req.session.user

}, params);

},

getMenus(req){

    menus = [
        {

            text: "Tela inicial",
            href:"/admin/",
            incon:"home",
            active: false
        },

        {

          text: "Menus",
          href:"/admin/menus",
          incon:"cutlery",
          active: false
       },

        {

         text: "Reservas",
         href:"/admin/reservations",
         incon:"calender-check-o",
         active: false

       },

       {

        text: "Contatos",
        href:"/admin/contacts",
        incon:"comments",
        active: false

      },

      {

        text: "Usuários",
        href:"/admin/users",
        incon:"calender-check-o",
        active: false

      },

      {

        text: "E-mails",
        href:"/admin/emails",
        incon:"envelope",
        active: false

      }

         ]


         menus.map( menu =>{

          if(menu.href === `/admin ${req.url}` ) menu.active = true

          console.log(req.url, menu.href)

         });

         return menus;
    }

}