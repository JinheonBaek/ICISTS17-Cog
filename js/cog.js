function analyzingFace(usrName) {
	var faceListId = "msptest"
	var subscriptionKey = "bb334b56e5a349b18e4aba3ed6d0d663";
	var imgPath = "https://icists17-cog.azurewebsites.net/img" + usrName + '.jpg';

	$(function() {
        var params = {
            // Request parameters
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes": "{string}",
        };
      
        $.ajax({
            url: "https://westus.api.cognitive.microsoft.com/face/v1.0/detect?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
            },
            type: "POST",
            // Request body
            data: "{" +
				"\"url\":\"" + imgPath +
			"\"}",
        })
        .done(function(data) {
            alert("success");
            alert(data);
        })
        .fail(function() {
            alert("error");
        });
    });
}