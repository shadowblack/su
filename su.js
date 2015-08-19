/***
* @author: Luis Marin
* https://www.facebook.com/ninja.aoshi
* https://ve.linkedin.com/pub/luis-marin/27/a3b/780
*/
(function($){
	$.fn.extend({
		comboEnlazado:function(propiedades){
			var aObjetos = [];
			var shtml = [];
			aSelected = [];
			
			propiedades_default = {
				onload : false,
				selected : true
			}
			
			propiedades = jQuery.extend(propiedades_default , propiedades);					
			
			/*return*/
			this.each(function(){				

				jQuery(this).each(function(i,valor){
					aObjetos.push(jQuery(valor));
				});
				
			});
									
			jQuery(aObjetos).each(function(i,objeto){
	
				if (aObjetos[i+1] !== undefined)
					shtml[i] = aObjetos[i+1].html();
					
				jQuery(objeto).change(function(){
					var aEliminar = Array();
					
					if (aObjetos[i+1] !== undefined){
										
						aObjetos[i+1].html(shtml[i]);				
						
						// comprobando que el arreglo este lleno ya que el mismo declara mas no se asigna al principio
						if (aSelected[i] !==undefined)					
							aObjetos[i+1].val(aSelected[i+1]);				
						
						//buscando elementos seleccionados en los cambos anteriores y el actual
						for(y = i; y >= 0; y-- ){
							if (aObjetos[y].val() !=="" && aObjetos[y].val() !=="-1" && aObjetos[y].val() !== null && aObjetos[y].val().length !==0)
								aEliminar.push(aObjetos[y].val());
						}
						
						// removiendo elementos "options" que se encuentran seleccionados en elementos anteriores
						jQuery(aEliminar).each(function(z,obj){						
								aObjetos[i+1].find("option[value='"+aEliminar[z]+"']").remove();										
						});
						
						//self.ordenarCombo(aObjetos[i+1]);
					}					    
					jQuery(aObjetos[i+1]).trigger("change");
					
					//guardando en memoria las posiciones actuales del evento "change" del elemento seleccionado
					if (propiedades.selected===true)
						aSelected[i]=aObjetos[i].val();				
				});		
			});
			if (propiedades.onload === true)
				aObjetos[0].trigger("change");
		}
	});
})(jQuery);