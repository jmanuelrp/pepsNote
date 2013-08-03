define(['require', 'noteModel'],function(require) {

	var _ = require('underscore');

	var Factory = {
		make: function(attrs) {
			var model_name, itemModel, model, _attrs;

			_attrs = {
				type: 'note',
				data: {}
			};

			if (!_.isObject(attrs)) attrs = {};
			attrs = _.extend(_attrs,attrs);

			attrs.data.id = _.uniqueId('item_');

			model_name = attrs.type+'Model';
			itemModel = require(model_name);
			model = new itemModel(attrs.data);

			return model;
		}
	};

	return Factory;
});