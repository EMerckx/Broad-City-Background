var $interval;

$(document).ready ( function() {
    $("#canvas").empty();
    clearTimeout($interval);
    buildPage();
});
/*
$( window ).resize(function() {
    $("#canvas").empty();
    clearTimeout($interval);
    buildPage();
});*/

// FUNCTIONS
function buildPage() {
    var $file = "resources/data/colors.json";

    $.getJSON( $file, function($data) {

        // Get the colors from the JSON file
        var $colors = [];
        $.each( $data, function( $key, $val ){
            //console.log($val);
            $.each( $val[0].codes, function($key2, $val2){
                $colors.push($val2)
            });
        });

        // Draw the rectangles
        var $canvas_width = $( "#canvas" ).width();
        var $shape_width = 100;
        var $amount_colors = $colors.length;
        var $amount_rectangles = $canvas_width/$shape_width;

        for(var $i=0; $i<$amount_rectangles; $i++) {
            var $color_number = $i % $amount_colors;
            var $id = "color" + $color_number;
            var $new_section = "<section class=\"shape " + $id + "\"></section";
            $("#canvas").append($new_section);

            $("." + $id).css({
                "left": $i,
                "width": $shape_width,
                "background-color": $colors[$color_number]
            });
        }

        // Set timeout for animation: change colors
        $interval = setTimeout(function(){
            change_colors($colors, $amount_colors - 1);
        }, 100);
    });
}

// Changes the color of each shape
function change_colors($colors, $start_index){
    var $size = $colors.length;
    for(var $i=0; $i<$size; $i++){
        var $color_number = ($i + $start_index) % $size;
        var $id = "color" + $i;

        $("." + $id).css({
            "background-color": $colors[$color_number]
        });
    }

    $interval = setTimeout(function(){
        change_colors($colors, ($start_index + $size - 1) % $size );
    }, 100);
}
