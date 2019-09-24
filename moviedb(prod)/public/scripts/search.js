window.onload = function() {
    // var api = "http://www.omdbapi.com/";
    // var apikey = 'apikey=198b7580';
    // var imdbID = "";
    var location = window.location.pathname.split('/');
    // to disabling the search button using jquery
    if (location[1] == 'signup' || location[1] == 'login' || location[1] == 'myreviews' || location[1] == "") {
        $("#newsearchbar").remove();
    }
    // searchbar for searching a movie using AJAX request
}