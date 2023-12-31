// produce random integer between the min and max
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// fetch data from google forms/spreadsheet
fetch("https://opensheet.elk.sh/1CHWYkcFNFZG92hvjZmunpM5UOdkk9rSLOiYfXRx46vA/birds")
    .then((res) => res.json())
    .then((data) => {
        data.forEach(function(row, index) {
            if (index == 0) return;

            let div = $(`<div class='bird' data-type='` + row.type + `' index="` + index + `">
        <span class='emoji'>` + row.bird + `</span>
        <p>` + row.msg + `</p>
        </div>`)
                .attr("title", row.msg)
                .css("top", getRandomInt(0, 80) + "%")
                .css("left", getRandomInt(0, 90) + "%")
                .appendTo("#birds");
        });
    });

// listen for radio button changes
$("input[name='filter-button']").on("change", function() {
    let to_filter = $(this).val();

    if (to_filter === "all") {
        $("#birds .bird").show();
    } else {
        // Hide all birds first
        $("#birds .bird").hide();

        // Show birds of the selected type
        $(".bird[data-type='" + to_filter + "']").show();
    }
});

// look at a bird
$("#birds").on("click", ".bird", function () {
    // get information from bird
    let index = $(this).attr("index");
    let symbol = $(this).find(".emoji").text();
    let msg = $(this).find("p").text();

    $("#look .bird .emoji").text(symbol);
    $("#look .bird p").text(msg);

    $("#look").show();

    // mark bird as seen
    $("#birds .bird[index='" + index + "']").attr("seen", "");

    $("#filter").addClass("hidden-filter");
});

// hide when button is clicked
$("#look").on("click", "button[hide]", function () {
    $("#look").hide();

    $("#filter").removeClass("hidden-filter");
});

// show filter, header, and birds when the page loads
$(document).ready(function() {
    $("#filter").show();
    $("header").show();
    $("#birds").show();
});
