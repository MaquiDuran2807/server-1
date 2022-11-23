const driversController = require('../controller/driversController');

module.exports =(app) =>{
    app.post('/realtime',driversController.register);

}