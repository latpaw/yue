require.config({
    paths: {
        jquery:     'vendor/jquery-1.9.1.min',
        // jqmconfig:   'plugin/jqm.config',
        // jqm:     'vendor/jquery.mobile-1.0.1.min', 
        underscore: 'vendor/underscore_amd',
        backbone:   'vendor/backbone_amd',
        text:       'vendor/text',
        plugin:    'plugin',
        templates:  '../templates',
        modules:    '../modules'
    }

});

require(['app'], function(app) {
    app.initialize();
});