	var AICC = {
	    lmsFieldNames: {
	        "learnerName": "cmi.learner_name",
	        "learnerId": "cmi.learner_id",
	        "language": "cmi.learner_preference.language",
	        "location": "lesson_location",
	        "audio": "cmi.learner_preference.audio_level",
	        "caption": "cmi.learner_preference.audio_captioning",
	        "timeStamp": "time",
	        "interactions": "cmi.interactions",
	        "interactionResponse": "learner_response",
	        "interactionResult": "result",
	        "interactionDescription": "description",
	        "interactionId": "id",
	        "interactionType": "type",
	        "interactionTypeValue": "other",
	        "interactionCorrect": "correct",
	        "interactionIncorrect": "incorrect",
	        "interactionNeutral": "neutral",
	        "comments": "cmi.comments_from_learner",
	        "commentValue": "comment",
	        "commentLocation": "location",
	        "notFound": "403",
	        "completionStatus": "lesson_status",
	        "completionStatusInComplete": "incomplete",
	        "completionStatusComplete": "completed",
	        "successStatus": "cmi.success_status",
	        "successStatusPassed": "passed",
	        "successStatusFailed": "failed",
	        "successStatusUnknown": "unknown",
	        "entryMode": "cmi.entry",
	        "exitMode": "cmi.exit",
	        "suspend": "suspend",
	        "launchData": "cmi.launch_data",
	        "suspendData": "core_lesson",
	        "scoreScaled": "cmi.score.scaled",
	        "scoreMinimum": "cmi.core.score.min",
	        "scoreMaximum": "cmi.core.score.max",
	        "score": "score"
	    },
	    storeDataValue: function(name, value, callBack) {
	        var learnerData = {
	            this.lmsFieldNames.completionStatus: this.learner.completionStatus,
	            this.lmsFieldNames.location: this.learner.location.raw,
	            this.lmsFieldNames.timeStamp: this.get_time_difference(startTime, new Date()).duration,
	            this.lmsFieldNames.score: this.learner.score,
	            this.lmsFieldNames.suspendData: JSON.stringify(learner)
	        };
	        $.aicc('put', learnerData, function(r) {
	            if (callBack != undefined) {
	                callBack(r.error);
	            }
	        });
	    },
	    Initialize: function(callBack) {
	        $.aicc('get', function(r) {
	            if (Number(r.error) != 0) {
	                callBack(r.error);
	            } else {
	                this.learner.name = r.name;
	                this.learner.id = r.id;
	                this.learner.location.raw = r.location;
	                this.learner.completionStatus = r.status;
	                if (r.time != "" && r.time != undefined) {
	                    this.previousTimeSpent = r.time;
	                }
	                this.getSuspendData(r.suspendData);
	                callBack();
	            }
	        });
	    }
	}