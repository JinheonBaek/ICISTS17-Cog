// cog Face Detect API
function analyzingFace(usrName, imgName) {
	var subscriptionKey = "bb334b56e5a349b18e4aba3ed6d0d663";
	var imgPath = "https://icists17-cog.azurewebsites.net/img/" + imgName;

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
            if (data[0] === undefined) {
                document.getElementById('resultsInfo').innerHTML = "No face was detected, Plz try again";
            }
            else {
                printData(data[0], usrName);
            }
        })
        .fail(function() {
            alert("Cog error");
        })
        .always(function() {
            document.getElementById('analysisImage').className = "ui primary button";
        });
    });

}

function printData(data, usrName) {
    document.getElementById('resultsInfo').innerHTML = usrName + ", Your face emotion values are below" + '<br>'
    var threshold = [0.3, 1, 0.3, 1, 0.9, 1, 0.3, 0.8];
    count = 0;
    for (var i in data.faceAttributes.emotion)
    {
        if (data['faceAttributes']['emotion'][i] >= threshold[count]) {
            document.getElementById('resultsInfo').innerHTML += '<strong>' + i + " = " + data['faceAttributes']['emotion'][i] + '</strong> <br>'
        }
        else {
            document.getElementById('resultsInfo').innerHTML += i + " = " + data['faceAttributes']['emotion'][i] + '<br>'
        }
    }
}