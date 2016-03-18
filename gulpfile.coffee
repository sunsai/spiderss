gulp = require('gulp')
nodemon = require('gulp-nodemon')
sass = require('gulp-ruby-sass')
del = require('del')
runsequence = require('run-sequence')
browsersync = require('browser-sync')

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
gulp.task('miniCSS', ->
  console.log('this is miniCSS task.............')
)
gulp.task('miniHTML', ->
  console.log('this is miniHTML task.............')
)
gulp.task('build', (callback)->
  runsequence(['miniJS', 'miniCSS', 'miniHTML'], callback)
)
gulp.task('develop', ->
  nodemon({
    script: 'bin/www'
    ext: 'js ejs coffee html'
    tasks: ['build']
  })
)
gulp.task('browsync', ->
  browsersync({
    proxy: 'localhost:8800'
  })
)
gulp.task('watch', ->
  gulp.watch(['./../*.{css,js,ejs,coffee}'], 'reload')
)
gulp.task('reload', (callback)->
  runsequence(['develop'], ['browsync'], ['bsreload'], callback)
)
gulp.task('bsreload', ->
  browsersync.reload()
)
