const pool = require('./db/db');
const deleteFile = require('./utils/deleteFile');

//clients

const getAllClients = (request, response) => {
    try {
        pool.query(`
    SELECT clients.*, max(visits.date) as last_visit
        FROM clients left join visits on clients.id = visits.client_id
		GROUP BY clients.id order by clients.fio ASC
    `,
            (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).json(results.rows)
            })
    } catch(error) {
        console.log(error)
    }
};

const getClientById = (request, response) => {
    const id = parseInt(request.params.id);

    try {
        pool.query(`
        SELECT clients.*, max(visits.date) as last_visit
        FROM clients left join visits on clients.id = visits.client_id
        WHERE clients.id = $1
		GROUP BY clients.id order by clients.fio ASC
        `, [id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })

    } catch(error) {
        console.log(error)
    }

};

const createClient = (request, response) => {
    const { fio, mobile, agreement, dateBirth  } = request.body;

    try{
        pool.query('INSERT INTO clients (fio, mobile, agreement, date_birth) VALUES ($1, $2, $3, $4) RETURNING *',
            [fio, mobile, agreement, dateBirth], (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).send({status:` Клиент успешно добавлен, ID: ${results.rows[0].id}`, id: results.rows[0].id, client: results.rows[0] })
            })

    } catch(error) {
        console.log(error)
    }

};

const updateClient = (request, response) => {
    const id = parseInt(request.params.id);
    const { fio, mobile, agreement, dateBirth } = request.body;

    try {
        pool.query(
            'UPDATE clients SET fio = $1, mobile = $2, agreement = $3, date_birth = $4 WHERE id = $5',
            [fio, mobile, agreement, dateBirth, id],
            (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).send({status:`Данные о клиенте успешно изменены: ${id}`, id: results.rows[0], client: results.rows[0]})
            }
        )

    } catch(error) {
        console.log(error)
    }
};

const deleteClient = (request, response) => {
    const id = parseInt(request.params.id);
    const { agreement } = request.body;

    try {
        pool.query('DELETE FROM clients WHERE id = $1', [id], (error, results) => {
            if (error || !deleteFile(agreement)) {
                throw error
            }
            response.status(200).send(`Клиент удалён: ${id}`)
        })

    } catch(error) {
        console.log(error)
    }
};


const getInfoAboutBirth = (request, response) => {
    const {dateBirth} = request.body;
    const queryString = `
    SELECT * FROM clients WHERE EXTRACT(DAY from date_birth) = EXTRACT(DAY from TIMESTAMP with time zone '${dateBirth}')
    and EXTRACT(MONTH from date_birth) = EXTRACT(MONTH from TIMESTAMP with time zone '${dateBirth}')
    `

    try {
        pool.query(queryString, (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    } catch(error) {
        console.log(error)
    }
};

//visits

const getAllVisits = (request, response) => {
    const clientId = parseInt(request.params.id);

    try {
        pool.query('SELECT * FROM visits where client_id = $1 ORDER BY date DESC', [clientId],
            (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).json(results.rows)
            })
    } catch(error) {
        console.log(error)
    }

};

const getVisitById = (request, response) => {
    const visitId = parseInt(request.params.id);

    try {
        pool.query('SELECT * FROM visits where id = $1 ORDER BY date DESC', [visitId],
            (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).json(results.rows)
            })
    } catch(error) {
        console.log(error)
    }
}

const updateVisit = (request, response) => {
    const id = parseInt(request.params.id);
    const { date, duration, price, comment, photo } = request.body;

    try {
        pool.query(
            'UPDATE visits SET date = $1, duration = $2, price = $3, comment = $4, photo = $5 WHERE id = $6',
            [date, duration, price, comment, photo, id],
            (error, results) => {
                if (error) {
                    response.status(500).send({message:`Ошибка изменения. ${error}`, status: false})
                }
                response.status(200).send({message:`Данные о посещении успешно изменены: ${id}`, status: true})
            }
        )

    } catch(error) {
        console.log(error)
    }
};

const deleteVisit = (request, response) => {
    const id = parseInt(request.params.id);
    const { photo } = request.body;

    try {
        pool.query('DELETE FROM visits WHERE id = $1', [id], (error, results) => {
            if (error || !deleteFile(photo)) {
                throw error
            }
            response.status(200).send(`Посещение удалено: ${id}`)
        })
    } catch(error) {
        console.log(error)
    }

};

const addVisit = (request, response) => {
    const { date, duration, price, comment, photo, client_id} = request.body;

    try {
        pool.query('INSERT INTO visits (date, duration, price, comment, photo, client_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [ date, duration, price, comment, photo, client_id], (error, results) => {
                if (error) {
                    response.status(500).send({message:`Ошибка добавления. ${error}`, status: false})
                }
                response.status(201).send({message: ` Посещение  успешно добавлено, ID: ${results?.rows[0].id}`, id: results?.rows[0].id, status: true} )
            })

    } catch (error) {
        console.log(error)
    }
};

module.exports = {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient,
    getInfoAboutBirth,
    getAllVisits,
    getVisitById,
    updateVisit,
    deleteVisit,
    addVisit
};

