
module.exports = {
	
	host		: 'smtp.gmail.com',
	user 		: 'juanmalp1992@gmail.com',
	password 	: process.env.EMAIL_PASSWORD,
	sender		: 'Juanma <juanmalp1992@gmail.com>'

    /*

    You must fill this fields with your mail credentials but the "host" field.

    The "password" field is a Heroku var. If you try this app in localhost it won't work by anyway.

    */
}