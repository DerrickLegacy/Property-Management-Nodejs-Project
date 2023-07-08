// Including required libraries
var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var mysql = require('mysql');
var _ = require('lodash');
var bodyParser = require('body-parser');
const encoder = bodyParser.urlencoded();
var express_session = require('express-session');
const path = require('path');
const multer = require('multer');


// Express app 
var app = express();
const upload = multer({ dest: 'public/img/' }); // Update the destination path for storing the uploaded image

// Register view engine
app.set('view engine', 'ejs');

//Body parser middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Registering middleware and static files
app.use(express.static(__dirname + '/public'));

//Creating a Database Connection
const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'propertymanagementdb'
});

// Create MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost', 
    user: 'root',
    password: '',
    database: 'propertymanagementdb'
  });

    //connecting to database
conn.connect((err)=> {
    if (err) throw err
    console.log('Database connected successfully!')
})
// Validating login via POST request
const globalUsername = {};
app.post('/',encoder, (req,res) => {
    //fetching form input data
    var username = req.body.username;
    globalUsername.username = req.body.username;
    var password = req.body.password;
  var query = 'SELECT * FROM customer WHERE email = ? AND PASSWORD = ?'
    conn.query(query, [username, password], (error, results) => {
        if (results.length > 0) {
          if (results[0].email.includes('@admin.com')) {
            res.redirect('/admin');
          } else {
            res.redirect('/homepage'); 
          }
        } else {
          res.redirect('/login');
        }
        res.end();
    });
});
      
// Collect form data on the server
const formData = {}; // Object to store form registration data

app.post('/register/One', (req, res) => {
    formData.username = req.body.username; // Collect form username data
    if(formData.username.includes('@admin')){
        res.redirect('/register1');
        console.log('Enter Valid email Without @admin')
    }else{
        res.redirect('/register2');

    }
});

app.post('/register/Two', (req, res) => {
    formData.password = req.body.password; // Collect form password data
    formData.confirm_password = req.body.confirm_password
    if (formData.password != formData.confirm_password){
        res.redirect('/register2');
    }else{
    res.redirect('/register3');
    }
});

app.post('/register/Three', (req, res) => {
    formData.FirstName = req.body.FirstName; // Collect form FirstName data
    formData.LastName = req.body.LastName; // Collect form LastName data
    res.redirect('/register4');
});

// Insert the collected form data into the database
app.post('/register/Four', (req, res) => {
    formData.gender = req.body.gender; // Collect gender data
    formData.dateOfBirth = req.body.dateOfBirth;

    const sql = 'INSERT INTO customer (firstName, secondName, email, dateOfBirth, PASSWORD, gender) VALUES (?, ?, ?, ?, ?, ?)';

    const values = [formData.FirstName, formData.LastName, formData.username, formData.dateOfBirth, formData.password, formData.gender];
  
    conn.query(sql, values, (err, result) => {
        if (err) throw err;
        console.log('Form data inserted into MySQL!');
        res.redirect('/login');
    });
   
    // Clear the formData object for future submissions
    for (const key in formData) {
        delete formData[key];
    }
});

// ------------------------POSTING A PROPERTY--------------------------------
const   postProperty = {}; // Object to store form posted property data
// inserting collected property
app.post('/postProperty', upload.single('image'), (req, res) => {
  const file = req.file || req.files['image'];


  if (!file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  // Retrieve the form data
  const postProperty = {
    propertyName: req.body.propertyName,
    type: req.body.type,
    address: req.body.address,
    numberOfBedroom: req.body.numberOfBedroom,
    numberOfRooms: req.body.numberOfRooms,
    image: file.filename, // Store the filename in the database
    postDate: req.body.postDate,
    cost: req.body.cost,
    city: req.body.city,
    costBefore: req.body.costBefore,
    state: req.body.state,
    zipCode: req.body.zipCode
  };

  const sql = 'INSERT INTO propertytable(propertyName, type, address, numberOfBeds, numberOfRooms, image, postDate, city, state, zip, cost, likes, approved, email, costBefore) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
  const values = [
    postProperty.propertyName,
    postProperty.type,
    postProperty.address,
    postProperty.numberOfBedroom,
    postProperty.numberOfRooms,
    postProperty.image,
    postProperty.postDate,
    postProperty.city,
    postProperty.state,
    postProperty.zipCode,
    postProperty.cost,
    "",
    "",
    globalUsername.username,
    postProperty.costBefore
  ];

  conn.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting form data into the database:', err);
      res.status(500).send('Internal server error. Database seems to have exprienced issues');
    } else {
      console.log('Form data inserted into MySQL!');
      res.redirect('postProperty');
    }
  });

  // Clear the form data for future submissions
  for (const key in postProperty) {
    delete postProperty[key];
  }
});

// Handle delete requests
app.get('/delete/:propertyId', function(req, res, next) {
    var id = req.params.propertyId;
    var insertQuery = `INSERT INTO deleted_property SELECT * FROM propertytable WHERE propertyId = "${id}"`;
     var delQuery = `DELETE FROM propertyTable WHERE propertyId = "${id}"`;
  
    conn.query(insertQuery, (err, data) => {
      if (err) throw err;
      console.log('Data copied');
      
      conn.query(delQuery, (err, data) => {
        if (err) throw err;
        res.redirect('/postProperty');
      });
    });
  });
   
// listen for requests
app.listen(3600,(err)=> {
    if(err) throw err
    console.log("Server running on port 3600")
});

app.get('/login', (req, res) => {
  res.render('login')
});

app.get('/edit/:id', (req, res)=>{
    const id = req.params.id    
    const edQuery = `SELECT * FROM propertyTable where propertyId = "${id}" `;
    conn.query(edQuery, (err, data) => {
        if(err){
            throw err
        }else{
            const result = data[0];
            res.render('edit',{result})
        }     
    })
});
app.post('/edit/submit/:propertyId', (req, res) => {
    const id = req.params.propertyId;
    postProperty.propertyName = req.body.propertyName;
    postProperty.type = req.body.type;
    postProperty.address = req.body.address;
    postProperty.numberOfBedroom = req.body.numberOfBedroom;
    postProperty.numberOfRooms = req.body.numberOfRooms;
    postProperty.image = req.body.image;
    postProperty.postDate = req.body.postDate;
    postProperty.cost = req.body.cost;
    postProperty.costBefore = req.body.costBefore;
    postProperty.city = req.body.city;
    postProperty.state = req.body.state;
    postProperty.zipCode = req.body.zipCode;
    formData.username = req.body.username;
  
    const edQuery = `
        UPDATE propertyTable 
        SET propertyName = "${postProperty.propertyName}",
        type = "${postProperty.type}", 
        address = "${postProperty.address}",
        numberOfBeds = "${postProperty.numberOfBedroom}", 
        numberOfRooms = "${postProperty.numberOfRooms}", 
        image = "${postProperty.image}", 
        postDate = "${postProperty.postDate}", 
        city = "${postProperty.city}", 
        state ="${postProperty.state}" , 
        zip = "${postProperty.zipCode}", 
        cost = "${postProperty.cost}" ,
        costBefore = "${postProperty.costBefore}" 
        WHERE propertyId = "${id}" AND email = "${globalUsername.username}"`;  
    conn.query(edQuery,(err, data) => {
      if (err) {
        throw err;
      } else {
        res.redirect('/postProperty');
        console.log('Table updated');
      }
    });
  });
  

  app.get('/homepage', (req, res) => {
    var pending = 'SELECT * FROM propertyTable JOIN customer ON propertyTable.email = customer.email WHERE DATEDIFF(CURDATE(),propertyTable.postDate) > 5 AND `approved` = 1';
    conn.query(pending, (err, data) => {
      if (err) {
        throw err;
      } else {
        const results = data;
  
        const sqlQuery = `
          SELECT *
          FROM propertyTable JOIN customer ON propertyTable.email = customer.email
          WHERE DATEDIFF(CURDATE(), propertyTable.postDate) < 5 AND propertyTable.approved = 1;
        `;
  
        conn.query(sqlQuery, (err, data) => {
          if (err) throw err;
          const recent = data;
          res.render('homepage', { results, recent });
        });
      }
    });
  });
  

app.get('/register1', (req, res)=>{
    res.render('register1');
});
app.get('/register2', (req, res)=>{
    res.render('register2');
});
app.get('/register3', (req, res)=>{
    res.render('register3');
});
app.get('/about', (req, res)=>{
    res.render('about');
});
app.get('/contact', (req, res)=>{
    res.render('contact');
});

app.get('/register4', (req, res)=>{
    res.render('register4');
});
app.get('/landlord', (req, res)=>{
    var membership = `SELECT email, propertyName,postDate FROM propertyTable WHERE email= "${globalUsername.username}" ORDER BY postDate ASC`
    conn.query(membership,(err, data) => {
        if (err){
            throw err;
        }
        if(data.length == 0){
            const message = 'Post A Property to Become A Landlord';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(178, 153, 153, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        
        .message {
          background-color: #ffffff;
          padding: 10px;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="overlay">
        <div class="message">
          <p>${message}</p>
          <p align="center">     
            <a href="/postProperty">
              <button >Go To Post</button>
            </a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  res.send(html);
        }else{
          var results = data[0]
          var message = ' Active'
          res.render('landlord',{message,results})
        }

    })
});
app.get('/postProperty', (req, res)=>{
    var pending = 'SELECT * FROM propertyTable WHERE `email`= ? AND `approved` = ?';
    conn.query(pending, [globalUsername.username, 0], (err, data) => {
        if (err){
            throw err;
        }else{
            const results = data;
            username = globalUsername.username
            var squery = `
            SELECT * FROM lease_property JOIN customer ON lease_property.email = customer.email
            WHERE propertyId IN (
              SELECT propertyId FROM propertytable WHERE email = "${globalUsername.username}" 
            )
            `
            conn.query(squery, (err, data) => {
              if (err){
                throw err
              }else{
                var result1 = data;
                res.render('postProperty', {results,result1,username});
                // console.log(results)
                console.log( result1)
              }
          })
        }
    }) 
});


app.get('/details/:propertyId', (req, res)=>{
  var id = req.params.propertyId; 
  var squery = 'SELECT * FROM propertyTable JOIN customer ON propertyTable.email = customer.email WHERE propertyTable.propertyId = ? AND approved = 1 ORDER BY propertyTable.email ASC';
  conn.query(squery,[id], (err, data) => {
    if (err) {
      throw err
    }else{
      const property = data[0]
      res.render('details',{property} )
      console.log(property.propertyId)
    }

  })
});

app.get('/admin', (req, res)=>{
    var pending = 'SELECT * FROM propertyTable JOIN customer ON propertyTable.email = customer.email WHERE  `approved` = 0 ORDER BY propertyTable.email ASC';
    conn.query(pending, (err, data) => {
      if (err){
        throw err;
    }else{
        const results = data;
        res.render('admin', {results});
       

    }
    })
});
app.get('/admin/approve/:propertyId/:email',(req, res) => {
    const id = req.params.propertyId;
    const email = req.params.email;

    var approve = 'UPDATE propertyTable SET approved = 1 WHERE email = ? AND propertyId = ? AND approved = 0';
    conn.query(approve, [email, id], (err, data) => {
        if (err) throw err
        console.log('Property has been Approved')
        res.redirect('/admin')
    })
})
app.get('/admin/deleted/:propertyId',(req, res) => {
    const id = req.params.propertyId
    var delQuery = `DELETE FROM deleted_property WHERE propertyId = "${id}"`;
  
    conn.query(delQuery, (err, data) => {
        if (err) throw err;
        res.redirect('/deleted');
  });

})
app.get('/editedproperty', (req, res)=>{
    res.render('editedproperty');
});
// app.get('/propertyDetails', (req, res)=>{
//   res.render('propertyDetails');
// });
app.get('/deleted', (req, res)=>{
    var pending = 'SELECT * FROM deleted_property JOIN customer ON deleted_property.email = customer.email ORDER BY deleted_property.email ASC';
    conn.query(pending, (err, data) => {
        if (err){
            throw err;
        }else{
            const results = data;
            res.render('deleted', {results});
            console.log(results)

        }
    })
});

app.get('/recentPost', (req, res) => {
    const sqlQuery = `
      SELECT *
      FROM propertyTable JOIN customer ON propertyTable.email = customer.email
      WHERE DATEDIFF(CURDATE(), propertyTable.postDate) < 5 AND propertyTable.approved = 1 AND propertyTable.email = ?;
    `;
  
    conn.query(sqlQuery, [globalUsername.username], (err, data) => {
      if (err) throw err;
        const results = data;
        username = globalUsername.username;
        console.log(results)
      res.render('recentPost', { results, username });
    });
  });
  app.get('/recent/delete/:propertyId', function(req, res, next){
    var id = req.params.propertyId;

    var insertQuery = `INSERT INTO deleted_property SELECT * FROM propertytable WHERE propertyId = "${id}"`;
    var delQuery = `DELETE FROM propertyTable WHERE propertyId = "${id}"`;
  
    conn.query(insertQuery, (err, data) => {
      if (err) throw err;
      console.log('Data copied');
      
      conn.query(delQuery, (err, data) => {
        if (err) throw err;
        res.redirect('/postProperty');
      });
    });
});



app.get('/lease/:propertyId', (req, res) => {
  const id = req.params.propertyId;
  const squery1 = `SELECT propertyId, email FROM lease_property WHERE propertyId = ? AND email = ?`;
  const squery = 'INSERT INTO lease_property (propertyId, email) SELECT propertytable.propertyID, customer.email FROM propertyTable JOIN customer ON propertyTable.email = customer.email WHERE propertyTable.propertyId = ? AND approved = 1 ORDER BY propertyTable.email ASC';

  conn.query(squery1, [id, globalUsername.username], (err, data) => {
    if (err) {
      throw err;
    } else {
      if (data.length > 0) {
        res.redirect('/homepage');
        res.end();
      } else {
        conn.query(squery, [id], (err, data) => {
          if (err) {
            throw err;
          } else {
            res.redirect('/details');
            res.end();
          }
        });
      }
    }
  });
});

app.get('/tenant', (req, res)=>{
  var membership = `SELECT * FROM lease_property WHERE email= "${globalUsername.username}" `
  conn.query(membership,(err, data) => {
      if (err){
        throw err;
      }
      if(data.length == 0){
          const message = 'Lease A Property to Become A Tenant';

        const html = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              .overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(178, 153, 153, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
              }
              
              .message {
                background-color: #ffffff;
                padding: 10px;
                border-radius: 5px;
              }
            </style>
          </head>
          <body>
            <div class="overlay">
              <div class="message">
                <p>${message}</p>
                <p align="center">     
                  <a href="/homepage">
                    <button class="btn btn-primary">Lease Now</button>
                  </a>
                </p>
              </div>
            </div>
          </body>
          </html>
        `;

        res.send(html);
      }else{
        var squery = `SELECT * FROM propertyTable JOIN lease_property ON propertyTable.email = lease_property.email WHERE lease_property.email = "${globalUsername.username}" AND propertytable.propertyId = lease_property.propertyId  AND propertytable.approved = 1 ORDER BY propertyTable.email ASC`;
        conn.query(squery, (err, result) => {
        if (err) {
          throw err
        }else{
          var results = result;
          var message = ' Active'
          console.log(results);
          res.render('tenant',{message,results})
        }
      })
    } 
  })
});

//Redirect page
app.use('/', (req, res)=>{
    res.status(404).render('404');
});
module.exports = router;
