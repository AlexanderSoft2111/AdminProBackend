const jwt = require('jsonwebtoken');

const generarToken = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid
        }

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h',
        }, (err, token) => {

            if(err){
                console.log(err)
                reject('Error inesperado en el token');
            }

            resolve(token);

        })

    });

}

module.exports = {
    generarToken
}