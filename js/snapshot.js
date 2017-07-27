// webcamSnapshot
// Webcam snapshot library using webcam.js in JavaScript 

//Taking snapshot and showing image in div block
function snapshot() {
	Webcam.snap(
		function(data_uri) {
			var raw_image_data = data_uri.replace(/^data\:image\/\w+\;base64\,/, '');
			var usrName = document.getElementById('usrname').value;
			var imgName = usrName + '.jpg';
            document.getElementById('results').innerHTML = '<h2>Here is your image:</h2>' + '<img src="'+data_uri+'"/>';
			
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
						document.getElementById('resultsInfo').innerHTML += '서버에 데이터 저장이 완료되었습니다.' + '<br>';
						analyzingFace(usrName);
					},
					error: function(error) {
						alert("Error!");
						alert(error)
					}
				}); 
			}); 				
		}
	);
}