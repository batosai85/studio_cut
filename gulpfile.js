var gulp = require("gulp");
var $ = require("gulp-load-plugins")();


gulp.task("html-min", function () {
    const src = "./src/views/*.html"
    const dest = "./public";
    return gulp.src(src)
        .pipe($.htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(dest));

});

gulp.task("css-min", function () {

    const src = [
                     "./src/css/bootstrap.css", "./src/css/bootstrap-responsive.css",
                    "./src/css/base.css","./src/css/flexslider.css",
                     "./src/css/prettyPhoto.css", "./src/css/style.css",
                     "./src/css/sequence.css", "./src/css/YTPlayer.css",
                     "./src/css/font-awesome.min.css", "./src/css/studio.cut.css"
                 ];
    const dest = "./build/css"
    return gulp.src(src)
        .pipe($.sourcemaps.init())
        .pipe($.cssmin())
        .pipe($.concat("bundle.css"))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(dest));

});

gulp.task('js-min', function () {

    const src = [
        "./src/js/jquery.js", "./src/js/jquery.queryloader2.js",
        "./src/js/bootstrap.js", "./src/js/jquery.tipsy.js",
        "./src/js/jquery.easing.1.3.js", "./src/js/jquery.flexslider-min.js",
        "./src/js/superfish.js", "./src/js/custom.js",
        "./src/js/jquery.appear.min.js", "./src/js/jquery.countto.js",
        "./src/js/jquery.cycle.all.", "./src/js/modernizr.custom.js",
        "./src/js/jquery.fitvids.js", "./src/js/jquery.ui.totop.js",
        "./src/js/jquery.smoothscroll.js","./src/js/jquery.prettyPhoto.js", 
        "./src/js/jquery.nav.js", "./src/js/jquery.cbpQTRotator.min.js", 
        "./src/js/jquery.isotope.js","./src/js/jquery.mb.YTPlayer.js", 
        "./src/js/jquery.sequence.js", "./src/js/sequence_custom.js",
        "./src/js/gmap3.js", "./src/js/studio.cut.js"
                ];
    const dest = "./build/js";
    return gulp.src(src)
        .pipe($.sourcemaps.init())
        .pipe($.uglify())
        .pipe($.concat('bundle.js'))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(dest));

});


gulp.task('image-min', function () {

    const src = "./src/img/*.jpg";
    const dest = "./build/img";
    return gulp.src(src)
        .pipe($.imagemin())
        .pipe(gulp.dest(dest));

});
