// cog Face Detect API
function analyzingFace(usrName) {
	var subscriptionKey = "bb334b56e5a349b18e4aba3ed6d0d663";
	var imgPath = "https://icists17-cog.azurewebsites.net/img/" + usrName + '.jpg';

    $(function() {
        var params = {
            // Request parameters
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes": "age,gender,emotion",
        };
      
        $.ajax({
            url: "https://southeastasia.api.cognitive.microsoft.com/face/v1.0/detect?" + $.param(params),
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
            data[0]['name'] = usrName;
            printData(data[0]);
            document.getElementById('analysisImage').className = "ui primary button";
            
        })
        .fail(function() {
            alert("Cog error");
            document.getElementById('analysisImage').className = "ui primary button";
        });
    });

}

function printData(data) {
    document.getElementById('resultsInfo').innerHTML = data['name'] + ", Your face emotions are below" + '<br>'
    for (var i in data.faceAttributes.emotion)
    {
        document.getElementById('resultsInfo').innerHTML += i + " = " + data['faceAttributes']['emotion'][i] + '<br>'
    }
}