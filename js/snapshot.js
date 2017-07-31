// webcamSnapshot
// Webcam snapshot library using webcam.js in JavaScript 

//Taking snapshot and showing image in div block
function snapshot() {
	Webcam.snap(
		function(data_uri) {
			var raw_image_data = data_uri.replace(/^data\:image\/\w+\;base64\,/, '');
			var time = new Date();
			var usrName = document.getElementById('usrname').value;
			var imgName = usrName + time.getTime(); + '.jpg';
			
			//Upload snapshot image on server for jpeg format
			$(function() {
				var formData = new FormData();
				formData.append('mydata', raw_image_data);
				formData.append('imgname', imgName);

				$.ajax( {
					url: 'upload.php',
					data: formData,
					async: false,
					processData: false,
					contentType: false,
					type: 'POST',
					success: function(data) {
						document.getElementById('resultsInfo').innerHTML = 'The image data is uploaded to the server' + '<br>' + 'Cognitive Server calculates your emotions, Just wait a moment...';
						analyzingFace(usrName, imgName);
					},
					error: function(error) {
						document.getElementById('resultsInfo').innerHTML = "Error!";
						alert(error);
					}
				}); 
			}); 				
		}
	);
}