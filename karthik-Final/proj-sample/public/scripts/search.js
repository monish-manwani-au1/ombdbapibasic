window.onload = function() {
    var api = "http://www.omdbapi.com/";
    var apikey = 'apikey=198b7580';
    var imdbID = "";
    var location = window.location.pathname.split('/');
    console.log(location);
    if (location[1] == 'signup' || location[1] == 'login' || location[1] == 'myreviews' || location[1] == "") {
        $("#newsearchbar").remove();
    }
    $('#searchbar').keypress(function(e) {
        // do something
        var key = e.which;
        if (key == 13) {
            var searchString = $('#searchbar').val();
            $.ajax({
                dataType: "JSON",
                url: api + '?s=' + searchString + '&' + apikey,
                success: function(data) {
                    data = JSON.parse(JSON.stringify(data));
                    if (data.Response == 'False') {
                        $('.row').html('');
                        $('#message').html('<h3 class="text-center">No Results Were Found</h3><br><br><p style="margin-left: 357px; margin-top: -34px;"><b>Eg:-Don2 should be entered as Don 2 in the search.</b></p>')
                    } else {
                        $('h1').hide();
                        $('#message').html('');
                        var dom = "";
                        for (var i = 0, n = data.Search.length; i < n; i++) {
                            dom += '<div class="col col-sm-4">';
                            dom += '<div class="card" style="margin-bottom: 10px;">';
                            if (data.Search[i].Poster == 'N/A') {
                                dom += "<img class='card-img-top' src='https://www.jakartaplayers.org/uploads/1/2/5/5/12551960/2297419_orig.jpg' alt='card' id='moviecard' width='600' height='600'>";
                            } else {
                                dom += "<img class='card-img-top' src= '" + data.Search[i].Poster + "' alt='card' id='moviecard' width='600' height='600'>";
                            }
                            dom += '<div class="card-body">';
                            dom += '<h5 class="card-title text-center" style="margin-top:-53px;">';
                            dom += data.Search[i].Title;
                            imdbID = data.Search[i].imdbID;
                            dom += '<div class="container"><a href="/view/' + data.Search[i].imdbID + '" target="_blank"  class="btn btn-primary" style="font-family:Helvetica" id="viewdetails">View Details</a></div>'
                            dom += '</h5>';
                            dom += '</div>';
                            dom += '</div>';
                            dom += '</div>';
                        }
                        $('.row').html(dom);
                    }
                }

            });
        }
    });
}