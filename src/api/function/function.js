const axios = require('axios')
const express = require('express')
const dotenv = require('dotenv')
dotenv.config({path: './.env'})

async function generateQrCODE(data, filename){
    return new Promise(async(resolve, reject)=>{
        await axios.get(process.env.GENERATEQR+ 'createQRCode',
        {
            responseType: 'arraybuffer',
            params:{
                data: data,
                filename: filename
            }
        }).then(function(response){
            console.log("this is response data =>", response.data)
            resolve(response.data)
        }).catch(err =>{
            reject(err)
        })

    })
}

module.exports={
    generateQrCODE
}