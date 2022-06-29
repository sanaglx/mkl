$(".mod-owl").owlCarousel({
    //center:true,
    stagePadding: 0,
    loop: true,
    items: 1,
    margin: 20,
    //autoplay: true,
    dots: false,
    nav: true,
    navText: ["<i class='news-str-left' aria-hidden='true'><img src='img/ico/left.svg'></i>",
        "<i class='news-str-right' aria-hidden='true'><img src='img/ico/right.svg'></i>"],
    responsive: {
        0: {

        },
        768: {
            items: 2
        },
        1200: {
            items: 3
        }

    }
});

$(".burger").click(function () {
    let bu = $(this)
    let a = $(this).parent()
    console.log(bu)
    if (!bu.hasClass("active")) {
        bu.addClass('active')
        a.addClass('active')
    } else {
        bu.removeClass('active')
        a.removeClass('active')
    }
})


/*****всплывающие подсказки********** */

$(".tchk1 a").each(function (b) {
    //работа с элементом (ссылка)
    if (this.title) {
        var c = this.title;
        var x = 0;//расположение по горизонтали(left)
        var y = 35;//расположение по вертикали (top)
        $(this).mouseover(function (d) {
            this.title = "";
            $("body").append('<div id="tooltip">' + c + "</div>");
            $("#tooltip").css({
                left: (d.pageX + x) + "px",
                top: (d.pageY + y) + "px",
                opacity: "0.8"//полупрозрачность
            }).show(300)//скорость появления подсказки
        }).mouseout(function () {
            this.title = c;
            $("#tooltip").remove()
        }).mousemove(function (d) {
            $("#tooltip").css({
                left: (d.pageX + x) + "px",
                top: (d.pageY + y) + "px"
            })
        })
    }
})



/****modal window******** */

$('body').on('click', '.close', function () {
    $('.modal').hide()
    $('body').removeClass('modal-active')
    $('.inp').removeClass('invalid')
    $('inp').removeClass('invalid')
    return false
})

$('body').on('click', '.galery__item', function () {
    let a = $(this).prop('id')
    $('.' + a).show();
    $('body').addClass('modal-active');
    return false
})

$('body').on('click', '.modal3v', function () {
    let a = $(this).parents('.gb-item').prop('id')
    $('.' + a).show();
    $('body').addClass('modal-active');
    return false
})

$('body').on('click', '#modal-t', function () {
    $('.modal11').show();
    $('body').addClass('modal-active');
    return false
})

$('body').on('click', '.modal1v', function () {
    $('.modal-1').show();
    $('body').addClass('modal-active');
    return false
})

// $('.modal3v').click(function(){
//     var buttonId = $(this).attr('id');
//     $('#modal-container').removeAttr('class').addClass(buttonId);
//     $('body').addClass('modal-active');
//     return false
//   })

//   $('#modal-container').click(function(){
//     $(this).addClass('out');
//     $('body').removeClass('modal-active');
//     return false
//   });


/**** */ 

 function validateFormx(a,f) {
    $(f).each(function(){
        $(this).removeClass('invalid')
        $(this).parent().removeClass('invalid')
        console.log($(this))
        if($(this).val()==""){
            $(this).addClass('invalid')
            $(this).parent().addClass('invalid')
            console.log('1')
        }
    })
 }

$('body').on('click','.btn-form',function () {
    let a = $(this)
    let f = $(this).parents('form').find('input')
    validateFormx(a,f)
   return false

})

/***телефон */

document.addEventListener("DOMContentLoaded", function () {
    var phoneInputs = document.querySelectorAll('input[data-tel-input]');

    var getInputNumbersValue = function (input) {
        // Return stripped input value — just numbers
        return input.value.replace(/\D/g, '');
    }

    var onPhonePaste = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input);
        var pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            var pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
                // formatting will be in onPhoneInput handler
                input.value = inputNumbersValue;
                return;
            }
        }
    }

    var onPhoneInput = function (e) {
        var input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            selectionStart = input.selectionStart,
            formattedInputValue = "";

        if (!inputNumbersValue) {
            return input.value = "";
        }

        if (input.value.length != selectionStart) {
            // Editing in the middle of input, not last symbol
            if (e.data && /\D/g.test(e.data)) {
                // Attempt to input non-numeric symbol
                input.value = inputNumbersValue;
            }
            return;
        }

        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
            }
        } else {
            formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
        }
        input.value = formattedInputValue;
    }
    var onPhoneKeyDown = function (e) {
        // Clear input after remove last symbol
        var inputValue = e.target.value.replace(/\D/g, '');
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = "";
        }
    }
    for (var phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    }
})

/******форма табы********** */
var currentTab = 0;
showTab(currentTab);

function showTab(n) {
    var x = document.getElementsByClassName("tab");
    //console.log(x);
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
        y[i].classList.remove('invalid');
        y[i].parentNode.classList.remove('invalid');
        if (y[i].value == "") {
           // console.log(y[i].parentNode);
            y[i].className += " invalid";
            y[i].parentNode.className += " invalid";
            valid = false;
        } else if (y[i].value == "invalid") {


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