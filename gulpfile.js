var path        = require("path");
var del         = require("del");
var merge       = require('merge2');
var tslint      = require("tslint");
var gulp        = require("gulp");
var gulpTs      = require("gulp-typescript");
var gulpTslint  = require("gulp-tslint");

var srcDir = "src";
var srcFiles = srcDir + "/**/*.ts";
var copyFiles = srcDir + "/**/*.html";
var distDir = "dist";
var typesDir = "types";
var watching = false;

function handleError() {
    if (watching) this.emit("end");
    else process.exit(1);
}

// Set watching
gulp.task("setWatch", function() {
    watching = true;
});

// Clear built directories
gulp.task("clean", function() {
    return del([distDir, typesDir]);
});

// Lint the source
gulp.task("lint", function() {
    var program = tslint.Linter.createProgram("./");

    gulp.src(srcFiles)
    .pipe(gulpTslint({
        program: program,
        formatter: "stylish"
    }))
    .pipe(gulpTslint.report({
        emitError: !watching
    }))
});

// Copy HTML
gulp.task("copy", ["clean"], function() {
    return gulp.src(copyFiles)
    .pipe(gulp.dest(distDir))
    .on("error", handleError);
});

// Build TypeScript source into CommonJS Node modules
gulp.task("compile", ["copy"], function() {
    var tsResult = gulp.src(srcFiles)
    .pipe(gulpTs({
        target: "es5",
        module: "commonjs",        
        alwaysStrict: true,
        noEmitOnError: true,
        noUnusedLocals: true,
        declaration: true,
        noUnusedParameters: true
    }))
    .on("error", handleError);

    return merge([
        tsResult.dts.pipe(gulp.dest(typesDir)),
        tsResult.js.pipe(gulp.dest(distDir))
    ]);
});

gulp.task("move", ["compile"], function () {
    gulp.src("dist/**/*.*")
        .pipe(gulp.dest('../../.node-red/nodes'));
})

gulp.task("watch", ["setWatch", "default"], function() {
    gulp.watch([srcFiles, copyFiles], ["default"]);
});

gulp.task("default", ["lint", "compile"]);

gulp.task("local", ["lint", "move"]);
