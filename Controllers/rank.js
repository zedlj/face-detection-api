const handleProfileGet = (req, res, db) => {
	const { id } = req.params;
	let found = false;
	db.select('*').from('users').where({ id })
		.then(user => {
		console.log(user)
		//Checks if response array is empty (user exists)
		if (user.length) {
			res.json(user[0]);
		} else {
			res.status(400).json('Not found')
		}

	})
	.catch(err => res.status(400).json('error getting user'))
}



module.exports = {
//ES6 don't need value i.e. handprofileget : handleprofileget
	handleProfileGet
}