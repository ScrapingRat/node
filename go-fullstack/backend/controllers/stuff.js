const Thing = require('../models/thing');
const fs = require('fs');

exports.createThing = (req, res, next) => {
	const thingObject = JSON.parse(req.body.thing);
	delete thingObject._id;
	const thing = new Thing({
		...thingObject,
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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
	const thingObject = req.file ?
	{
		...JSON.parse(req.body.thing),
		imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
	} : { ...req.body };
	Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
		.then(things => res.status(200).json({ message: 'Item edited' }))
		.catch(error => res.status(400).json({ error }));
};

exports.deleteThing =  (req, res, next) => {
	Thing.findOne({ _id: req.params.id })
	.then(thing => {
		const filename = thing.imageUrl.split('/images/')[1];
		fs.unlink(`images/${filename}`, () => {
			Thing.deleteOne({ _id: req.params.id })
			.then(things => res.status(200).json({ message: 'Item deleted' }))
			.catch(error => res.status(400).json({ error }));
		});
	})
	.catch(error => res.status(500).json({ error }));
};

exports.getAllStuff = (req, res, next) => {
	Thing.find()
		.then(things => res.status(200).json(things))
		.catch(error => res.status(400).json({ error }));
};