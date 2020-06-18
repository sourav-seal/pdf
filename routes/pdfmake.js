// const express = require('express');
// const router = express.Router();

// const pdfMake = require('../pdfmake/pdfmake');
// const vfsFonts = require('../pdfmake/vfs_fonts');

// pdfMake.vfs = vfsFonts.pdfMake.vfs;

// router.post('/pdf', (req, res, next) => {
//     //res.send('PDF');

//     const fname = req.body.fname;
//     const lname = req.body.lname;

//     var documentDefinition = {
//         content: [
//             `Hello ${fname} ${lname}`,
//             'Nice to meet you!'
//         ]
//     };

//     const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
//     var docBlob = null;

//     pdfDocGenerator.getDataUrl(function(result) {
//         res.writeHead(200, {
//             'Content-Type': 'application/pdf',
//             'Content-Disposition': `attachment;filename= ${fname}.pdf`
//         });

//         const download = Buffer.from(result.toString('utf-8'), 'base64');


//         docBlob = result;
//         console.log(docBlob);
//         res.end(docBlob);
//     });
//     // pdfDocGenerator.getBlob((blob) => {
//     //     // ...
//     // });
//     // pdfDoc.getBase64((data) => {
//     //     res.writeHead(200, {
//     //         'Content-Type': 'application/pdf',
//     //         'Content-Disposition': `attachment;filename= ${fname}.pdf`
//     //     });

//     //     const download = Buffer.from(data.toString('utf-8'), 'base64');
//     //     res.end(download);
//     // });

// });


// module.exports = router;


const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const axios = require("axios");
const pdfMake = require('../pdfmake/pdfmake');
const vfsFonts = require('../pdfmake/vfs_fonts');
const fs = require("fs");
const { getMaxListeners } = require('process');
pdfMake.vfs = vfsFonts.pdfMake.vfs;
sgMail.setApiKey("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");
router.post('/pdf', (req, res, next) => {
    //res.send('PDF');

    const fname = req.body.fname;
    const lname = req.body.lname;

    var documentDefinition = {
        content: [
            `Hello ${fname} ${lname}`,
            'Nice to meet you!'
        ]
    };

    const pdfDoc = pdfMake.createPdf(documentDefinition);
    pdfDoc.getBase64((data) => {
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment;filename= ${fname}.pdf`
        });
        hello();
        const download = Buffer.from(data.toString('utf-8'), 'base64');

        res.end(download);

    });

    //var base64data = new Buffer(data).toString('base64');
    //let data_base64 = base64_encode(pdfDoc);
    function hello() {
        const msg = {
            to: 'souravseal.sourav@gmail.com',
            from: 'debankurdas2013.dd@gmail.com',
            subject: `Invoice`,
            text: `Invoice`,
            html: "whatever",
            attachments: [{
                filename: `${fname}`,
                content: pdfDoc,
                type: 'application/pdf',
                disposition: 'attachment'
            }]
        };

        sgMail
            .send(msg)
    }
    // const msg = {
    //     to: 'test@example.com',
    //     from: 'test@example.com',
    //     subject: 'Sending with SendGrid is Fun',
    //     text: 'and easy to do anywhere, even with Node.js',
    //     attachments: [{
    //         content: download,
    //         filename: `${fname}.pdf`,
    //         type: "application/pdf",
    //         disposition: "attachment"
    //     }]
    // };

    // sgMail.send(msg).catch(err => {
    //     console.log(err);
    // });


    // const obj = {
    //     subject: 'Order Verification Mail',
    //     heading: "Welcome to Medico24/7",
    //     email: 'souravseal.sourav@gmail.com',
    //     attachment: {
    //         filename: `${fname}.pdf`,
    //         content: pdfDoc
    //     }
    // };



    // let htmlTemplate = `
    //         <!DOCTYPE html>
    //         <html>
    //         <body>
    //         <h1>${obj.heading}</h1>
    //         <h1>${obj.attachment}</h1>
    //         </body>
    //         </html>
    // `;

    // const callMethod = () => {
    //     axios({
    //         method: "post",
    //         url: "https://api.sendgrid.com/v3/mail/send",
    //         headers: {
    //             Authorization: "Bearer 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"
    //         },
    //         data: {
    //             personalizations: [{
    //                 to: [{
    //                     email: 'souravseal.sourav@gmail.com'
    //                 }],
    //                 subject: `${obj.subject}`
    //             }],
    //             from: {
    //                 email: "debankurdas2013.dd@gmail.com",
    //                 name: "Debankur Das"
    //             },
    //             content: [{ type: "text/html", value: htmlTemplate }]
    //         }
    //     });
    // };

    // callMethod();


});

function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

module.exports = router;