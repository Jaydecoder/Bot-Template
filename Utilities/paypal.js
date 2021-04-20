const express = require('express');
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');
const router = express.Router()
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': '-',
  'client_secret': '-'
});

const embed = require("./embed").embed
const getUser = require('../firebase/firebaseconnect').getUserInfo
const getCollection = require('../firebase/firebaseconnect').getCollectionInfo
const set = require('../firebase/firebaseconnect').setUserInfo
const update = require('../firebase/firebaseconnect').UpdateUserInfo
const config = require("../Bot/botconfig.json")
const percentage = config.Percentage
module.exports = {
    pay: async (Name, Price, Description, message) => {
        let msg;
        console.log("Giving link...")
        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3001/success",
                "cancel_url": "http://localhost:3001/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": Name,
                        "sku": "001",
                        "price": Price,
                        "currency": "GBP",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "GBP",
                    "total":  Price
                },
                "description": Description
            }]
        };

        paypal.payment.create(create_payment_json,async function (error, payment) {
        if (error) {
            throw error;
        } else {
        
            for(let i = 0;i < payment.links.length;i++){
                
                if(payment.links[i].rel === 'approval_url'){
                    
                    // do something when link generated
                }
            }
        }
        });

        

        router.get('/success', (req, res) => {
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;

        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "GBP",
                    "total": Price
                }
            }]
        };

        return paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
            if (error) {
                console.log(error.response);
                throw error;
            } else {
                
                // do something when payment completed
            }
        });
        });

        router.get('/cancel', (req, res) => {res.send('Cancelled'); return false});
    },
payout: async (message,value,receiver,id,email_subject, note) => {
    var sender_batch_id = Math.random().toString(36).substring(9);

    var create_payout_json = {
        "sender_batch_header": {
            "sender_batch_id": sender_batch_id,
            "email_subject": email_subject ?? "Bot Crafters-- Your payout."
        },
        "items": [
            {
                "recipient_type": "EMAIL",
                "amount": {
                    "value": value,
                    "currency": "GBP"
                },
                "receiver": receiver,
                "note": note ?? "Thank you for working with Bot Crafters.",
                "sender_item_id": "payout"
            }
        ]
    };
    
    var sync_mode = 'true';
    
    paypal.payout.create(create_payout_json, sync_mode, function (error, payout) {
        if (error) {
            console.log(error.response);
            
	    
            throw error;
        } else {
            console.log("Create Single Payout Response");
            
        }
    });
},
    router
    }

    
