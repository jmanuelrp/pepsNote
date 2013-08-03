define(function(require) {
	var $, _, Backbone, Factory;

	$ = require('zepto');
	_ = require('underscore');
	Backbone = require('backbone');
	Factory = require('factory');

	var MainCollection = Backbone.Collection.extend({
		model: function (attrs, options) {
			var model = Factory.make(attrs);

			return model;
		}
	});

	return MainCollection;
});