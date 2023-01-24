const axios = require('axios')
const express = require('express')
const sharp = require('sharp')
const funct = require('../function/function')
var fs = require("fs");
const { Readable } = require('stream')
const { streamToBuffer } = require('@jorgeferrero/stream-to-buffer');
var {Base64Encode} = require('base64-stream');

exports.generateQr = async(req,res,next)=>{
    const { filename, data, nama_agent } = req.body
    // try {
        let dataQR = await funct.generateQrCODE(filename,data).then(data=> data)
        let width = 750;
        let height = 483;

        const svgImage = `
        <svg width="${width}" height="${height}">
        <style>
        .title { fill: #001; font-size: 80px; font-weight: bold;}
        </style>
        <text x="10%" y="10%" class="title">${nama_agent}</text>
        </svg>
        `;


        console.log(typeof dataQR)
        console.log("this is fucking data qr", dataQR)
            
            let xxx = process.stdin.pipe(new Base64Encode()).pipe(process.stdout);
            // return res.status(200).json({data: xxx})
            console.log("this is data xxx", xxx)
            const roundedCorners = xxx;
            console.log("this is buffer", roundedCorners)
            // res.end({data: xxx})
            const isItReallyBuffer = Buffer.isBuffer(roundedCorners)
            xxx.pipe(res)

        const metadata = await sharp(dataQR).metadata()
        console.log("this is metadata", metadata)

        const metadataBg = await sharp("kosonganTemplate.png").metadata()
        const newMeta = await sharp("kkkk1.png").metadata()
        console.log("metakone", newMeta);

        const newAgentName = Buffer.from(svgImage)
        let testingData = await sharp(dataQR).extract({width: 870, height:870, left:0, top:0}).flatten({background: {r: 255, g: 255, b: 255}}).png().toBuffer();
        testingData = sharp(testingData).resize(870, 870,  {fit: sharp.fit.cover, position: sharp.strategy.entropy,  background: { r: 0, g: 0, b: 0, alpha: 0 }}).png().toFile('kkkk1.png')
        try {
            let dataRezise = await sharp(dataQR).extract({width: 800, height:800, left:30, top:20}).flatten({background: {r: 255, g: 255, b: 255, alpha: 0.1}}).png().toBuffer();
            dataRezise = await sharp(dataRezise).resize(1890, 1470, {fit: sharp.fit.contain, position: sharp.strategy.attention,  background: { r: 0, g: 0, b: 0, alpha: 0 }}).png().toBuffer();
            await sharp("newBackground.png")
              .composite([
                {
                  input: dataRezise,
                  top: 1020,
                  left: 220,
                  right: 200,
                  bottom: 700
                },
                {
                    input: newAgentName,
                    top: 850,
                    left: 850
                },
              ])
              .extend({
                background: {r: 255, g: 255, b: 255, alpha: 0.1}
              })
              .toFile(filename+".png");

              return res.status(200).json({
                message: "Success generate qrCode"
              })
          } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: "Internal Server Error"
            })
          }
}