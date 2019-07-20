const { getUsrByID } = require('../database/collections/users/user');
const nodemailer = require("nodemailer");

module.exports.mail = async(id)=>{
    var usrInfo = await getUsrByID(id);
    if (!usrInfo) 
         res.status(404).json({"message": "User not found"})
    else
        return await main(usrInfo)
}

// async..await is not allowed in global scope, must use a wrapper
main = async (usrInfo) => {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass // generated ethereal password
        }
    });

    try {
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔ " + usrInfo.usuario , // Subject line
            text: usrInfo.nombre , // plain text body
            html: "<b>Hello world?</b>" // html body
        });

        console.log("Message sent: %s", info.messageId);

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return true

    } catch (e) {
        console.error(e)
        return false
    }

}

