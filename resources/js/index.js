$(document).ready ( function() {
    var $file = "resources/data/colors.json";

    // get the colors
    var $getColors = $.getJSON( $file, function($data) {

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
    });
});