const User = require('../models/user');
const RegisterDeposit = require('../models/register-deposit');
const user = require('../models/user');

// this function is created to realized deposit other users
async function depositUser(req, res) {
    const {email, name, lastname, moneyDeposit} = req.body;
    const idUserDeposit = req.params.id; // id of the user whe deposit
    
    User.findOne({id: idUserDeposit}, async (err, userDeposit) => {    
        try {
            // confirm if moneyDeposit is greater than userDeposit.money
            if (moneyDeposit > userDeposit.money) {
                res.json({message: "the transaction exceeds your money"});
                return;
            }

            // subtract the money deposited
            userDeposit.money = userDeposit.money - moneyDeposit;

            User.findOne({email}, async (err, user) => {     
                if (user) {
                    user.money = user.money + moneyDeposit;
                    // save data of deposit resived
                    await User.findByIdAndUpdate({
                        _id: user._id
                    },
                    {
                        $push: {
                            deposit_resived: {
                                email_user_resived: userDeposit.email,
                                name_user_resived:  userDeposit.firts_name,
                                lastname_user_resived: userDeposit.last_name,
                                money_user_resived: moneyDeposit
                            }
                        }
                    });
                    // save data of deposit made
                    await User.findByIdAndUpdate( {
                        _id: userDeposit._id
                    }, {
                        $push: {
                            deposits_made: {
                                email_user: user.email,
                                name_user: user.firts_name,
                                lastname_user: user.last_name,
                                money_send: moneyDeposit
                            }
                        }
                    });

                    const newDeposit = new RegisterDeposit({
                        id_user_send: userDeposit._id,
                        id_user_resived: user._id,
                        email_resived: user.email,
                        email_send: userDeposit.email,
                        moneyDeposit: moneyDeposit
                    })
                    
                    await user.save();
                    await userDeposit.save();
                    await newDeposit.save();
                }
            });
            res.json({message: "deposit successfully"});
        } catch (e) {
            console.log(e.message);
        }
    }); 
}

async function deleteAllUser(req, res) {
    RegisterDeposit.remove({}, (err) => {
        res.json({message: "delete all"})
    });
}

async function getAllDepositsUser(req, res) {
    RegisterDeposit.find({id: req.params.id}, (err, deposit) => {
        res.json(deposit);
    });
}

module.exports = {
    depositUser,
    deleteAllUser,
    getAllDepositsUser
}
