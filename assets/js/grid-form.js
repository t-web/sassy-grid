var GF = function(fields, grid){
	this.fields = fields;
	this.grid = grid;
};

GF.prototype = {
	getElements: function(){
		// console.log("get elements");
		for (var i = 0; i < this.fields.length; i++) {
			var field = this.fields[i];
			field.formFields = document.getElementsByClassName(field.identifier+"_field");
			field.outputElements = document.getElementsByClassName(field.identifier+"_output");
		}
	},
	processFields: function(){
		// console.log("process fields");
		for (var i = 0; i < this.fields.length; i++) {
			var field = this.fields[i];
			for (var ii = 0; ii < field.formFields.length; ii++) {
				var formField = field.formFields[ii];
				formField.setAttribute("data-index", i);

				this.appendEvent(this, formField);

			}
		}
	},
	appendEvent: function(_scope, formField){
		// console.log("append event");
		if(formField.type === "text"){
			formField.addEventListener("keyup", function(e){
				_scope.onKeyUp(_scope.fields, e);
			}, false);
		}
		if(formField.type === "radio"){
			formField.addEventListener("change", function(e){
				_scope.onChange(_scope.fields, e);
			}, false);
		}
	},
	onKeyUp: function(fields, e){
		// console.log("keyup");
		var value = e.target.value;
		var index = e.target.getAttribute("data-index");
		var field = fields[index];
		for (var i = 0; i < field.outputElements.length; i++) {
			var element = field.outputElements[i];
			element.innerHTML = value;
		}
		if(this.checkFields()){
			this.buildGrid();
		}
	},
	onChange: function(fields, e){
		// console.log("change");
		var value = e.target.value;
		var index = e.target.getAttribute("data-index");
		var field = fields[index];
		for (var i = 0; i < field.outputElements.length; i++) {
			var element = field.outputElements[i];
			element.innerHTML = value;
		}
		if(this.checkFields()){
			this.buildGrid();
		}
	},
	checkFields: function(){
		// console.log("check fields");
		for (var i = 0; i < this.fields.length; i++) {
			for (var ii = 0; ii < this.fields[i].outputElements.length; ii++) {
				var outputElement = this.fields[i].outputElements[ii];
				if(outputElement.innerHTML === ""){
					return false;
				}
			}
		}
		return true;
	},
	buildGrid: function(){
		console.log("build grid");
	},
	init: function(){
		// console.log("init");
		this.getElements();
		this.processFields();
	}
};

var gridForms = new GF(
	[{
		name: "column-width",
		identifier: "gf_column_width"
	},
	{
		name: "gutter-width",
		identifier: "gf_gutter_width"
	},
	{
		name: "num-columns",
		identifier: "gf_num_columns"
	},
	{
		name: "padding-left",
		identifier: "gf_padding_left"
	},
	{
		name: "padding-right",
		identifier: "gf_padding_right"
	},
	{
		name: "is-fluid",
		identifier: "gf_fluid"
	},
	{
		name: "gutter-property",
		identifier: "gf_gutter_prop"
	}],
	"grid_example"
);