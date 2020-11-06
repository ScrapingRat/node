const Thing = require('../models/thing');

exports.createThing = (req, res, next) => {
	delete req.body._id;
	const thing = new Thing({
		...req.body
	});
	thing.save()
		.then(() => res.status(201).json({ message: 'item added' }))
		.catch(error => res.status(400).json({ error }));
});
