module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: false
      },
      dev: {
        files: {
          'public/javascripts/script.min.js': ['public/vendor/codemirror/lib/codemirror.js', 'public/vendor/codemirror/addon/mode/loadmode.js']
        }
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'public/stylesheets/style..min.css': [
            'public/scss/style.scss',
            'public/vendor/codemirror/lib/codemirror.css',
            'public/vendor/codemirror/theme/solarized.css'
          ]
        }
      },
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          'public/stylesheets/style.css': [
            'public/vendor/codemirror/lib/codemirror.css',
            'public/vendor/codemirror/theme/solarized.css',
            'public/scss/style.scss'
          ]
        }
      }
    },

    watch: {
      scripts: {
        files: ['public/scss/*.scss', 'public/javascripts/style.js'],
        tasks: ['sass:dev', 'sass:dist', 'uglify'],
        options: {
          interrupt: true
        }
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'sass:dev']);

};



  // clientcss.addFile("/public/stylesheets/style.css");
  // clientcss.addFile("/public/vendor/codemirror/lib/codemirror.css");
  // clientcss.addFile("/public/vendor/codemirror/theme/solarized.css");
  // clientcss.addFile("http://fonts.googleapis.com/css?family=Source+Code+Pro");

  // clientjs.addUrl("/public/vendor/codemirror/lib/codemirror.js");
  // clientjs.addUrl("/public/vendor/codemirror/addon/mode/loadmode.js");