const {model, Schema} = require('mongoose');

const RegisterDeposits = new Schema({
    id_user_send: {
        type: String,
        require: true
    },
    id_user_resived: {
        type: String,
        require: true
    },
    email_send: {
        type: String,
        unique: false,
        require: true
    },
    email_resived: {
        type: String,
        unique: false,
        require: true
    },
    email_send: {
        type:String,
        unique: false,
        require: true
    },
    moneyDeposit: {
        type: Number,
        unique: false,
        require: true
    },
}); 

module.exports = model("RegisterDeposit", RegisterDeposits);

