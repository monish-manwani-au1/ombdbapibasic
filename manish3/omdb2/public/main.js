$(document).ready(function ($) {
    //api url
    //var apiUrl = "http://www.omdbapi.com/";
   
    //Event binding on enter button pressed inside movie search input box
    $('#searchText').keyup(function () {
        if (event.keyCode == 13) {
            $('#btn').click();
        } else {
            return false
        }
    });
  
    //Event binding on search button click
    $('#btn').click(function () {
        var searchString = $('#searchText').val();
        var searchUrl ='http://www.omdbapi.com/?s='+searchString+'&apikey=9370112b'
  
    //    $('#search-results .movie-list').empty();
  
        //Remove previous searched Movie
    //    $('#search-results .movie').empty();
       
        //Get Movie list from api using search string
        $.ajax({
            url: searchUrl,
            type: 'GET',
            dataType: 'text',
            // statusCode: {
            //     403: function () {
            //         $('#search-results').html('HTTP 403 Forbidden!');
            //     }
            // },
            success: function (response) {
                var result=JSON.parse(response);
  
                //check if no movie found
                if (result.Response == "False") {
                    $('#movies').html("<li class='list-group-item'>"+result.Error+"</li>");
                }else{
                    var MovieArray=result.Search;
                    var resultLength=MovieArray.length;
               //     movieListHtml="";
                    var output = '';
                    MovieArray.forEach(function(movie){
                        output += `
                                <div class="col-md-3">
                                    <div class="well text-center">
                                    <img src="${movie.Poster}">
                                    <h5>${movie.Title}</h5>
                                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                                    </div>
                                </div>
                             `;
                    });
                    $('#movies').html(output);
                   
                    //binding event on movie list
                //    addEventOnMovieList();
                }
            }
        });//ajax closed
 });
  
 });

 function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = '/moviedbmi/movieInfo';
    return false;
  }
// function to show movie details and call function the movie.hbs
 