const ContentModel = require("../models/ContentModel");
const apiResponse = require("../helpers/apiResponse");

exports.get = [
	(req, res) => {
		try {
            ContentModel.find().exec(function(err, users){
                console.log('users : ', users);
                console.log('err', err);
                return res.send(users);
            }).catch(function(err) {
				return apiResponse.ErrorResponse(res, err);
			});
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];


exports.create = (req, res) => {
	try {
		const model = new ContentModel(req.body);

		model.save().then(data => {
			res.send(data);
		}).catch(function(err) {
			return apiResponse.ErrorResponse(res, err);
		});
	} catch (err) {
		//throw error in json response with status 500. 
		return apiResponse.ErrorResponse(res, err);
	}
};

exports.update = (req, res) => {
	ContentModel.findByIdAndUpdate(req.params.id, req.body).then(data => {
		if (!data) {
			res.status(404).send("No item found");
		} else {
			res.status(200).send();
		}
	}).catch(function(err) {
		return apiResponse.ErrorResponse(res, err);
	});
};

exports.delete  = (req, res) => {
	ContentModel.findByIdAndDelete(req.params.id).then(data => {
		if (!data) {
			res.status(404).send("No item found");
		} else {
			res.status(200).send();
		}
	}).catch(function(err) {
		return apiResponse.ErrorResponse(res, err);
	});
};