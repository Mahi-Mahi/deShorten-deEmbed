module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

    nodemon: {
      prod: {
        options: {
          file: 'web.js',
          args: ['developments'],
          ignoredFiles: ['README.md', 'node_modules/**'],
          watchedExtensions: ['js', 'coffee'],
          // watchedFolders: ['test', 'tasks'],
          debug: true,
          delayTime: 1,
          cwd: __dirname
        }
      },
      exec: {
        options: {
          exec: 'less'
        }
      }
    },

    concurrent: {
      target: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    watch: {
      test: {
        files: '**.js',
        tasks: ['mochaTest'],
        options: {
          debounceDelay: 1000,
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/*.js']
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-mocha-test');

  // Default task(s).
  grunt.registerTask('default', ['concurrent']);

};