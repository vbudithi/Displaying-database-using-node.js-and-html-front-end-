var appVariables = [];

$(function () {
    $('#Button2').click(function () {
        appVariables = [];
        $('#TextBox1').innerHTML = '';
        // var values = [];
        var checkboxList = $('input[type=checkbox]');
        for (var i = 0; i < checkboxList.length; i++) {
            var el = checkboxList[i];
            if (el.checked) {
                appVariables.push(el.value);
                document.getElementById('TextBox1').innerHTML += el.value;
                document.getElementById('TextBox1').innerHTML += '\n ';
            }
        }
    });

    $('#Button1').click(function () {
        $.ajax({

            // The URL for the request
            url: "http://localhost:5000/getData",

            // The data to send (will be converted to a query string)
            data: {
                data: appVariables
            },

            // Whether this is a POST or GET request
            type: "POST",

            // The type of data we expect back
            dataType: "json",
            crossDomain : true
        })
            // Code to run if the request succeeds (is done);
            // The response is passed to the function
            .done(function (json) {
                $('#output').html('');
                $('#output').append('<table></table>');
                var table = $('#output').children();
                var rowHTML = '';
                for(var i=0;i<json.length;i++){
                    
                    if(i == 0){
                        rowHTML += '<tr><th>Index</th>';
                    }
                    else{
                        rowHTML += '<tr><td>' +  i + '</td>';
                    }
                    var row = json[i];
                    for(var key in row){
                        if(i == 0){
                            rowHTML += '<th>'+key+'</th>';
                        }
                        else{
                            rowHTML += '<td>'+row[key]+'</td>';
                        }
                        
                    }
                    rowHTML += '</tr>';
                    
                }
                table.append(rowHTML);
                console.log(table);

            })
            // Code to run if the request fails; the raw request and
            // status codes are passed to the function
            .fail(function (xhr, status, errorThrown) {
                // alert( "Sorry, there was a problem!" );
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                console.dir(xhr);
            })
            // Code to run regardless of success or failure;
            .always(function (xhr, status) {
                console.log("The request is complete!");
            });
    });

    



});