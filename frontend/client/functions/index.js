const functions = require('firebase-functions');
const _ = require('lodash');
const request = require('request-promise');

exports.indexSheltersToElastic = functions.database.ref('/shelters/{resourceId}')
	.onWrite(event => {
		let shelterData = event.data.val();
		let resourceId   = event.params.resourceId;

		console.log('Indexing shelter ', resourceId, shelterData);

		let elasticsearchFields = ['name','keywords','services'];
		let elasticSearchConfig = functions.config().elasticsearch;
		let elasticSearchUrl = elasticSearchConfig.url + '/home/shelters/' + resourceId;
		let elasticSearchMethod = shelterData ? 'POST' : 'DELETE';

		let elasticsearchRequest = {
			method: elasticSearchMethod,
			uri: elasticSearchUrl,
			auth: {
				username: elasticSearchConfig.username,
				password: elasticSearchConfig.password,
			},
			body: _.pick(shelterData, elasticsearchFields),
			json: true
		};

		return request(elasticsearchRequest).then(response => {
			console.log('Elasticsearch response', response);
		})

	});


