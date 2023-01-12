PUT data-asset-metadata/_settings
{ 		"index": {
			"analysis": {
				"analyzer": {
					"test_analyzer": {
						"tokenizer": "test_tokenizer",
						"filter": "test_filter"
					}
				},
				"filter": {
					"test_filter": {
						"type": "stop",
						"stopwords": [
							"&",
							"AND",
							"THE",
							",",
							"'",
							"{",
							"}"
						]
					}
				},
				"tokenizer": {
					"test_tokenizer": {
						"type": "edge_ngram",
						"min_gram": 2,
						"max_gram": 10,
						"token_chars": [
							"letter",
							"digit"
						],
						"filter": "lowercase"
					}
				}
                
			}
		}
	}
