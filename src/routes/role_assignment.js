const express = require('express');
const router = express.Router()
const db = require('../utils/db');

// const hostname = '127.0.0.1';
// const port = 3061;

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })


/* Definição dos endpoints */

/****** CRUD ******************************************************************/

// Retorna todos registros (é o R do CRUD - Read)
router.get('/rassignment', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  	var sql = 'SELECT * FROM RoleAssignment ORDER BY id COLLATE NOCASE';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	// db.close(); // Fecha o banco
});

// urlencodedParser

// Insere um registro (é o C do CRUD - Create)
router.post('/rassignmentinsert', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	res.send(req.body)

	sql = "INSERT INTO RoleAssignment (project_id, role_id, hours_assigned) VALUES ('" + req.body.project_id + "', '" + req.body.role_id + "', '" + req.body.hours_assigned + "')";                       																																																																																

	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	// db.close(); // Fecha o banco
	res.end();
});

// Atualiza um registro (é o U do CRUD - Update)
router.post('/rassignmentupdate', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "UPDATE RoleAssignment SET project_id = '" + req.body.project_id + "', role_id = '" + req.body.role_id + "',  hours_assigned = '" + req.body.hours_assigned + "' WHERE id = " + req.body.id;
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	// db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
router.delete('/rassignmentdelete', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "DELETE FROM RoleAssignment WHERE id = " + req.body.id;
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
        else console.log(sql);
		res.end();
	});
	// db.close(); // Fecha o banco
});

module.exports = router;