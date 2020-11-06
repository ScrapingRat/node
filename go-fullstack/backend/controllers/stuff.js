const Thing = require('../models/thing');

exports.createThing = (req, res, next) => {
	delete req.body._id;
	const thing = new Thing({
		...req.body
	});
	thing.save()
		.then(() => res.status(201).json({ message: 'item added' }))
		.catch(error => res.status(400).json({ error }));
};

exports.getOneThing = (req, res, next) => {
	Thing.findOne({ _id: req.params.id })
		.then(things => res.status(200).json(things))
		.catch(error => res.status(404).json({ error }));

};

exports.modifyThing = (req, res, next) => {
	Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
		.then(things => res.status(200).json({ message: 'Item edited' }))
		.catch(error => res.status(400).json({ error }));
};

exports.deleteThing =  (req, res, next) => {
	Thing.deleteOne({ _id: req.params.id })
		.then(things => res.status(200).json({ message: 'Item deleted' }))
		.catch(error => res.status(400).json({ error }));
};

exports.getAllStuff = (req, res, next) => {
	Thing.find()
		.then(things => res.status(200).json(things))
		.catch(error => res.status(400).json({ error }));
};
