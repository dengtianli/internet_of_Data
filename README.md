# 
-----

## Installation and deployment
1. git clone https://github.com/dengtianli/internet_of_Data.git
2. cd internet_of_Data
3. npm Install
4. gulp 
5. Open browser http://localhost:8009

-----

## gulpfile.js 插件说明
首先要确保pc上装有node，然后在global环境和项目文件中都install gulp
npm install gulp -g   (global环境)
npm install gulp --save-dev (项目环境)
在项目中install需要的gulp插件，一般只压缩的话需要
npm install gulp-minify-css gulp-concat gulp-uglify gulp-rename del --save-dev
更多插件可以在这个链接中找到 http://gratimax.net/search-gulp-plugins/

在项目的根目录新建gulpfile.js，require需要的module
var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del');

压缩css
gulp.task('minifycss', function() {
    return gulp.src('src/*.css')      //压缩的文件
        .pipe(gulp.dest('minified/css'))   //输出文件夹
        .pipe(minifycss());   //执行压缩
});

压缩js
gulp.task('minifyjs', function() {
    return gulp.src('src/*.js')
        .pipe(concat('main.js'))    //合并所有js到main.js
        .pipe(gulp.dest('minified/js'))    //输出main.js到文件夹
        .pipe(rename({suffix: '.min'}))   //rename压缩后的文件名
        .pipe(uglify())    //压缩
        .pipe(gulp.dest('minified/js'));  //输出
});

执行压缩前，先删除文件夹里的内容
gulp.task('clean', function(cb) {
    del(['minified/css', 'minified/js'], cb)
});

默认命令，在cmd中输入gulp后，执行的就是这个命令
gulp.task('default', ['clean'], function() {
    gulp.start('minifycss', 'minifyjs');
});

 require() 是 node （CommonJS）中获取模块的语法。
在 gulp 中你只需要理解 require() 可以获取模块。

gulp-connect浏览器自动刷新
　　LiveReload可以理解为即时刷新，在前端开发中，开发者在编写或调试html/js/css代码后需要从编辑器切换到浏览器，再刷新浏览器才能看到页面变化，这种频繁的操作在一定程度上影响了工作效率，而LiveReload可以帮助我们解决了这个问题。
　　实现原理：通过在本地开启一个websocket服务，检测文件变化，当文件被修改后触发livereload任务，推送消息给浏览器刷新页面。
　　安装gulp-connect插件
　　npm install gulp-connect
　　配置代码🌰：　
var gulp = require('gulp'),
  connect = require('gulp-connect');
 
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});
 
gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});
 
gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], ['html']);
});
 
gulp.task('default', ['connect', 'watch']);
 

相同功能
// Reload Static Server
gulp.task('livereload', ['sass'], function() {
gulp.src('./client/**/*.*')
.pipe(connect.reload());
});
// Watch Client
gulp.task('watch', function() {
gulp.watch(['./client/scss/**/*.*', './client/*.html'], ['livereload']);
})
1 //定义依赖和插件
 2 var gulp = require('gulp'),

 3     uglify = require('gulp-uglify'),

 4     concat = require('gulp-concat'),

 5     rename = require('gulp-rename'),

 6     connect = require('gulp-connect');//livereload
 7
 8 var jsSrc = 'src/js/*.js';

 9 var jsDist = 'dist/js';

10
11 var htmlSrc = 'src/*.html';

12 var htmlDist = 'dist';

13
14 //定义名为js的任务
15 gulp.task('js', function () {

16
17     gulp.src(jsSrc)

18         .pipe(concat('main.js'))

19         .pipe(gulp.dest(jsDist))

20         .pipe(rename({suffix: '.min'}))

21         .pipe(uglify())

22         .pipe(gulp.dest(jsDist))

23         .pipe(connect.reload())

24
25 });

26
27 //定义html任务
28 gulp.task('html', function () {

29
30     gulp.src(htmlSrc)

31         .pipe(gulp.dest(htmlDist))

32         .pipe(connect.reload());

33
34 });

35
36 //定义livereload任务
37 gulp.task('connect', function () {

38     connect.server({

39         livereload: true
40     });

41 });

42
43
44 //定义看守任务
45 gulp.task('watch', function () {

46
47     gulp.watch('src/*.html', ['html']);

48
49     gulp.watch('src/js/*.js', ['js']);

50
51 });

52
53
54 //定义默认任务
55 gulp.task('default', [ 'js', 'html','watch', 'connect']);

用gulp-livereload实现浏览器自动刷新页面

       1、使用 gulp-livereload 需要使用 chrome 浏览器，并且安装 gulp-livereload 插件；
       2、在 gulpfile.js 中创建task， 旧版使用var server = livereload();已经失效，需要使用 livereload.listen(); ；
       3、使用 gulp-livereload 需要使用到服务器，在服务器下进行访问，开启 gulp-livereload 插件；（当然也可以使用 npm 安装 http-server 来启动服务）
gulpfile.js 如下：
var gulp = require('gulp'),  
    livereload = require('gulp-livereload');  
  
gulp.task('watch', function() { //这里的watch，是自定义的，携程live或者别的也行  
    livereload.listen();//这里需要注意！旧版使用var server = livereload();已经失效    
    // app/**/*.* 的意思是 app 文件夹下的 任何文件夹 的 任何文件  
    gulp.watch('app/**/*.*', function(event) {  
        livereload.changed(event.path);  
    });  
});  
gulp合并插件 
var concat = require(‘gulp-concat’); //引用 
gulp.src([这里写上js]).pipe(concat(‘xxx.js’)).pipe(gulp.dest(‘目录’))
1.编辑gulpfile.js
var gp = require('gulp');

var concat = require('gulp-concat');


gp.task("taskName",function(){
    // 把1.js和2.js合并为main.js，输出到dest/js目录下
    gp.src(['1.js','2.js']).pipe(concat('main.js')).pipe(gp.dest('./dest/js'));
}
})
2.执行gulp任务
gulp taskName

第二个插件：压缩插件 
安装：npm install gulp-uglify --save-dev 
var uglify = require(‘gulp-uglify’); 
uglify()即可，参数都不要
同样是编辑gulpfile.js
var gp = require('gulp');

var concat = require('gulp-concat');

var uglify = require('gulp-uglify');
g
gp.task("taskName",function(){
    // 把1.js和2.js合并压缩为main.js，输出到dest/js目录下
    gp.src(['1.js','2.js']).pipe(concat('main.js')).pipe(uglify()).pipe(gp.dest('./dest/js'));
}
})
执行这个任务后会生成压缩版的main.js
    gulpif = require('gulp-if'),
 
    minifyCss = require('gulp-minify-css');


var gulp = require('gulp'),
 
    useref = require('gulp-useref'),
 
    gulpif = require('gulp-if'),
 
    uglify = require('gulp-uglify'),
 
    minifyCss = require('gulp-minify-css');



g
gulp.task('html', function () {
 
    return gulp.src('app/*.html')
 
        .pipe(useref())
 
        .pipe(gulpif('*.js', uglify()))
 
        .pipe(gulpif('*.css', minifyCss()))
 
        .pipe(gulp.dest('dist'));
}
});
Browsersync 浏览器同步测试工具
var browserSync = require('browser-sync');

一、新建一个 gulpfile.js 文件
chapter2
�
└── gulpfile.js


二、在 gulpfile.js 中编写代码
// 获取 gulp
var gulp = require('gulp')


require() 是 node （CommonJS）中获取模块的语法。
在 gulp 中你只需要理解 require() 可以获取模块。

三、获取 gulp-uglify 组件
// 获取 uglify 模块（用于压缩 JS）
var uglify = require('gulp-uglify')



四、创建压缩任务
// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
g
gulp.task('script', function() {
 
    // 1\. 找到文件
    gulp.src('js/*.js')
 
    // 2\. 压缩文件
        .pipe(uglify())
 
    // 3\. 另存压缩后的文件
        .pipe(gulp.dest('dist/js'))
}
})


gulp.task(name, fn) - 定义任务，第一个参数是任务名，第二个参数是任务内容。
gulp.src(path) - 选择文件，传入参数是文件路径。
gulp.dest(path) - 输出文件
gulp.pipe() - 管道，你可以暂时将 pipe 理解为将操作加入执行队列
五、跳转至 gulpfile.js 所在目录
打开命令行使用 cd 命令跳转至 gulpfile.js 文件所在目录。
例如我的 gulpfile.js 文件保存在 C:\gulp-book\demo\chapter2\gulpfile.js。
那么就需要在命令行输入
cd C:\gulp-book\demo\chapter2


Mac 用户可使用 cd Documents/gulp-book/demo/chapter2/ 跳转

六、使用命令行运行 script 任务
在控制台输入 gulp 任务名 可运行任务，此处我们输入 gulp script 回车。
注意：输入 gulp script 后命令行将会提示错误信息
// 在命令行输入
g
gulp script



E
Error: Cannot find module 'gulp-uglify'
    at Function.Module._resolveFilename (module.js:338:15)
 
    at Function.Module._load (module.js:280:25)


Cannot find module 'gulp-uglify' 没有找到 gulp-uglify 模块。

七、安装 gulp-uglify 模块
因为我们并没有安装 gulp-uglify 模块到本地，所以找不到此模块。
使用 npm 安装 gulp-uglify 到本地
npm install gulp-uglify


安装成功后你会看到如下信息：
gulp-uglify@1.1.0 node_modules/gulp-uglify
�
├── deepmerge@0.2.7
�
├── uglify-js@2.4.16 (uglify-to-browserify@1.0.2, async@0.2.10, source-map@0.1.34, optimist@0.3.7)
�
├── vinyl-sourcemaps-apply@0.1.4 (source-map@0.1.43)
�
├── through2@0.6.3 (xtend@4.0.0, readable-stream@1.0.33)
�
└── gulp-util@3.0.4 (array-differ@1.0.0, beeper@1.0.0, array-uniq@1.0.2, object-assign@2.0.0, lodash._reinterpolate@3.0.0, lodash._reescape@3.0.0, lodash._reevaluate@3.0.0, replace-ext@0.0.1, minimist@1.1.1, chalk@1.0.0, lodash.template@3.3.2, vinyl@0.4.6, multipipe@0.1.2, dateformat@1.0.11)
c
chapter2 $


在你的文件夹中会新增一个 node_modules 文件夹，这里面存放着 npm 安装的模块。
目录结构：
├── gulpfile.js
�
└── node_modules
 
    └── gulp-uglify


接着输入 gulp script 执行任务
gulp script
[
[13:34:57] Using gulpfile ~/Documents/code/gulp-book/demo/chapter2/gulpfile.js
[
[13:34:57] Starting 'script'...
[
[13:34:57] Finished 'script' after 6.13 ms



八、编写 js 文件
我们发现 gulp 没有进行任何压缩操作。因为没有js这个目录，也没有 js 目录下的 .js 后缀文件。
创建 a.js 文件，并编写如下内容
// a.js
function demo (msg) {
 
    alert('--------\r\n' + msg + '\r\n--------')
}
}



d
demo('Hi')


目录结构：
├── gulpfile.js
�
├──  js
�
│ └── a.js
�
└── node_modules
 
    └── gulp-uglify


接着在命令行输入 gulp script 执行任务
gulp 会在命令行当前目录下创建 dist/js/ 文件夹，并创建压缩后的 a.js 文件。
目录结构：
├── gulpfile.js
�
├──  js
�
│ └── a.js
�
├──  dist
�
│ └── js
�
│     └── a.js
�
└── node_modules
 
    └── gulp-uglify


dist/js/a.js
function demo(n){alert("--------\r\n"+n+"\r\n--------")}demo("Hi");



九、检测代码修改自动执行任务
js/a.js一旦有修改 就必须重新在命令行输入 gulp script ，这很麻烦。
可以使用 gulp.watch(src, fn) 检测指定目录下文件的修改后执行任务。
在 gulpfile.js 中编写如下代码：
// 监听文件修改，当文件被修改则执行 script 任务
gulp.watch('js/*.js', ['script']);


但是没有命令可以运行 gulp.watch()，需要将 gulp.watch() 包含在一个任务中。
// 在命令行使用 gulp auto 启动此任务
g
gulp.task('auto', function () {
 
    // 监听文件修改，当文件被修改则执行 script 任务
    gulp.watch('js/*.js', ['script'])
}
})


接在在命令行输入 gulp auto，自动监听 js/*.js 文件的修改后压缩js。
$gulp auto
[
[21:09:45] Using gulpfile ~/Documents/code/gulp-book/demo/chapter2/gulpfile.js
[
[21:09:45] Starting 'auto'...
[
[21:09:45] Finished 'auto' after 9.19 ms


此时修改 js/a.js 中的代码并保存。命令行将会出现提示，表示检测到文件修改并压缩文件。
[21:11:01] Starting 'script'...
[
[21:11:01] Finished 'script' after 2.85 ms


至此，我们完成了 gulp 压缩 js 文件的自动化代码编写。
**注意：**使用 gulp.watch 后你的命令行会进入“运行”状态，此时你不可以在命令行进行其他操作。可通过 Ctrl + C 停止 gulp。
Mac 下使用 control + C 停止 gulp
十、使用 gulp.task(‘default’, fn) 定义默认任务
增加如下代码
gulp.task('default', ['script', 'auto']);


此时你可以在命令行直接输入 gulp +回车，运行 script 和 auto 任务。
最终代码如下：
// 获取 gulp
var gulp = require('gulp')



// 获取 uglify 模块（用于压缩 JS）
var uglify = require('gulp-uglify')



// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
g
gulp.task('script', function() {
 
    // 1. 找到文件
    gulp.src('js/*.js')
 
    // 2. 压缩文件
        .pipe(uglify())
 
    // 3. 另存压缩后的文件
        .pipe(gulp.dest('dist/js'))
}
})



// 在命令行使用 gulp auto 启动此任务
g
gulp.task('auto', function () {
 
    // 监听文件修改，当文件被修改则执行 script 任务
    gulp.watch('js/*.js', ['script'])
}
})



// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 script 任务和 auto 任务
g
gulp.task('default', ['script', 'auto'])
