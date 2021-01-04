
var conn = require("./db");

module.exports = {

render(req, res, error, success){

    res.render('reservation', {

        title: 'Reserva - Restaurante Saboroso',
        background:'images/img_bg_2.jpg',
        h1: 'Reserve um mesa!',
        body: req.body, 
        error,
        success
      
      });
    
    },


    save(fields){

      return new Promise((resolve, reject) => {

        if(fields.date.indexOf('/')> -1){

        let date = fields.date.split('/');
        
        let query, params = [
          
          fields.name,
          fields.email,
          fields.people,
          fields.date,
          fields.time

        ];

        fields.date = `${date[2]}-${date[1]}-${date[0]}`;

      }


        if(parseInt(fields.id)){

            query =`
            
            UPDATE tb_reservation

            SET 
                name = ?,
                email = ?,
                people = ?,
                date = ?,
                time =?

                WHERE id = ?
            
            `;

            params.push(fields.id);

        } else {

            query = `
            
            
        INSERT INTO tb_reservations(name, email, people, date, time)
        VALUES(?, ?, ?, ?, ?)
        `    

        }

        conn.query(query, params, (err, results)=>{


            if(err){

                reject(err);

            } else {

                resolve (results);
            }


        });


      });

       

    },

    getReservations(){


      return new Promise((resolve, reject)=>{

       conn.query(`
          SELECT * FROM tb_reservation ORDER BY date DESC `,

          (err, results)=>{

              if(err){

                  reject(err);
              }

              resolve(results);

              });

      });

      
  },

  delete(id){

    return new Promise((resolve, reject)=>{
    
    conn.query `
    
    DELETE * FROM tb_reservations WHERE id = ?
    
    `,[


    ], (err , results =>{

        if(err){

            reject(err)
        } else {

            resolve(results)
        }

      });

    });
    
  }


}