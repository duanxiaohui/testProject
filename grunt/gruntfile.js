//wrapper函数
module.exports = function(grunt){
    //读取package.json
    grunt.file.readJSON('package.json');
    //初始化Grunt
    grunt.initConfig({
        //读取package.json文件
        pkg: grunt.file.readJSON('package.json'),
        // Metadata.
        meta: {
            basePath: '/',
            srcPath: 'static/sass/',
            deployPath: 'static/css/',
            jsPath:'../web/js/',
            jsDeployPath:'../web/js/dist/',
            imgSrc:'static/imgSrc/',
            imgDeploy:'static/imgDest/'
        },
        //压缩js
		uglify: {
			//文件头部输出信息
			options: {
				banner: '/*! 365 Calendar BBS <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			bbs: {
		        files: {
		            '<%= meta.jsDeployPath %>bbs.js':['<%= meta.jsPath %>bbs/*.js']
		        }
		    }
		},
		concat: {
	      options: {
	        separator: ';'
	      },
	      dist: {
	        src: ['../web/js/bbs/*.js'],
	        dest: '../web/js/dist/bbs.js'
	      }
	    },
		requirejs: {
		  compile: {
		      options: {
					baseUrl:"../web/js/",
					mainConfigFile: "../web/js/rebuild/base/calendar_bootstrap.js",
					name:"rebuild/base/calendar_bootstrap",
					out: "../web/js/dist/calendar.js"
			  }
		  }
	    },
		htmlmin: {                                     // Task
		    dist: {                                      // Target
		      options: {                                 // Target options
		        removeComments: true,
		        collapseWhitespace: true
		      },
		      files: {                                   // Dictionary of files
		        'index.html': 'indexsrc.html'
		      }
		    },
		    dev: {                                       // Another target
		      files: {
		        'index.html': 'indexsrc.html'
		      }
		    }
		},
        //监测文件
        watch: {
            scripts: {
                files: [
                    '<%= meta.jsPath %>/rebuild/**/*.js'
                ],
                tasks: ['requirejs']
            }
        }
    });

    //加载任务
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-requirejs');

    //创建默认任务
    grunt.registerTask('default',['requirejs']);

    //创建发布任务
    grunt.registerTask('dist',[
    	'concat',
        'uglify'
    ]);
};
