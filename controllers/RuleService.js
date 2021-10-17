const RuleModel = require("../models/RuleModel");
const ContentModel = require("../models/ContentModel");
const apiResponse = require("../helpers/apiResponse");
var MyObjectId = require('mongoose').Types.ObjectId

exports.get = (req, res) => {
	try {
		RuleModel.find().lean().then(rules => {
			console.log('rules : ', rules);

			ContentModel.find().then(templates => {
				let dict = {}

				templates.map(template => {
					dict[template._id.toString()] = template.key;
				});

				rules.map(rule => {
					let ContentKeys = rule.contents.map(contentId => {
						let idStr = contentId.toString();
						return dict[idStr];
					})
					rule.ContentKeys = ContentKeys;
				});

				console.log('rules updated: ', rules);
				res.send(rules);
			}).catch(function(err) {
				return apiResponse.ErrorResponse(res, err);
			});
		}).catch(function(err) {
			return apiResponse.ErrorResponse(res, err);
		});
	} catch (err) {
		//throw error in json response with status 500. 
		return apiResponse.ErrorResponse(res, err);
	}
};

exports.create = (req, res) => {
	try {
		const model = new RuleModel(req.body);

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
	RuleModel.findByIdAndUpdate(req.params.id, req.body).then(data => {
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
	RuleModel.findByIdAndDelete(req.params.id).then(data => {
		if (!data) {
			res.status(404).send("No item found");
		} else {
			res.status(200).send();
		}
	}).catch(function(err) {
		return apiResponse.ErrorResponse(res, err);
	});
};