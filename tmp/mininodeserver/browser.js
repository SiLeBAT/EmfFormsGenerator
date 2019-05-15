	require('./browserCode');
	window.toBeReplacedMap = new Object();
	var jsonformscore = require('@jsonforms/core');
	var material_renderers = require('@jsonforms/material-renderers');

	var redux = require('redux');
	var react_redux = require('react-redux');
	var App = React.createFactory(require('./App'));
	window.App = App;
    window.schema = require('./GeneralInformationModel.json');
    window.uischema = require('./GeneralInformationView.json');
    
   // SCOPE
    window.schema2 = require('./ScopeModel.json');
    window.uischema2 = require('./ScopeView.json');
    
    window.schema3 = require('./ProductModel.json');
    window.uischema3 = require('./ProductView.json');
    
    window.schema4 = require('./HazardModel.json');
    window.uischema4 = require('./HazardView.json');
    
    window.schema5 = require('./PopulationGroupModel.json');
    window.uischema5 = require('./PopulationGroupView.json');
    

    //DATA Background
    window.schema6 = require('./DataBackgroundModel.json');
    window.uischema6 = require('./DataBackgroundView.json');
    
    window.schema7 = require('./StudyModel.json');
    window.uischema7 = require('./StudyView.json');
    
    window.schema8 = require('./StudySampleModel.json');
    window.uischema8 = require('./StudySampleView.json');
    
    window.schema9 = require('./DietaryAssessmentMethodModel.json');
    window.uischema9 = require('./DietaryAssessmentMethodView.json')
    
    window.schema10 = require('./LaboratoryModel.json');
    window.uischema10 = require('./LaboratoryView.json');
    
    window.schema11 = require('./AssayModel.json');
    window.uischema11 = require('./AssayView.json');
    
    
    // popup creators
   
    
    window.schema13 = require('./ModelCategoryModel.json');
    window.uischema13 = require('./ModelCategoryView.json');
    var schema14 = require('./ModificationDateModel.json');
    var uischema14 = require('./ModificationDateView.json');
    var schema15 = require('./CountryModel.json');
    var uischema15 = require('./CountryView.json');
    var schema16 = require('./RegionModel.json');
    var uischema16 = require('./RegionView.json');
    window.schema18 = require('./ParameterModel.json');
    window.uischema18 = require('./ParameterView.json');
    window.schema19 = require('./ModelEquationModel.json');
    window.uischema19 = require('./ModelEquationView.json');
    var schema20 = require('./EventModel.json');
    var uischema20 = require('./EventView.json');
   
    
    window.schema29 = require('./StudySampleModel.json');
    window.uischema29 = require('./StudySampleView.json');
    //Model Math
    window.schema17 = require('./ModelMathModel.json');
    window.uischema17 = require('./ModelMathView.json');
    window.schema21 = require('./ExposureModel.json');
    window.uischema21 = require('./ExposureView.json');
    
    window.schema22 = require('./ReferenceModel.json');
    window.uischema22 = require('./ReferenceView.json');
    
    window.schema23 = require('./ContactModel.json');
    window.uischema23 = require('./ContactView.json');
    
    
    var schema25 = require('./SpatialInformationModel.json');
    var uischema25 = require('./SpatialInformationView.json');
    
    var schema26 = require('./EventModel.json');
    var uischema26 = require('./EventView.json');
    
    var schema27 = require('./ExposureModel.json');
    var uischema27 = require('./ExposureView.json');
    
    
    
    window.schema28 = require('./StringObjectModel.json');
    windowuischema28 = require('./StringObjectView.json');
    window.Actions= jsonformscore.Actions;
    var Actions= jsonformscore.Actions,
	  jsonformsReducer= jsonformscore.jsonformsReducer,
	  combineReducers= redux.combineReducers,
	  createStore= redux.createStore,
	  Provider= react_redux.Provider,
	  materialFields= material_renderers.materialFields,
	  materialRenderers= material_renderers.materialRenderers
  
	  window.Provider = Provider;
  window.store1 = createStore(
  combineReducers({ jsonforms: jsonformsReducer() }),  
  {
    jsonforms: {
      renderers: materialRenderers,
      fields: materialFields,
    }
  }
);
window.store1.dispatch(Actions.init(window.generalInformation, window.schema, window.uischema));

window.store2 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
  window.store2.dispatch(Actions.init(window.scope, window.schema2, window.uischema2));

  window.store3 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
  window.store3.dispatch(Actions.init({} , window.schema3, window.uischema3));

  window.store4 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
  window.store4.dispatch(Actions.init({}, window.schema4, window.uischema4));







//databackground stores
window.store6 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
  window.store6.dispatch(Actions.init(window.dataBackground, window.schema6, window.uischema6));
  window.store7 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
window.store7.dispatch(Actions.init(window.dataBackground.study!=null?window.dataBackground.study:{}, window.schema7, window.uischema7));
window.toBeReplacedMap["Study"] = window.store7;

  store8 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
store8.dispatch(Actions.init(window.dataBackground.studySample, window.schema8, window.uischema8));
  window.store9 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
  window.store9.dispatch(Actions.init({}, window.schema9, window.uischema9));

  window.store10 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);

  window.store10.dispatch(Actions.init( {}, window.schema10, window.uischema10));

  window.store11 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
  
  window.store11.dispatch(Actions.init({}, schema11, uischema11));
//popups



 window.store13 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
  window.store13.dispatch(Actions.init({}, window.schema13, window.uischema13));


  store14 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
store14.dispatch(Actions.init({}, schema14, uischema14));


store15 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
store15.dispatch(Actions.init({}, schema15, uischema15));

store16 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
store16.dispatch(Actions.init({}, schema16, uischema16));


window.store17 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
window.store17.dispatch(Actions.init(window.modelMath, window.schema17, window.uischema17));


window.store18 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
window.store18.dispatch(Actions.init({}, window.schema18, window.uischema18));


window.store19 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
window.store19.dispatch(Actions.init({}, window.schema19, window.uischema19));


store20 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
store20.dispatch(Actions.init({}, schema20, uischema20));

window.store29 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
window.store29.dispatch(Actions.init({}, window.schema29, window.uischema29));

window.store21 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
window.store21.dispatch(Actions.init({}, window.schema21, window.uischema21));


store22 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
store22.dispatch(Actions.init({}, schema22, uischema22));

window.store23 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
window.store23.dispatch(Actions.init(window.generalInformation.author!=null?window.generalInformation.author:{}, window.schema23, window.uischema23));
window.toBeReplacedMap["Author"] = window.store23;
store24 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
store24.dispatch(Actions.init({}, window.schema23, window.uischema23));
//window.toBeReplacedMap["Creators"] = store24;
store25 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
store25.dispatch(Actions.init(window.scope.spatialInformation!= null?window.scope.spatialInformation:{region:[],country:[]}, schema25, uischema25));
window.toBeReplacedMap["Spatial Information"] = store25;

store26 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
store26.dispatch(Actions.init(window.modelMath.event, schema26, uischema26));
window.toBeReplacedMap["Event"] = store26;

store27 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
store27.dispatch(Actions.init( window.modelMath.exposure!= null?window.modelMath.exposure:{}, schema27, uischema27));
window.toBeReplacedMap["Exposure"] = store27;

store28 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
store28.dispatch(Actions.init({}, window.schema28, window.uischema28));
// Uncomment this line (and respective import) to register our custom renderer
//store.dispatch(Actions.registerRenderer(ratingControlTester, RatingControl));

// This script will run in the browser and will render our component using the
// value from APP_PROPS that we generate inline in the page's html on the server.
// If these props match what is used in the server render, React will see that
// it doesn't need to generate any DOM and the page will load faster

//document.getElementsByClassName("MuiTable-root-222")[0].classList.add("secondTable");

try{
ReactDOM.render(React.createFactory(Provider)({store: store1},
		App()
), document.getElementById('generalinformation'));
ReactDOM.render(React.createFactory(Provider)({store: window.store2},
		App()
), document.getElementById('scope'));

ReactDOM.render(React.createFactory(Provider)({store: store6},
		App()
), document.getElementById('databackground'));

ReactDOM.render(React.createFactory(Provider)({store: store17},
		App()
), document.getElementById('modelMath'));
}catch(err){//console.log("modelMath " + err);
	
}
notAProperDiv = $("div:contains('No applicable'):not(:has(div))");
$.each(notAProperDiv, function( index, value ) {
	var parentxc ;
	var areaName;
	try{
			
			parentxc = value.parentNode;
			areaName =  parentxc.firstChild.textContent;
			if(parentxc.firstChild.textContent.indexOf('*') >= 0){
				areaName = areaName.slice(0,-1);
			}
			if(areaName.indexOf('No applicable field found') < 0){
				$(value).remove();
				if(areaName !='Spatial Information' && areaName !='Exposure'){
					$(parentxc).append( "<div id ='"+areaName+"' class='replaced' ></div>" );
				}else{
					$(parentxc).append( "<div id ='"+areaName+"' class='notReplace' ></div>" );
				}
				ReactDOM.render(React.createFactory(Provider)({store: window.toBeReplacedMap[areaName]},
						App()
				), document.getElementById(areaName));
			}
	}catch(err){
		//console.log("loop ",parentxc, err);
	}
	
});

var tablePopups = [
		{popId : "modelCategory",storeID : window.generalInformation,parent : document.getElementById('generalinformation')},
		{popId : "modificationdate",storeID : window.generalInformation,parent : document.getElementById('generalinformation')},
		{popId : "creators",storeID : window.generalInformation,parent : document.getElementById('generalinformation')},
		{popId : "reference",storeID : window.generalInformation,parent : document.getElementById('generalinformation')},
		
		{popId : "product",storeID : window.scope,parent: document.getElementById('scope')},
		{popId : "hazard",storeID : window.scope,parent: document.getElementById('scope')},
		{popId : "populationGroup",storeID : window.scope,parent: document.getElementById('scope')},
		{popId : "region",storeID : window.scope,parent: document.getElementById('scope')},
		{popId : "country",storeID : window.scope,parent: document.getElementById('scope')},
		
		{popId : "studysample",storeID : window.dataBackground},
		{popId : "dietaryassessmentmethod",storeID : window.dataBackground},
		{popId : "laboratory",storeID : window.dataBackground},
		{popId : "studysample",storeID : window.dataBackground},
		
		{popId : "parameter",storeID : window.modelMath,parent: document.getElementById('modelMath')},
		{popId : "modelEquation",storeID : window.modelMath,parent: document.getElementById('modelMath')},
		{popId : "methodologicalTreatmentOfLeftCensoredData",storeID : window.modelMath,parent: document.getElementById('modelMath')},
		{popId : "levelOfContaminationAfterLeftCensoredDataTreatment",storeID : window.modelMath,parent: document.getElementById('modelMath')},
		{popId : "scenario",storeID : window.modelMath,parent: document.getElementById('modelMath')},
		{popId : "qualityMeasures",storeID : window.modelMath,parent: document.getElementById('modelMath')},
		{popId : "event",storeID : window.modelMath,parent: document.getElementById('modelMath')}
	]
$.each(tablePopups,function(index,value){
	
});
function tableInputBootstraping(elements){
	$.each(elements,function (index, value){
		$(value).addClass("form-control");
	})
}
//popup creatror
window.savereference = function () {
	
	if(window.generalInformation.reference == undefined){
		window.generalInformation.reference = [];
		window.generalInformation.reference.push(store22.getState().jsonforms.core.data);
		store1.dispatch(Actions.init(window.generalInformation, window.schema, window.uischema));
	}else{
		window.generalInformation.reference.push(store22.getState().jsonforms.core.data);
		store1.dispatch(Actions.init(window.generalInformation, window.schema, window.uischema));
	}
    
    $(".table tbody tr td div div div input").removeAttr('class');
    window.tableInputBootstraping($(".table tbody tr td div div div input"));
    $(".table tbody tr td div div div").removeAttr('class');
    $(".table tbody tr td div div").removeAttr('class');
    $(".table tbody tr td div").removeAttr('class');
    $(".table tbody tr td").removeAttr('class');
    $(".table tbody tr").removeAttr('class');
    $(".table tbody").removeAttr('class');
    $(".table thead tr th th").removeAttr('class');
    $(".table thead tr th").removeAttr('class');
    $(".table thead tr").removeAttr('class');
	$(".table thead").removeAttr('class');

    
   $('.MuiTable-root-222').addClass('table'); 
   $('.MuiTable-root-222').parent().addClass('table-responsive');
   $('.MuiTable-root-222').parent().removeClass('MuiGrid-typeItem-2'); 
   $('.MuiTable-root-222').removeClass('MuiTable-root-222');
	
}
parent8 = document.getElementById('generalinformation');
$(parent8).append(
		"<div id='reference' class='modal fade' role='dialog'>\n" + 
        "  <div class='modal-dialog'>\n" + 
        "\n" + 
        "    <!-- Modal content-->\n" + 
        "    <div class='modal-content'>\n" + 
        "      <div class='modal-header'>\n" + 
        "        <button type='button' class='close' data-dismiss='modal'>&times;</button>\n" + 
        "        <h4 id='titlereference' class='modal-title'>Modal Header</h4>\n" + 
        "      </div>\n" + 
        "      <div id='referenceModelContent' class='modal-body'>\n" + 
        "      </div>\n" + 
        "      <div class='modal-footer'>\n" + 
        "        <button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>\n" + 
        "   	 <button id='save' onclick='window.savereference()' class='btn btn-width bkgrnd-cyan save-details' data-dismiss='modal' type='button' name='save-details'>Save</button>" + 
        "      </div>\n" + 
        "    </div>\n" + 
        "\n" + 
        "  </div>\n" + 
        "</div>");

try{
ReactDOM.render(React.createFactory(Provider)({store: store22},
		App()
), document.getElementById('referenceModelContent'));
}catch(err){//console.log("reference " + err);
	
}

parent9 = document.getElementById('scope');

//popup modelcategory
window.saveModelCategory = function () {
	if(window.generalInformation.modelCategory == undefined){
		window.generalInformation.modelCategory = [];
		window.generalInformation.modelCategory.push(window.store13.getState().jsonforms.core.data);
		store1.dispatch(Actions.init(window.generalInformation, window.schema, window.uischema));
	}else{
		window.generalInformation.modelCategory.push(window.store13.getState().jsonforms.core.data);
		store1.dispatch(Actions.init(window.generalInformation, window.schema, window.uischema));
	}
	    $(".table tbody tr td div div div input").removeAttr('class');
	    tableInputBootstraping($(".table tbody tr td div div div input"));
	    $(".table tbody tr td div div div").removeAttr('class');
	    $(".table tbody tr td div div").removeAttr('class');
	    $(".table tbody tr td div").removeAttr('class');
	    $(".table tbody tr td").removeAttr('class');
	    $(".table tbody tr").removeAttr('class');
	    $(".table tbody").removeAttr('class');
	    $(".table thead tr th th").removeAttr('class');
	    $(".table thead tr th").removeAttr('class');
	    $(".table thead tr").removeAttr('class');
		$(".table thead").removeAttr('class');

	    
	   $('.MuiTable-root-222').addClass('table'); 
	   $('.MuiTable-root-222').parent().addClass('table-responsive');
	   $('.MuiTable-root-222').parent().removeClass('MuiGrid-typeItem-2'); 
	   $('.MuiTable-root-222').removeClass('MuiTable-root-222');
    

    
   
   $('.MuiTable-root-222').addClass('table'); 
   $('.MuiTable-root-222').parent().addClass('table-responsive');
   $('.MuiTable-root-222').parent().removeClass('MuiGrid-typeItem-2'); 
   $('.MuiTable-root-222').removeClass('MuiTable-root-222');
	
}
$(parent8).append(
		"<div id='modelCategory' class='modal fade' role='dialog'>\n" + 
        "  <div class='modal-dialog'>\n" + 
        "\n" + 
        "    <!-- Modal content-->\n" + 
        "    <div class='modal-content'>\n" + 
        "      <div class='modal-header'>\n" + 
        "        <button type='button' class='close' data-dismiss='modal'>&times;</button>\n" + 
        "        <h4 id='titlemodelCategory' class='modal-title'>Modal Header</h4>\n" + 
        "      </div>\n" + 
        "      <div id='modelCategoryModelContent' class='modal-body'>\n" + 
        "      </div>\n" + 
        "      <div class='modal-footer'>\n" + 
        "        <button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>\n" + 
        "   	 <button id='save' onclick='window.saveModelCategory()' class='btn btn-width bkgrnd-cyan save-details' data-dismiss='modal' type='button' name='save-details'>Save</button>" + 
        "      </div>\n" + 
        "    </div>\n" + 
        "\n" + 
        "  </div>\n" + 
        "</div>");
try{
ReactDOM.render(React.createFactory(Provider)({store: window.store13},
		App()
), document.getElementById('modelCategoryModelContent'));
}catch(err){//console.log("modelCategory " + err);
	
}
//console.log('DONEMODELCLASS');
//popup modificationdate
window.savemodificationdate = function () {
	if(window.generalInformation.modificationdate == undefined){
		window.generalInformation.modificationdate = [];
		window.generalInformation.modificationdate.push(store14.getState().jsonforms.core.data);
		store1.dispatch(Actions.init(window.generalInformation, window.schema, window.uischema));
	}else{
		window.generalInformation.modificationdate.push(store14.getState().jsonforms.core.data);
		store1.dispatch(Actions.init(window.generalInformation, window.schema, window.uischema));
	}
	//console.log("date ",window.generalInformation.modificationdate);
		$(".table tbody tr td div div div input").removeAttr('class');
		tableInputBootstraping($(".table tbody tr td div div div input"));
	    $(".table tbody tr td div div div").removeAttr('class');
	    $(".table tbody tr td div div").removeAttr('class');
	    $(".table tbody tr td div").removeAttr('class');
	    $(".table tbody tr td").removeAttr('class');
	    $(".table tbody tr").removeAttr('class');
	    $(".table tbody").removeAttr('class');
	    $(".table thead tr th th").removeAttr('class');
	    $(".table thead tr th").removeAttr('class');
	    $(".table thead tr").removeAttr('class');
		$(".table thead").removeAttr('class');

	    
	   $('.MuiTable-root-222').addClass('table'); 
	   $('.MuiTable-root-222').parent().addClass('table-responsive');
	   $('.MuiTable-root-222').parent().removeClass('MuiGrid-typeItem-2'); 
	   $('.MuiTable-root-222').removeClass('MuiTable-root-222');
	//$('#modificationdate').modal('toggle');
}

$(parent8).append(
		"<div id='modificationdate' class='modal fade' role='dialog'>\n" + 
        "  <div class='modal-dialog'>\n" + 
        "\n" + 
        "    <!-- Modal content-->\n" + 
        "    <div class='modal-content'>\n" + 
        "      <div class='modal-header'>\n" + 
        "        <button type='button' class='close' data-dismiss='modal'>&times;</button>\n" + 
        "        <h4 id='titlemodificationdate' class='modal-title'>Modal Header</h4>\n" + 
        "      </div>\n" + 
        "      <div id='modificationdateModelContent' class='modal-body'>\n" + 
        "      </div>\n" + 
        "      <div class='modal-footer'>\n" + 
        "        <button type='button' class='btn btn-default' data-dismiss='modal'>cancle</button>\n" + 
        "   	 <button id='save' onclick='window.savemodificationdate()' class='btn btn-width bkgrnd-cyan save-details' data-dismiss='modal' type='button' name='save-details'>Save</button>" + 
        "      </div>\n" + 
        "    </div>\n" + 
        "\n" + 
        "  </div>\n" + 
        "</div>");
try{
	ReactDOM.render(React.createFactory(Provider)({store: store14},
		App()
), document.getElementById('modificationdateModelContent'));
}catch(err){//console.log("modificationdate " + err);
	
}
window.saveCreators = function () {
	//console.log(store24.getState().jsonforms.core.data);
	if(window.generalInformation.creators == undefined){
		window.generalInformation.creators = [];
		window.generalInformation.creators.push(store24.getState().jsonforms.core.data);
		store1.dispatch(Actions.init(window.generalInformation, window.schema, window.uischema));
	}else{
		window.generalInformation.creators.push(store24.getState().jsonforms.core.data);
		store1.dispatch(Actions.init(window.generalInformation, window.schema, window.uischema));
	}
	//console.log("date ",window.generalInformation.modificationdate);
		$(".table tbody tr td div div div input").removeAttr('class');
		tableInputBootstraping($(".table tbody tr td div div div input"));
	    $(".table tbody tr td div div div").removeAttr('class');
	    $(".table tbody tr td div div").removeAttr('class');
	    $(".table tbody tr td div").removeAttr('class');
	    $(".table tbody tr td").removeAttr('class');
	    $(".table tbody tr").removeAttr('class');
	    $(".table tbody").removeAttr('class');
	    $(".table thead tr th th").removeAttr('class');
	    $(".table thead tr th").removeAttr('class');
	    $(".table thead tr").removeAttr('class');
		$(".table thead").removeAttr('class');

	    
	   $('.MuiTable-root-222').addClass('table'); 
	   $('.MuiTable-root-222').parent().addClass('table-responsive');
	   $('.MuiTable-root-222').parent().removeClass('MuiGrid-typeItem-2'); 
	   $('.MuiTable-root-222').removeClass('MuiTable-root-222');
	//$('#modificationdate').modal('toggle');
}

$(parent8).append(
		"<div id='creators' class='modal fade' role='dialog'>\n" + 
        "  <div class='modal-dialog'>\n" + 
        "\n" + 
        "    <!-- Modal content-->\n" + 
        "    <div class='modal-content'>\n" + 
        "      <div class='modal-header'>\n" + 
        "        <button type='button' class='close' data-dismiss='modal'>&times;</button>\n" + 
        "        <h4 id='titlecreators' class='modal-title'>Modal Header</h4>\n" + 
        "      </div>\n" + 
        "      <div id='creatorsModelContent' class='modal-body'>\n" + 
        "      </div>\n" + 
        "      <div class='modal-footer'>\n" + 
        "        <button type='button' class='btn btn-default' data-dismiss='modal'>cancle</button>\n" + 
        "   	 <button id='save' onclick='window.saveCreators()' class='btn btn-width bkgrnd-cyan save-details' data-dismiss='modal' type='button' name='save-details'>Save</button>" + 
        "      </div>\n" + 
        "    </div>\n" + 
        "\n" + 
        "  </div>\n" + 
        "</div>");
try{
	ReactDOM.render(React.createFactory(Provider)({store: store24},
		App()
), document.getElementById('creatorsModelContent'));
}catch(err){//console.log("modificationdate " + err);
	
}


//popup country
/*window.saveCountry = function () {
	if(window.scope.spatialInformation == undefined){
		window.scope.spatialInformation = {}
	}
	if(window.scope.spatialInformation.country == undefined){
		window.scope.spatialInformation.country = [];
		console.log(store15.getState().jsonforms.core.data);
		window.scope.spatialInformation.country.push(store15.getState().jsonforms.core.data);
		window.store2.dispatch(Actions.init(window.scope, window.schema2, window.uischema2));
	}else{
		console.log(store15.getState().jsonforms.core.data);
		window.scope.spatialInformation.country.push(store15.getState().jsonforms.core.data);
		window.store2.dispatch(Actions.init(window.scope, window.schema2, window.uischema2));
	}
		$(".table tbody tr td div div div input").removeAttr('class');
	    $(".table tbody tr td div div div").removeAttr('class');
	    $(".table tbody tr td div div").removeAttr('class');
	    $(".table tbody tr td div").removeAttr('class');
	    $(".table tbody tr td").removeAttr('class');
	    $(".table tbody tr").removeAttr('class');
	    $(".table tbody").removeAttr('class');
	    $(".table thead tr th th").removeAttr('class');
	    $(".table thead tr th").removeAttr('class');
	    $(".table thead tr").removeAttr('class');
		$(".table thead").removeAttr('class');

	    
	   $('.MuiTable-root-222').addClass('table'); 
	   $('.MuiTable-root-222').parent().addClass('table-responsive');
	   $('.MuiTable-root-222').parent().removeClass('MuiGrid-typeItem-2'); 
	   $('.MuiTable-root-222').removeClass('MuiTable-root-222');
	
}

$(parent9).append(
		"<div id='country' class='modal fade' role='dialog'>\n" + 
        "  <div class='modal-dialog'>\n" + 
        "\n" + 
        "    <!-- Modal content-->\n" + 
        "    <div class='modal-content'>\n" + 
        "      <div class='modal-header'>\n" + 
        "        <button type='button' class='close' data-dismiss='modal'>&times;</button>\n" + 
        "        <h4 id='titlecountry' class='modal-title'>Modal Header</h4>\n" + 
        "      </div>\n" + 
        "      <div id='countryModelContent' class='modal-body'>\n" + 
        "      </div>\n" + 
        "      <div class='modal-footer'>\n" + 
        "        <button type='button' class='btn btn-default' data-dismiss='modal'>cancle</button>\n" + 
        "   	 <button id='save' onclick='window.saveCountry()' class='btn btn-width bkgrnd-cyan save-details' data-dismiss='modal' type='button' name='save-details'>Save</button>" + 
        "      </div>\n" + 
        "    </div>\n" + 
        "\n" + 
        "  </div>\n" + 
        "</div>");
try{
	ReactDOM.render(React.createFactory(Provider)({store: store15},
		App()
), document.getElementById('countryModelContent'));
}catch(err){//console.log("country " + err);
	
}

//popup region
window.saveRegion = function () {
	if(window.scope.spatialInformation == undefined){
		window.scope.spatialInformation = {}
	}
	if(window.scope.spatialInformation.region == undefined){
		window.scope.spatialInformation.region = [];
		window.scope.spatialInformation.region.push(store16.getState().jsonforms.core.data);
		window.store2.dispatch(Actions.init(window.scope, window.schema2, window.uischema2));
	}else{
		window.scope.spatialInformation.region.push(store16.getState().jsonforms.core.data);
		window.store2.dispatch(Actions.init(window.scope, window.schema2, window.uischema2));
	}
		$(".table tbody tr td div div div input").removeAttr('class');
	    $(".table tbody tr td div div div").removeAttr('class');
	    $(".table tbody tr td div div").removeAttr('class');
	    $(".table tbody tr td div").removeAttr('class');
	    $(".table tbody tr td").removeAttr('class');
	    $(".table tbody tr").removeAttr('class');
	    $(".table tbody").removeAttr('class');
	    $(".table thead tr th th").removeAttr('class');
	    $(".table thead tr th").removeAttr('class');
	    $(".table thead tr").removeAttr('class');
		$(".table thead").removeAttr('class');

	    
	   $('.MuiTable-root-222').addClass('table'); 
	   $('.MuiTable-root-222').parent().addClass('table-responsive');
	   $('.MuiTable-root-222').parent().removeClass('MuiGrid-typeItem-2'); 
	   $('.MuiTable-root-222').removeClass('MuiTable-root-222');
	
}

$(parent9).append(
		"<div id='region' class='modal fade' role='dialog'>\n" + 
      "  <div class='modal-dialog'>\n" + 
      "\n" + 
      "    <!-- Modal content-->\n" + 
      "    <div class='modal-content'>\n" + 
      "      <div class='modal-header'>\n" + 
      "        <button type='button' class='close' data-dismiss='modal'>&times;</button>\n" + 
      "        <h4 id='titleregion' class='modal-title'>Modal Header</h4>\n" + 
      "      </div>\n" + 
      "      <div id='regionModelContent' class='modal-body'>\n" + 
      "      </div>\n" + 
      "      <div class='modal-footer'>\n" + 
      "        <button type='button' class='btn btn-default' data-dismiss='modal'>cancle</button>\n" + 
      "   	 <button id='save' onclick='window.saveRegion()' class='btn btn-width bkgrnd-cyan save-details' data-dismiss='modal' type='button' name='save-details'>Save</button>" + 
      "      </div>\n" + 
      "    </div>\n" + 
      "\n" + 
      "  </div>\n" + 
      "</div>");
try{
	ReactDOM.render(React.createFactory(Provider)({store: store16},
		App()
), document.getElementById('regionModelContent'));
}catch(err){//console.log("country " + err);
	
}*/

//popup product
window.saveProduct = function () {
	if(window.scope.product == undefined){
		window.scope.product = [];
		window.scope.product.push(window.store3.getState().jsonforms.core.data);
		window.store2.dispatch(Actions.init(window.scope, window.schema2, window.uischema2));
	}else{
		window.scope.product.push(window.store3.getState().jsonforms.core.data);
		window.store2.dispatch(Actions.init(window.scope, window.schema2, window.uischema2));
	}
	    $(".table tbody tr td div div div input").removeAttr('class');
	    tableInputBootstraping($(".table tbody tr td div div div input"));
	    $(".table tbody tr td div div div").removeAttr('class');
	    $(".table tbody tr td div div").removeAttr('class');
	    $(".table tbody tr td div").removeAttr('class');
	    $(".table tbody tr td").removeAttr('class');
	    $(".table tbody tr").removeAttr('class');
	    $(".table tbody").removeAttr('class');
	    $(".table thead tr th th").removeAttr('class');
	    $(".table thead tr th").removeAttr('class');
	    $(".table thead tr").removeAttr('class');
		$(".table thead").removeAttr('class');

	    
	   $('.MuiTable-root-222').addClass('table'); 
	   $('.MuiTable-root-222').parent().addClass('table-responsive');
	   $('.MuiTable-root-222').parent().removeClass('MuiGrid-typeItem-2'); 
	   $('.MuiTable-root-222').removeClass('MuiTable-root-222');
	
	
}

$(parent9).append(
		"<div id='product' class='modal fade' role='dialog'>\n" + 
        "  <div class='modal-dialog'>\n" + 
        "\n" + 
        "    <!-- Modal content-->\n" + 
        "    <div class='modal-content'>\n" + 
        "      <div class='modal-header'>\n" + 
        "        <button type='button' class='close' data-dismiss='modal'>&times;</button>\n" + 
        "        <h4 id='titleproduct' class='modal-title'>Modal Header</h4>\n" + 
        "      </div>\n" + 
        "      <div id='productModelContent' class='modal-body'>\n" + 
        "      </div>\n" + 
        "      <div class='modal-footer'>\n" + 
        "        <button type='button' class='btn btn-default' data-dismiss='modal'>cancle</button>\n" + 
        "   	 <button id='save' onclick='window.saveProduct()' class='btn btn-width bkgrnd-cyan save-details' data-dismiss='modal' type='button' name='save-details'>Save</button>" + 
        "      </div>\n" + 
        "    </div>\n" + 
        "\n" + 
        "  </div>\n" + 
        "</div>");
try{
	ReactDOM.render(React.createFactory(Provider)({store: window.store3},
		App()
), document.getElementById('productModelContent'));
	
	
parent10 = document.getElementById('modelMath');
}catch(err){//console.log("product " + err);
	
}
//popup hazard
window.savehazard = function () {
	if(window.scope.hazard == undefined){
		window.scope.hazard = [];
		window.scope.hazard.push(window.store4.getState().jsonforms.core.data);
		window.store2.dispatch(Actions.init(window.scope, window.schema2, window.uischema2));
	}else{
		window.scope.hazard.push(window.store4.getState().jsonforms.core.data);
		window.store2.dispatch(Actions.init(window.scope, window.schema2, window.uischema2));
	}
	    $(".table tbody tr td div div div input").removeAttr('class');
	    tableInputBootstraping($(".table tbody tr td div div div input"));
	    $(".table tbody tr td div div div").removeAttr('class');
	    $(".table tbody tr td div div").removeAttr('class');
	    $(".table tbody tr td div").removeAttr('class');
	    $(".table tbody tr td").removeAttr('class');
	    $(".table tbody tr").removeAttr('class');
	    $(".table tbody").removeAttr('class');
	    $(".table thead tr th th").removeAttr('class');
	    $(".table thead tr th").removeAttr('class');
	    $(".table thead tr").removeAttr('class');
		$(".table thead").removeAttr('class');

	    
	   $('.MuiTable-root-222').addClass('table'); 
	   $('.MuiTable-root-222').parent().addClass('table-responsive');
	   $('.MuiTable-root-222').parent().removeClass('MuiGrid-typeItem-2'); 
	   $('.MuiTable-root-222').removeClass('MuiTable-root-222');
	
	
}

$(parent9).append(
		"<div id='hazard' class='modal fade' role='dialog'>\n" + 
        "  <div class='modal-dialog'>\n" + 
        "\n" + 
        "    <!-- Modal content-->\n" + 
        "    <div class='modal-content'>\n" + 
        "      <div class='modal-header'>\n" + 
        "        <button type='button' class='close' data-dismiss='modal'>&times;</button>\n" + 
        "        <h4 id='titlehazard' class='modal-title'>Modal Header</h4>\n" + 
        "      </div>\n" + 
        "      <div id='hazardModelContent' class='modal-body'>\n" + 
        "      </div>\n" + 
        "      <div class='modal-footer'>\n" + 
        "        <button type='button' class='btn btn-default' data-dismiss='modal'>cancle</button>\n" + 
        "   	 <button id='save' onclick='window.savehazard()' class='btn btn-width bkgrnd-cyan save-details' data-dismiss='modal' type='button' name='save-details'>Save</button>" + 
        "      </div>\n" + 
        "    </div>\n" + 
        "\n" + 
        "  </div>\n" + 
        "</div>");
try{
	ReactDOM.render(React.createFactory(Provider)({store: window.store4},
		App()
), document.getElementById('hazardModelContent'));
parent10 = document.getElementById('modelMath');
}catch(err){//console.log("hazard " + err);
	
}





window.saveParameter = function () {
	if(window.modelMath.parameter == undefined){
		window.modelMath.parameter = [];
		window.modelMath.parameter.push(window.store18.getState().jsonforms.core.data);
		store17.dispatch(Actions.init(window.modelMath, window.schema17, window.uischema17));
	}else{
		window.modelMath.parameter.push(window.store18.getState().jsonforms.core.data);
		store17.dispatch(Actions.init(window.modelMath, window.schema17, window.uischema17));
	}
	    $(".table tbody tr td div div div input").removeAttr('class');
	    tableInputBootstraping($(".table tbody tr td div div div input"));
	    $(".table tbody tr td div div div").removeAttr('class');
	    $(".table tbody tr td div div").removeAttr('class');
	    $(".table tbody tr td div").removeAttr('class');
	    $(".table tbody tr td").removeAttr('class');
	    $(".table tbody tr").removeAttr('class');
	    $(".table tbody").removeAttr('class');
	    $(".table thead tr th th").removeAttr('class');
	    $(".table thead tr th").removeAttr('class');
	    $(".table thead tr").removeAttr('class');
		$(".table thead").removeAttr('class');

	    
	   $('.MuiTable-root-222').addClass('table'); 
	   $('.MuiTable-root-222').parent().addClass('table-responsive');
	   $('.MuiTable-root-222').parent().removeClass('MuiGrid-typeItem-2'); 
	   $('.MuiTable-root-222').removeClass('MuiTable-root-222');
	
}
$(parent10).append(
		"<div id='parameter' class='modal fade' role='dialog'>\n" + 
        "  <div class='modal-dialog'>\n" + 
        "\n" + 
        "    <!-- Modal content-->\n" + 
        "    <div class='modal-content'>\n" + 
        "      <div class='modal-header'>\n" + 
        "        <button type='button' class='close' data-dismiss='modal'>&times;</button>\n" + 
        "        <h4 id='titleParameter' class='modal-title'>Modal Header</h4>\n" + 
        "      </div>\n" + 
        "      <div id='parameterModelContent' class='modal-body'>\n" + 
        "      </div>\n" + 
        "      <div class='modal-footer'>\n" + 
        "        <button type='button' class='btn btn-default' data-dismiss='modal'>cancle</button>\n" + 
        "   	 <button id='save' onclick='window.saveParameter()' class='btn btn-width bkgrnd-cyan save-details' data-dismiss='modal' type='button' name='save-details'>Save</button>" + 
        "      </div>\n" + 
        "    </div>\n" + 
        "\n" + 
        "  </div>\n" + 
        "</div>");
try{
ReactDOM.render(React.createFactory(Provider)({store: window.store18},
		App()
), document.getElementById('parameterModelContent'));
}catch(err){//console.log("parameter " + err);
	
}
window.saveModelequation = function () {
	if(window.modelMath.modelequation == undefined){
		window.modelMath.modelequation = [];
		window.modelMath.modelequation.push(window.store19.getState().jsonforms.core.data);
		store17.dispatch(Actions.init(window.modelMath, window.schema17, window.uischema17));
	}else{
		window.modelMath.modelequation.push(window.store19.getState().jsonforms.core.data);
		store17.dispatch(Actions.init(window.modelMath, window.schema17, window.uischema17));
	}
	    $(".table tbody tr td div div div input").removeAttr('class');
	    tableInputBootstraping($(".table tbody tr td div div div input"));
	    $(".table tbody tr td div div div").removeAttr('class');
	    $(".table tbody tr td div div").removeAttr('class');
	    $(".table tbody tr td div").removeAttr('class');
	    $(".table tbody tr td").removeAttr('class');
	    $(".table tbody tr").removeAttr('class');
	    $(".table tbody").removeAttr('class');
	    $(".table thead tr th th").removeAttr('class');
	    $(".table thead tr th").removeAttr('class');
	    $(".table thead tr").removeAttr('class');
		$(".table thead").removeAttr('class');

	    
	   $('.MuiTable-root-222').addClass('table'); 
	   $('.MuiTable-root-222').parent().addClass('table-responsive');
	   $('.MuiTable-root-222').parent().removeClass('MuiGrid-typeItem-2'); 
	   $('.MuiTable-root-222').removeClass('MuiTable-root-222');
	
	
}
$(parent10).append(
		"<div id='modelEquation' class='modal fade' role='dialog'>\n" + 
        "  <div class='modal-dialog'>\n" + 
        "\n" + 
        "    <!-- Modal content-->\n" + 
        "    <div class='modal-content'>\n" + 
        "      <div class='modal-header'>\n" + 
        "        <button type='button' class='close' data-dismiss='modal'>&times;</button>\n" + 
        "        <h4 id='titleModelequation' class='modal-title'>Modal Header</h4>\n" + 
        "      </div>\n" + 
        "      <div id='modelequationModelContent' class='modal-body'>\n" + 
        "      </div>\n" + 
        "      <div class='modal-footer'>\n" + 
        "        <button type='button' class='btn btn-default' data-dismiss='modal'>cancle</button>\n" + 
        "   	 <button id='save' onclick='window.saveModelequation()' class='btn btn-width bkgrnd-cyan save-details' data-dismiss='modal' type='button' name='save-details'>Save</button>" + 
        "      </div>\n" + 
        "    </div>\n" + 
        "\n" + 
        "  </div>\n" + 
        "</div>");
try{
	ReactDOM.render(React.createFactory(Provider)({store: window.store19},
		App()
), document.getElementById('modelequationModelContent'));
}catch(err){//console.log("modelequation " + err);
	
}


//dataBackground
parent11 = document.getElementById('databackground');

window.saveStudySample = function () {
	if(window.dataBackground.studySample == undefined){
		window.dataBackground.studySample = [];
		window.dataBackground.studySample.push(window.store29.getState().jsonforms.core.data);
		store6.dispatch(Actions.init(window.dataBackground, window.schema6, window.uischema6));
	}else{
		window.dataBackground.studySample.push(window.store29.getState().jsonforms.core.data);
		store6.dispatch(Actions.init(window.dataBackground, window.schema6, window.uischema6));
	}
	    $(".table tbody tr td div div div input").removeAttr('class');
	    tableInputBootstraping($(".table tbody tr td div div div input"));
	    $(".table tbody tr td div div div").removeAttr('class');
	    $(".table tbody tr td div div").removeAttr('class');
	    $(".table tbody tr td div").removeAttr('class');
	    $(".table tbody tr td").removeAttr('class');
	    $(".table tbody tr").removeAttr('class');
	    $(".table tbody").removeAttr('class');
	    $(".table thead tr th th").removeAttr('class');
	    $(".table thead tr th").removeAttr('class');
	    $(".table thead tr").removeAttr('class');
		$(".table thead").removeAttr('class');

	    
	   $('.MuiTable-root-222').addClass('table'); 
	   $('.MuiTable-root-222').parent().addClass('table-responsive');
	   $('.MuiTable-root-222').parent().removeClass('MuiGrid-typeItem-2'); 
	   $('.MuiTable-root-222').removeClass('MuiTable-root-222');
	
}
$(parent11).append(
		"<div id='studySample' class='modal fade' role='dialog'>\n" + 
        "  <div class='modal-dialog'>\n" + 
        "\n" + 
        "    <!-- Modal content-->\n" + 
        "    <div class='modal-content'>\n" + 
        "      <div class='modal-header'>\n" + 
        "        <button type='button' class='close' data-dismiss='modal'>&times;</button>\n" + 
        "        <h4 id='titlestudySample' class='modal-title'>Modal Header</h4>\n" + 
        "      </div>\n" + 
        "      <div id='studySampleModelContent' class='modal-body'>\n" + 
        "      </div>\n" + 
        "      <div class='modal-footer'>\n" + 
        "        <button type='button' class='btn btn-default' data-dismiss='modal'>cancle</button>\n" + 
        "   	 <button id='save' onclick='window.saveStudySample()' class='btn btn-width bkgrnd-cyan save-details' data-dismiss='modal' type='button' name='save-details'>Save</button>" + 
        "      </div>\n" + 
        "    </div>\n" + 
        "\n" + 
        "  </div>\n" + 
        "</div>");
try{
	ReactDOM.render(React.createFactory(Provider)({store: window.store29},
		App()
), document.getElementById('studySampleModelContent'));
}catch(err){//console.log("event " + err);
	console.log("studySampleModelContent " + err);
}





window.saveDietaryAssessmentMethod = function () {
	if(window.dataBackground.dietaryAssessmentMethod == undefined){
		window.dataBackground.dietaryAssessmentMethod = [];
		window.dataBackground.dietaryAssessmentMethod.push(window.store9.getState().jsonforms.core.data);
		store6.dispatch(Actions.init(window.dataBackground, window.schema6, window.uischema6));
	}else{
		window.dataBackground.dietaryAssessmentMethod.push(window.store9.getState().jsonforms.core.data);
		store6.dispatch(Actions.init(window.dataBackground, window.schema6, window.uischema6));
	}
	    $(".table tbody tr td div div div input").removeAttr('class');
	    tableInputBootstraping($(".table tbody tr td div div div input"));
	    $(".table tbody tr td div div div").removeAttr('class');
	    $(".table tbody tr td div div").removeAttr('class');
	    $(".table tbody tr td div").removeAttr('class');
	    $(".table tbody tr td").removeAttr('class');
	    $(".table tbody tr").removeAttr('class');
	    $(".table tbody").removeAttr('class');
	    $(".table thead tr th th").removeAttr('class');
	    $(".table thead tr th").removeAttr('class');
	    $(".table thead tr").removeAttr('class');
		$(".table thead").removeAttr('class');

	    
	   $('.MuiTable-root-222').addClass('table'); 
	   $('.MuiTable-root-222').parent().addClass('table-responsive');
	   $('.MuiTable-root-222').parent().removeClass('MuiGrid-typeItem-2'); 
	   $('.MuiTable-root-222').removeClass('MuiTable-root-222');
	
}
$(parent11).append(
		"<div id='dietaryAssessmentMethod' class='modal fade' role='dialog'>\n" + 
        "  <div class='modal-dialog'>\n" + 
        "\n" + 
        "    <!-- Modal content-->\n" + 
        "    <div class='modal-content'>\n" + 
        "      <div class='modal-header'>\n" + 
        "        <button type='button' class='close' data-dismiss='modal'>&times;</button>\n" + 
        "        <h4 id='titledietaryAssessmentMethod' class='modal-title'>Modal Header</h4>\n" + 
        "      </div>\n" + 
        "      <div id='dietaryAssessmentMethodModelContent' class='modal-body'>\n" + 
        "      </div>\n" + 
        "      <div class='modal-footer'>\n" + 
        "        <button type='button' class='btn btn-default' data-dismiss='modal'>cancle</button>\n" + 
        "   	 <button id='save' onclick='window.saveDietaryAssessmentMethod()' class='btn btn-width bkgrnd-cyan save-details' data-dismiss='modal' type='button' name='save-details'>Save</button>" + 
        "      </div>\n" + 
        "    </div>\n" + 
        "\n" + 
        "  </div>\n" + 
        "</div>");
try{
	ReactDOM.render(React.createFactory(Provider)({store: window.store9},
		App()
), document.getElementById('dietaryAssessmentMethodModelContent'));
}catch(err){//
	//console.log("dietaryAssessmentMethodModelContent " + err);
}





window.saveLaboratory = function () {
	if(window.dataBackground.laboratory == undefined){
		window.dataBackground.laboratory = [];
		window.dataBackground.laboratory.push(window.store10.getState().jsonforms.core.data);
		store6.dispatch(Actions.init(window.dataBackground, window.schema6, window.uischema6));
	}else{
		window.dataBackground.laboratory.push(window.store10.getState().jsonforms.core.data);
		store6.dispatch(Actions.init(window.dataBackground, window.schema6, window.uischema6));
	}
	    $(".table tbody tr td div div div input").removeAttr('class');
	    tableInputBootstraping($(".table tbody tr td div div div input"));
	    $(".table tbody tr td div div div").removeAttr('class');
	    $(".table tbody tr td div div").removeAttr('class');
	    $(".table tbody tr td div").removeAttr('class');
	    $(".table tbody tr td").removeAttr('class');
	    $(".table tbody tr").removeAttr('class');
	    $(".table tbody").removeAttr('class');
	    $(".table thead tr th th").removeAttr('class');
	    $(".table thead tr th").removeAttr('class');
	    $(".table thead tr").removeAttr('class');
		$(".table thead").removeAttr('class');

	    
	   $('.MuiTable-root-222').addClass('table'); 
	   $('.MuiTable-root-222').parent().addClass('table-responsive');
	   $('.MuiTable-root-222').parent().removeClass('MuiGrid-typeItem-2'); 
	   $('.MuiTable-root-222').removeClass('MuiTable-root-222');
	
}
$(parent11).append(
		"<div id='laboratory' class='modal fade' role='dialog'>\n" + 
        "  <div class='modal-dialog'>\n" + 
        "\n" + 
        "    <!-- Modal content-->\n" + 
        "    <div class='modal-content'>\n" + 
        "      <div class='modal-header'>\n" + 
        "        <button type='button' class='close' data-dismiss='modal'>&times;</button>\n" + 
        "        <h4 id='titlelaboratory' class='modal-title'>Modal Header</h4>\n" + 
        "      </div>\n" + 
        "      <div id='laboratoryModelContent' class='modal-body'>\n" + 
        "      </div>\n" + 
        "      <div class='modal-footer'>\n" + 
        "        <button type='button' class='btn btn-default' data-dismiss='modal'>cancle</button>\n" + 
        "   	 <button id='save' onclick='window.saveLaboratory()' class='btn btn-width bkgrnd-cyan save-details' data-dismiss='modal' type='button' name='save-details'>Save</button>" + 
        "      </div>\n" + 
        "    </div>\n" + 
        "\n" + 
        "  </div>\n" + 
        "</div>");
try{
	ReactDOM.render(React.createFactory(Provider)({store: window.store10},
		App()
), document.getElementById('laboratoryModelContent'));
}catch(err){
	//console.log("laboratoryModelContent" + err);
}




window.saveAssay = function () {
	if(window.dataBackground.assay == undefined){
		window.dataBackground.assay = [];
		window.dataBackground.assay.push(window.store11.getState().jsonforms.core.data);
		store6.dispatch(Actions.init(window.dataBackground, window.schema6, window.uischema6));
	}else{
		window.dataBackground.assay.push(window.store11.getState().jsonforms.core.data);
		store6.dispatch(Actions.init(window.dataBackground, window.schema6, window.uischema6));
	}
	    $(".table tbody tr td div div div input").removeAttr('class');
	    tableInputBootstraping($(".table tbody tr td div div div input"));
	    $(".table tbody tr td div div div").removeAttr('class');
	    $(".table tbody tr td div div").removeAttr('class');
	    $(".table tbody tr td div").removeAttr('class');
	    $(".table tbody tr td").removeAttr('class');
	    $(".table tbody tr").removeAttr('class');
	    $(".table tbody").removeAttr('class');
	    $(".table thead tr th th").removeAttr('class');
	    $(".table thead tr th").removeAttr('class');
	    $(".table thead tr").removeAttr('class');
		$(".table thead").removeAttr('class');

	    
	   $('.MuiTable-root-222').addClass('table'); 
	   $('.MuiTable-root-222').parent().addClass('table-responsive');
	   $('.MuiTable-root-222').parent().removeClass('MuiGrid-typeItem-2'); 
	   $('.MuiTable-root-222').removeClass('MuiTable-root-222');
	
}
$(parent11).append(
		"<div id='assay' class='modal fade' role='dialog'>\n" + 
        "  <div class='modal-dialog'>\n" + 
        "\n" + 
        "    <!-- Modal content-->\n" + 
        "    <div class='modal-content'>\n" + 
        "      <div class='modal-header'>\n" + 
        "        <button type='button' class='close' data-dismiss='modal'>&times;</button>\n" + 
        "        <h4 id='titleassay' class='modal-title'>Modal Header</h4>\n" + 
        "      </div>\n" + 
        "      <div id='assayModelContent' class='modal-body'>\n" + 
        "      </div>\n" + 
        "      <div class='modal-footer'>\n" + 
        "        <button type='button' class='btn btn-default' data-dismiss='modal'>cancle</button>\n" + 
        "   	 <button id='save' onclick='window.saveAssay()' class='btn btn-width bkgrnd-cyan save-details' data-dismiss='modal' type='button' name='save-details'>Save</button>" + 
        "      </div>\n" + 
        "    </div>\n" + 
        "\n" + 
        "  </div>\n" + 
        "</div>");
try{
	ReactDOM.render(React.createFactory(Provider)({store: window.store11},
		App()
), document.getElementById('assayModelContent'));
}catch(err){
	//console.log("assayModelContent" + err);
}
///////////////////////
/*window.popupschemapopulationSpan= require('./StringObjectModel.json');
window.popupuischemapopulationSpan = require('./StringObjectView.json');
window.populationSpanstore = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
window.populationSpanstore.dispatch(Actions.init({}, window.popupschemapopulationSpan, window.popupuischemapopulationSpan));
window.savepopulationSpan = function () {
	
		//console.log(window.toBeReplacedMap["Population Group"].getState().jsonforms.core.data);		
		window.toBeReplacedMap["Population Group"].getState().jsonforms.core.data.populationSpan.push(window.populationSpanstore.getState().jsonforms.core.data);
		var parentxc ;
		var areaName;
		try{
				value = document.getElementById("Population Group");
				parentxc = value.parentNode;
				
				
				$(value).remove();
				$(parentxc).append( "<div id ='Population Group' class='replaced' ></div>" );
				ReactDOM.render(React.createFactory(Provider)({store: window.toBeReplacedMap["Population Group"]},
						App()
				), document.getElementById("Population Group"));
				
		}catch(err){
			//console.log("loop ",parentxc, err);
		}
}
$(parent9).append(
		"<div id='populationSpan' class='modal fade' role='dialog'>\n" + 
        "  <div class='modal-dialog'>\n" + 
        "\n" + 
        "    <!-- Modal content-->\n" + 
        "    <div class='modal-content'>\n" + 
        "      <div class='modal-header'>\n" + 
        "        <button type='button' class='close' data-dismiss='modal'>&times;</button>\n" + 
        "        <h4 id='titlepopulationSpan' class='modal-title'>Modal Header</h4>\n" + 
        "      </div>\n" + 
        "      <div id='populationSpanModelContent' class='modal-body'>\n" + 
        "      </div>\n" + 
        "      <div class='modal-footer'>\n" + 
        "        <button type='button' class='btn btn-default' data-dismiss='modal'>cancle</button>\n" + 
        "   	 <button id='save' onclick='window.savepopulationSpan()' class='btn btn-width bkgrnd-cyan save-details' data-dismiss='modal' type='button' name='save-details'>Save</button>" + 
        "      </div>\n" + 
        "    </div>\n" + 
        "\n" + 
        "  </div>\n" + 
        "</div>");
try{
	ReactDOM.render(React.createFactory(Provider)({store: window.populationSpanstore},
		App()
), document.getElementById('populationSpanModelContent'));
}catch(err){//console.log("event " + err);

}*/



//////////////////////
var StringObjectPopupsName = ['populationSpan','populationDescription','bmi','specialDietGroups','region','country','populationRiskFactor','season','patternConsumption','populationAge'];
//popup populationGroup
window.store5 = createStore(
		  combineReducers({ jsonforms: jsonformsReducer() }),  
		  {
		    jsonforms: {
		      renderers: materialRenderers,
		      fields: materialFields,
		    }
		  }
		);
window.store5.dispatch(Actions.init({}, window.schema5, window.uischema5));
window.store5.getState().jsonforms.core.data.populationName = window.store5.getState().jsonforms.core.data.populationName != null ?window.store5.getState().jsonforms.core.data.populationName:"";
window.store5.getState().jsonforms.core.data.targetPopulation = window.store5.getState().jsonforms.core.data.targetPopulation != null ?window.store5.getState().jsonforms.core.data.targetPopulation:"";

$.each(StringObjectPopupsName, function( index, value ) {
	window.store5.getState().jsonforms.core.data[value] = window.store5.getState().jsonforms.core.data[value] != null ?window.store5.getState().jsonforms.core.data[value]:[];
});
//console.log(window.store5.getState().jsonforms.core.data);
window.savepopulationGroup = function () {
	
	if(window.scope.populationGroup == undefined){
		window.scope.populationGroup = [];
		window.scope.populationGroup.push(window.store5.getState().jsonforms.core.data);
		window.store2.dispatch(Actions.init(window.scope, window.schema2, window.uischema2));
	}else{
		window.scope.populationGroup.push(window.store5.getState().jsonforms.core.data);
		window.store2.dispatch(Actions.init(window.scope, window.schema2, window.uischema2));
	}
    
    $(".table tbody tr td div div div input").removeAttr('class');
    tableInputBootstraping($(".table tbody tr td div div div input"));
    $(".table tbody tr td div div div").removeAttr('class');
    $(".table tbody tr td div div").removeAttr('class');
    $(".table tbody tr td div").removeAttr('class');
    $(".table tbody tr td").removeAttr('class');
    $(".table tbody tr").removeAttr('class');
    $(".table tbody").removeAttr('class');
    $(".table thead tr th th").removeAttr('class');
    $(".table thead tr th").removeAttr('class');
    $(".table thead tr").removeAttr('class');
	$(".table thead").removeAttr('class');

    
   $('.MuiTable-root-222').addClass('table'); 
   $('.MuiTable-root-222').parent().addClass('table-responsive');
   $('.MuiTable-root-222').parent().removeClass('MuiGrid-typeItem-2'); 
   $('.MuiTable-root-222').removeClass('MuiTable-root-222');
}

$(parent9).append(
		"<div id='populationGroup' class='modal fade' role='dialog'>\n" + 
        "  <div class='modal-dialog'>\n" + 
        "\n" + 
        "    <!-- Modal content-->\n" + 
        "    <div class='modal-content'>\n" + 
        "      <div class='modal-header'>\n" + 
        "        <button type='button' class='close' data-dismiss='modal'>&times;</button>\n" + 
        "        <h4 id='titlepopulationGroup' class='modal-title'>Modal Header</h4>\n" + 
        "      </div>\n" + 
        "      <div id='populationGroupModelContent' class='modal-body'>\n" + 
        "      </div>\n" + 
        "      <div class='modal-footer'>\n" + 
        "        <button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>\n" + 
        "   	 <button id='save' onclick='window.savepopulationGroup()' class='btn btn-width bkgrnd-cyan save-details' data-dismiss='modal' type='button' name='save-details'>Save</button>" + 
        "      </div>\n" + 
        "    </div>\n" + 
        "\n" + 
        "  </div>\n" + 
        "</div>");

try{
ReactDOM.render(React.createFactory(Provider)({store: window.store5},
		App()
), document.getElementById('populationGroupModelContent'));
}catch(err){
	//console.log("reference " + err);
}
/*$("#populationGroupModelContent button[aria-describedby*='tooltip-add']").click(function(event) {
	
	currentArea = window.makeId($(this).attr('aria-label'));
	console.log(currentArea);
	event.preventDefault(); // Let's stop this event.
    event.stopPropagation(); // Really this time.
    $('#ptitle'+currentArea).text(currentArea);
    $('#p'+currentArea).modal('show');
});
window.popupFunctions = {};
window.popupschema = {};
window.popupuischema = {};
window.popupstore = {};
$.each(StringObjectPopupsName, function( index, value ) {	
	window.popupschema[value]= require('./StringObjectModel.json');
	window.popupuischema[value] = require('./StringObjectView.json');
	window.popupstore[value] = createStore(
			  combineReducers({ jsonforms: jsonformsReducer() }),  
			  {
			    jsonforms: {
			      renderers: materialRenderers,
			      fields: materialFields,
			    }
			  }
			);
	
	window.popupstore[value].dispatch(Actions.init({}, window.popupschema[value], window.popupuischema[value]));
	window.popupFunctions['save'+value]=
										"window.store5.getState().jsonforms.core.data."+value+".push(window.popupstore."+value+".getState().jsonforms.core.data);"+
										"var parentxc ;"+
										"var areaName;"+
										
										"cdiv = document.getElementById(\"populationGroupModelContent\");" +
										"console.log(cdiv);"+
										"parentxc = cdiv.parentNode;"+
										
										
										"$(cdiv).remove();"+
										"$(parentxc).append(\" <div id=&#39;populationGroupModelContent&#39; class=&#39;modal-body&#39;>\" );"+
										"ReactDOM.render(React.createFactory( window.Provider)({store: window.store5},"+
										"		window.App()"+
										"), document.getElementById(\"populationGroupModelContent\"));"+
										"$(\"[aria-describedby*=&#39;tooltip-add&#39;]\").click(function(event) {"+
        	
								        	"currentArea = window.makeId($(this).attr(&#39;aria-label&#39;));"+
								        	"console.log(currentArea);"+
								        	"event.preventDefault(); "+
								            "event.stopPropagation();"+
								            "$(&#39;#title&#39;+currentArea).text(currentArea);"+
								            "$(&#39;#&#39;+currentArea).modal(&#39;show&#39;);"+
								        "});";
												
										
	
	 
	$(parent9).append(
			"<div id='p"+value+"' class='modal fade' role='dialog'>\n" + 
	        "  <div class='modal-dialog'>\n" + 
	        "\n" + 
	        "    <!-- Modal content-->\n" + 
	        "    <div class='modal-content'>\n" + 
	        "      <div class='modal-header'>\n" + 
	        "        <button type='button' class='close' data-dismiss='modal'>&times;</button>\n" + 
	        "        <h4 id='ptitle"+value+"' class='modal-title'>Modal Header</h4>\n" + 
	        "      </div>\n" + 
	        "      <div id='p"+value+"ModelContent' class='modal-body'>\n" + 
	        "      </div>\n" + 
	        "      <div class='modal-footer'>\n" + 
	        "        <button type='button' class='btn btn-default' data-dismiss='modal'>cancle</button>\n" + 
	        "   	 <button id='save"+value+"' onclick='"+window.popupFunctions['save'+value]+"' class='btn btn-width bkgrnd-cyan save-details' data-dismiss='modal' type='button' name='save-details'>Save</button>" + 
	        "      </div>\n" + 
	        "    </div>\n" + 
	        "\n" + 
	        "  </div>\n" + 
	        "</div>");
	try{
		ReactDOM.render(React.createFactory(Provider)({store: window.popupstore[value]},
			App()
	), document.getElementById('p'+value+'ModelContent'));		
	console.log(value);
	}catch(err){
		console.log(value + err);
	}
});*/


