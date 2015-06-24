module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mochaTest: {
            all: {
                options: {
                    reporter: 'spec',
                    quiet: false
                },
                src: ['test/**/*.js']
            }
        },
        jshint: {
            files: [
                './**/*.js',
                '!./node_modules/**'
            ]
        },
        watch: {
            files: [
                './**/*.js',
                '!./node_modules/**'
            ],
            tasks: ['test']
        }
    });
    
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('test', [
        'jshint',
        'mochaTest'
    ]);
};