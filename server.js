'use strict'

const express = require( 'express' );
const multer = require( 'multer' );
const fs = require( 'fs' );
const junk = require( 'junk' );
const uuidv4 = require('uuid/v4'); //unique id library to keep track of different session
const bodyParser = require('body-parser');

let app = express();

app.use( express.static('./') );
app.use( bodyParser.json() ); //middleware to parse json POST
app.use(bodyParser.urlencoded({extended: true}));

// define file name and destination to save
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname +  '/images')
  },
  filename: (req, file, cb) => {
    let ext = file.originalname.split( '.' );
    ext = ext[ext.length - 1];
    cb(null, 'uploads-' + Date.now() + '.' + ext);
  }
});


// define what file type to accept
let filter = ( req, file, cb ) => {
  if ( file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' ) {
    cb( null, true );
  } else {
    cb( 'Failed: format not supported' );
  }
}


// set multer config
let upload = multer( {
  storage: storage,
  fileFilter: filter
}).single( 'upload' );


/* ===============================
  Session
 ============================== */

//save a session snapshot into dir
let saveSession = (sessionid, sessionkey, session_elements) => {
  let ext = "sess"
  let destination = __dirname +  '/sessions';
  let filename = sessionid + '.' + ext;

  //if directory does not exist create the directory
  if (!fs.existsSync(destination)) {
    fs.mkdirSync('sessions');
  }

  //write file
  fs.writeFile(destination + "/"  + filename, JSON.stringify({sessionid: sessionid, key: sessionkey, elements: session_elements}),
   err => {
    if (err){
      throw err;
    }
  });

}

let retrieveSession = (sessionid, key, req, res, cb) => {
  let ext = "sess"
  let destination = __dirname +  '/sessions';
  let filename = sessionid + '.' + ext;
  
  //read file
  fs.readFile(destination + "/"  + filename, (err, data) => {
    if (err) {
      res.status(400).end();
      return;
    }
    
    let snapshot_obj = JSON.parse(data);
    if (snapshot_obj.key !== key) return;
    
    cb(req, res, snapshot_obj);
  });
}


let sendJson = (req, res, data) => {
  res.send(data);
  res.end();
}
/* ===============================
  ROUTE
 ============================== */

// route for file upload
app.post( '/uploads', ( req, res ) => {
  upload( req, res, err => {

    console.log(req.file);
    if ( err ) {
      console.log( err )
      res.status(400).json( {message: err} );
    } else {
      res.status(200).json( {
        file: req.protocol + '://' + req.get('host') + '/images/' + req.file.filename
      } )
    }
  })
})



app.post('/savesession', (req,res) =>{
  let sessionid = req.body.sessionid;
  let session_elements = req.body.data;
  let sessionkey = req.body.key;

  try{
    saveSession(sessionid, sessionkey, session_elements);
  } catch (err){
    res.status(400).end(err);
  }
  res.status(200).end(sessionid);
})


app.post('/retrievesession', (req,res) =>{
  let sessionid = req.body.sessionid;
  let sessionkey = req.body.key;

  retrieveSession(sessionid, sessionkey, req, res, sendJson);
})

app.get( '/images', ( req, res ) => {
  let file_path = req.protocol + '://' + req.get('host') + '/images/';
  let files = fs.readdirSync( './images/' );
  files = files
          .filter( junk.not ) // remove .DS_STORE etc
          .map( f => file_path + f ); // map with url path
  res.json( files );
});

// general route
app.get( '/', ( req, res ) => {
  res.sendFile( __dirname + '/index.html' );
})


app.get('/getnewsession', (req, res) => {
  let sessionid = uuidv4();
  res.json(sessionid)
})


var server = app.listen( 8000, _ => {
  console.log( 'server started. listening to 8000' );
})
