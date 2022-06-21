$(".burger").click(function () {
    let bu = $(this)
    let a = $(this).parent()
    console.log(bu)
    if(!bu.hasClass("active")){
        bu.addClass('active')
        a.addClass('active')
    }else{
        bu.removeClass('active')
        a.removeClass('active')
    }
})


/*****всплывающие подсказки********** */

$(".tchk1 a").each(function(b) {
    //работа с элементом (ссылка)
    if (this.title) {
        var c = this.title;
        var x = 0;//расположение по горизонтали(left)
        var y = 35;//расположение по вертикали (top)
        $(this).mouseover(function(d) {
            this.title = "";
            $("body").append('<div id="tooltip">' + c + "</div>");
            $("#tooltip").css({
                left: (d.pageX + x) + "px",
                top: (d.pageY + y) + "px",
                opacity: "0.8"//полупрозрачность
            }).show(300)//скорость появления подсказки
        }).mouseout(function() {
            this.title = c;
            $("#tooltip").remove()
        }).mousemove(function(d) {
            $("#tooltip").css({
                left: (d.pageX + x) + "px",
                top: (d.pageY + y) + "px"
            })
        })
    }
})

/******форма табы********** */
var currentTab = 0;
showTab(currentTab);

function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";

    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Отправить";
    } else {
        document.getElementById("nextBtn").innerHTML = "Далее";
    }
    fixStepIndicator(n)
}

function nextPrev(n) {
    var x = document.getElementsByClassName("tab");

    if (n == 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;

    if (currentTab >= x.length) {
        document.getElementById("regForm").submit();
        return false;
    }

    showTab(currentTab);
}

function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    for (i = 0; i < y.length; i++) {
        if (y[i].value == "") {
            y[i].className += " invalid";
            valid = false;
        }
    }
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";
}
