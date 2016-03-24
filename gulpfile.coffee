gulp = require('gulp')
nodemon = require('gulp-nodemon')
del = require('del')
runsequence = require('run-sequence')
browsersync = require('browser-sync')
rename = require('gulp-rename')

gulp.task('default', (callback)->
  runsequence(['clean'], ['develop'], ['browsync', 'watch'], callback)
)
gulp.task('clean', (callback)->
  console.log('this is a clean task!....................')
  callback()
)
gulp.task('miniJS', ->
  console.log('this is miniJS task.............')
)
gulp.task('miniCoffee', ->
#  gulp.src('./spiders/real.coffee')
#  .pipe(rename('./spiders/api.coffee'))
#  .pipe(gulp.dest('./'))
  console.log('copy coffe files.............')
)
gulp.task('miniCSS', ->
  console.log('this is miniCSS task.............')
)
gulp.task('miniHTML', ->
  console.log('this is miniHTML task.............')
)
gulp.task('build', (callback)->
  runsequence(['clean'], ['miniJS', 'miniCSS', 'miniHTML', 'miniCoffee'], callback)
)
gulp.task('develop', (callback) ->
  nodemon({
    script: 'bin/www'
    ext: 'js ejs coffee html'
    tasks: ['build']
  })
  callback()
)
gulp.task('browsync', ->
  browsersync({
    proxy: 'http://localhost:3000'
    port: 8800
    notify: true
  })
)
gulp.task('watch', ->
  gulp.watch(['./routes/**/*.*', './spiders/**/*.*', './views/**/*.*', './public/**/*.*'], ['reload'])
)
gulp.task('reload', (callback)->
  runsequence(['bsreload'], callback)
)
gulp.task('bsreload', ->
  browsersync.reload()
)
