var Scorm1dot2 = {
    lmsFieldNames: {
        "learnerName": "cmi.core.student_name",
        "learnerId": "cmi.core.student_id",
        "language": "cmi.student_preference.language",
        "location": "cmi.core.lesson_location",
        "audio": "cmi.learner_preference.audio_level",
        "caption": "cmi.learner_preference.audio_captioning",
        "timeStamp": "timestamp",
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
        "comments": "cmi.comments",
        "commentValue": "comment",
        "commentLocation": "location",
        "notFound": "403",
        "completionStatus": "cmi.core.lesson_status",
        "completionStatusInComplete": "incomplete",
        "completionStatusComplete": "completed",
        "successStatus": "cmi.success_status",
        "successStatusPassed": "passed",
        "successStatusFailed": "failed",
        "successStatusUnknown": "unknown",
        "entryMode": "cmi.core.entry",
        "exitMode": "cmi.core.exit",
        "suspend": "suspend",
        "launchData": "cmi.launch_data",
        "suspendData": "cmi.suspend_data",
        "scoreScaled": "cmi.score.scaled",
        "scoreMinimum": "cmi.core.score.min",
        "scoreMaximum": "cmi.core.score.max",
        "score": "cmi.core.score.raw"
    },
    findAPI: function(win) {
        while ((win.API == null) && (win.parent != null) && (win.parent != win)) {
            this.findAPITries++;
            if (this.findAPITries > 500) {
                return null;
            }
            win = win.parent;
        }
        return win.API;
    },
    getAPI: function() {
        var theAPI = this.findAPI(window);
        if ((theAPI == null) && (window.opener != null) && (typeof(window.opener) != "undefined")) {
            apiOpener = "true";
            theAPI = this.findAPI(window.opener);
        }
        if (theAPI == null) {
            noAPIFound = "true";
            //showError(errMsg_LMS_Connection + " \n Api not found");
        }
        return theAPI
    },
    getAPIHandle: function() {
        if (this.apiHandle == null) {
            apiHandle = this.getAPI();
        }
        return apiHandle;
    },
    initializeCommunication: function() {
        var api = this.getAPIHandle();
        var result = api.LMSInitialize("");
        return result;
    },
    terminateCommunication: function() {
        var api = this.getAPIHandle();
        var result = api.LMSFinish("");
        return result;
    },
    retrieveDataValue: function(name) {
        if (terminated != "true") {
            var api = this.getAPIHandle();
            var value = api.LMSGetValue(name);
            return value;
        }
    },
    Initialize: function(callBack) {
        this.initializeCommunication();
        this.getSuspendData(this.retrieveDataValue(this.lmsFieldNames.suspendData));
        this.learner.name = this.retrieveDataValue(this.lmsFieldNames.learnerName);
        this.learner.id = this.retrieveDataValue(this.lmsFieldNames.learnerId);
        this.learner.completionStatus = this.retrieveDataValue(this.lmsFieldNames.completionStatus);
        this.isDone = true;
        this.setIncomplete();
    },
    storeDataValue: function(name, value) {
        if (this.terminated != "true") {
            var api = this.getAPIHandle();
            api.LMSSetValue(name, value);
        }
        return;
    },
    retrieveLastErrorCode: function() {
        var api = this.getAPIHandle();
        if (api == null) {
            return "";
        } else {
            return api.LMSGetLastError();
        }
    },
    retrieveErrorInfo: function(errCode) {
        var api = this.getAPIHandle();
        if (api == null) {
            return "";
        } else {
            return api.LMSGetErrorString(errCode);
        }
    },
    retrieveDiagnosticInfo = function(error) {
        var api = this.getAPIHandle();
        if (api == null) {
            return "";
        } else {
            return api.LMSGetDiagnostic(error);
        }
    },
    persistData: function() {
        if (this.terminated != "true") {
            var api = this.getAPIHandle();
            var result = api.LMSCommit("");
        }
        return "";
    }
}