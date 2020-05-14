// Gulp.js configuration
//'use strict';

  //Import gulp and its plugins
  const { watch, series } = require('gulp'); 
  gulp          = require('gulp'); 
  stripdebug    = require('gulp-strip-debug');
  stripcode     = require('gulp-strip-code');
  rename        = require('gulp-rename');
  babel         = require('gulp-babel');
  uglify        = require('gulp-uglify');
  log           = require('fancy-log');

const paths = {
  src   : 'src/',
  dest  : 'build/',
  js    : 'assets/js/'
}

const taskminifyJs = {
  src             : paths.src + paths.js + '**/*-4debugging.js',
  exclude         : '**/temp/**'
  dest            : paths.dest + paths.js,
  renameFind      : '-4debugging',
  renameReplace   : '',
  renameExtension : '.min.js',
  stripDebugStart : 'DebugOnlyCode - START',
  stripDebugEnd   : 'DebugOnlyCode - START',
};

function renameFn( path, settings ) {
   //path.dirname += "/ciao";
  oldFileName = path.basename+path.extname;
  path.basename = path.basename.replace(settings.renameFind, settings.renameReplace);
  path.extname = settings.renameExtension;
  log('Renaming: '+oldFileName+' --> '+path.basename+path.extname );
}

function minifyJs( settings ) {
  return gulp.src( settings.src, '!'+exclude, {base:'.'} )
    .pipe( rename( function ( path ) { renameFn( path, settings ) } ) )
    .pipe( stripdebug() )
    .pipe( stripcode( {
      start_comment: settings.stripDebugStart,
      end_comment: settings.stripDebugEnd
    } ) )
    .on( 'end', function() { log( 'Stripped Debug' ); } )
    .pipe( babel( { presets: ['@babel/env'] } ) )
    .pipe( uglify() )
    .on( 'end', function() { log( 'Converted to ES5 and Uglified' ); } )
    .pipe( gulp.dest( settings.dest) )
    .on( 'end', function(){ log('Finished'); } );
}


// JavaScript processing
gulp.task('minifyJs', () => {
  return minifyJs( taskminifyJs );
});


exports.default = function() {
  // You can use a single task
  watch(taskminifyJs.src, { ignoreInitial: false }, gulp.series('minifyJs') );
};



/*
  // Gulp and plugins
  gulp          = require('gulp'),
  gutil         = require('gulp-util'),
  newer         = require('gulp-newer'),
  imagemin      = require('gulp-imagemin'),
  sass          = require('gulp-sass'),
  postcss       = require('gulp-postcss'),
  deporder      = require('gulp-deporder'),
  concat        = require('gulp-concat'),
  stripdebug    = require('gulp-strip-debug'),
  uglify        = require('gulp-uglify')
;

// Browser-sync
var browsersync = false;


// PHP settings
const php = {
  src           : dir.src + 'template/** [SLASH] *.php',
  build         : dir.build
};

// copy PHP files
gulp.task('php', () => {
  return gulp.src(php.src)
    .pipe(newer(php.build))
    .pipe(gulp.dest(php.build));
});
*/