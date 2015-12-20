// <input type="file" id="profilePhotoFileUpload">

var fileUploadControl = $("#profilePhotoFileUpload")[0];
if (fileUploadControl.files.length > 0) {
  var file = fileUploadControl.files[0];
  var name = "photo.jpg";

  var parseFile = new Parse.File(name, file);
}

parseFile.save().then(function() {
  // The file has been saved to Parse.
}, function(error) {
  // The file either could not be read, or could not be saved to Parse.
});

var profilePhoto = profile.get("photoFile");
$("profileImg")[0].src = profilePhoto.url();