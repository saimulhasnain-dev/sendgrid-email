const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

class EMAIL {
    async sendEmail(req) {
        let body = await this.getReqData(req);
        console.log("body", body)
        const input = JSON.parse(body);
        return new Promise((resolve, reject) => {
            const msg = {
                to: input.to,
                from: process.env.SENDGRID_EMAIL, // Use the email address or domain you verified above
                subject: input.subject,
                text: input.text,
                html: input.htmltext,
            };

            (async () => {
                try {
                    const res = await sgMail.send(msg);
                    resolve(res[0]);
                } catch (error) {
                    console.error(error);
                    console.error(error.response.body)
                    reject(error)
                }
            })();
        });
    }
    getReqData(req) {
        return new Promise((resolve, reject) => {
            try {
                let body = "";
                // listen to data sent by client
                req.on("data", (chunk) => {
                    // append the string version to the body
                    body += chunk.toString();
                });
                // listen till the end
                req.on("end", () => {
                    // send back the data
                    resolve(body);
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}



module.exports = EMAIL;

