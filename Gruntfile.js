'use strict'
var path = require('path');

module.exports = function(grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        config: {
            src: 'src',
            stage: '.tmp',
            dist: 'build'
        },
        env: {
            mock: { ENV: 'mock' },
            prod: { ENV: 'prod' }
        },
        preprocess: {
            index: {
                src: '<%= config.src %>/index.html.template',
                dest: '<%= config.src %>/index.html'
            }
        },
        watch: {
            index: {
                files: ['<%= config.src %>/index.html.template'],
                tasks: ['preprocess']
            }
        },
        clean: {
            options: { dot: true },
            dist: { files: [{ src: ['<%= config.dist %>'] }] },
            stage: { files: [{ src: ['<%= config.stage %>'] }] }
        },
        copy: {
            toDist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.src %>',
                        dest: '<%= config.dist %>',
                        src: [
                            'index.html',
                            'vendor/**/*.{html,otf,eot,svg,tff,woff,woff2}',
                            'assets/**/*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.stage %>',
                        dest: '<%= config.dist %>',
                        src: ['assets/**/*']
                    }
                ]
            }
        },
        express: {
            all: {
                options: {
                    port: 9000,
                    bases: './src',
                    server: 'server.js'
                }
            }
        },
        uglify: {
            options: {
                mangle: true,
                beautify: false
            }
        },
        useminPrepare: {
            options: { dest: '<%= config.stage %>' },
            html: '<%= config.src %>/index.html'
        },
        usemin: {
            options: {
                dest: '<%= config.stage %>',
                assetsDirs: ['<%= config.stage %>']
            },
            html: '<%= config.src %>/index.html'
        },
        ngAnnotate: {
            buildjs: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.stage %>/concat/assets/js/',
                        src: 'build.js',
                        dest: '<%= config.stage %>/concat/assets/js/'
                    }
                ]
            }
        },
        ngtemplates: {
            build: {
                cwd: '<%= config.src %>',
                src: [
                    'app/**/*.html',
                    'core/**/*.html'
                ],
                dest: '<%= config.src %>/app/app.templates.js',
                options: {
                    module: 'gg.app',
                    prefix: '/',
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    }
                }
            }
        }
    });

    grunt.registerTask('server', [
        'preprocess',
        'express',
        'watch:index'
    ]);

    grunt.registerTask('build', [
        'preprocess',
        'clean:dist',
        'ngtemplates:build',
        'useminPrepare',
        'concat:generated',
        'ngAnnotate',
        'cssmin:generated',
        'uglify:generated',
        'usemin',
        'copy:toDist',
        'clean:stage'
    ]);

    grunt.registerTask('develop.mock', [
        'env:mock',
        'server'
    ]);
    
    grunt.registerTask('develop.prod', [
        'env:prod',
        'server'
    ]);
    
    grunt.registerTask('build.mock', [
        'env:mock',
        'build'
    ]);

    grunt.registerTask('build.prod', [
        'env:prod',
        'build'
    ]);
}
