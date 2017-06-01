$(function () {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
    if (navigator.userAgent.search("MSIE") >= 0 || navigator.userAgent.search("Trident/") >= 0) {
        $("#toTop").css({
            right: "25px"
        });
    }
    $('#googlemap').gmap3({
        marker: {
            address: "Višnjićeva 5, Beograd" // Your Adress Here
        }
        , map: {
            options: {
                scrollwheel: false
                , zoom: 16
                , mapTypeId: google.maps.MapTypeId.ROADMAP
            }
        }
    });
    window.onscroll = function () {
        if (document.documentElement.scrollTop >= $('#map').offset().top - 200 || document.body.scrollTop >= $("#map").offset().top - 100) {
            $("#map").animate({
                opacity: "1"
                , marginTop: "0%"
            }, 1000);
            $(".map-h1").delay(1000).animate({
                opacity: "1"
                , marginLeft: "0%"
            }, 1500);
        }
        if (document.documentElement.scrollTop >= $('#contact').offset().top - 100 || document.body.scrollTop >= $("#contact").offset().top - 100) {
            $("#contact").animate({
                opacity: "1"
            }, 1500);
            $(".background_gray_con").delay(1000).animate({
                opacity: "1"
            }, 2500);
            $(".contact-h1").addClass("contact-h1-anim");
            $(".contact_side h1").delay(2500).animate({
                opacity: "1"
                , marginLeft: "0%"
            });
            $(".mail-h1").addClass("mail-h1-anim");
            $(".contact_form").delay(3000).animate({
                opacity: "1"
            }, 1000);
            $(".contact_detail").delay(3300).animate({
                opacity: "1"
                , marginTop: "0"
            }, 1000);
        }
    }

    function validateEmail($email) {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailReg.test($email);
    }

    function sendEmail(data) {
        $(".empty-fields").removeClass("empty-fields-show");
        $(".validate-email").removeClass("empty-fields-show");
        if (data.name === "" || data.subject === "" || data.message === "" || data.email === "") {
            $(".empty-fields").addClass("empty-fields-show");
            $(".empty-fields").removeClass("empty-fields-hide");
            if (validateEmail(data.email) && data.email === "") {
                $(".validate-mail").removeClass("empty-fields-show");
                $(".validate-mail").addClass("empty-fields-hide");
            } else {
                $(".validate-mail").addClass("empty-fields-hide");
            }
            return false;
        }
        else {
            $(".empty-fields").addClass("empty-fields-hide");
        }
        if (!validateEmail(data.email)) {
            $(".validate-mail").addClass("empty-fields-show");
            $(".validate-mail").removeClass("empty-fields-hide");
            return false;
        }
        else {
            $(".validate-mail").addClass("empty-fields-hide");
        }
        $.ajax({
            type: 'POST', //Method type
            url: '/', //Your form processing file URL
            data: JSON.stringify(data), //Forms name
            dataType: 'json'
            , contentType: 'application/json'
            , success: function (data) {
                $(".message-sent").animate({
                    opacity: "1"
                }, 2000);
                $(".field-name").val('');
                $(".email_field").val('');
                $(".subject_field").val('');
                $(".comment_field").val('');
            }
            , error: function (error) {}
        });
    }
    $(".submit-form").on("click", function (e) {
        e.preventDefault();
        var data = {};
        data.name = $(".field-name").val();
        data.email = $(".email_field").val();
        data.subject = $(".subject_field").val();
        data.message = $(".comment_field").val();
        sendEmail(data);
        setTimeout(function () {
            $(".message-sent").animate({
                opacity: "0"
            }, 1500);
        }, 3000);
    });
});