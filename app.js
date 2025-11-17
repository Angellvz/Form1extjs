Ext.onReady(function(){

    var store = Ext.create('Ext.data.Store',{
        fields: ['tra_ide','tra_cod','tra_nom','tra_pat','tra_mat','est_ado'],

        //Conexion al backend
        proxy: {
            type: 'ajax',               
            url: 'backend/listar.php',  
            reader: { 
                type: 'json',
                root: 'data'          
            }
        },

        autoLoad: true  
    });

    //Formn en modal
    var form = Ext.create('Ext.form.Panel',{
        bodyPadding: 10,
        width: 300,

        // Campos del form
        items: [
            {xtype:'hidden', name:'tra_ide'},                
            {xtype:'numberfield', fieldLabel:'Codigo', name:'tra_cod'},
            {xtype:'textfield', fieldLabel:'Nombre', name:'tra_nom'},
            {xtype:'textfield', fieldLabel:'Apellido Pat.', name:'tra_pat'},
            {xtype:'textfield', fieldLabel:'Apellido Mat.', name:'tra_mat'},
        ],
        //submit
        buttons: [{
            text: 'Guardar',
            handler: function(){

                form.submit({
                    url: 'backend/guardar.php',

                    success: function(){
                        Ext.Msg.alert('OK', 'Guardado correctamente');
                        store.load();          
                        win.hide();            
                        form.getForm().reset();
                    }
                });

            }
        }]
    });

    var win = Ext.create('Ext.window.Window',{
        title: 'Trabajador',
        closeAction: 'hide',  
        modal: true,         
        width: 350,
        layout: 'fit',
        items: [form]         
    });

    //Grid principal
    var grid = Ext.create('Ext.grid.Panel',{
        title: 'Lista de Trabajadores',
        store: store,  
        // Columnas del grid
        columns: [
            {text:'ID', dataIndex:'tra_ide'},
            {text:'Codigo', dataIndex:'tra_cod'},
            {text:'Nombre', dataIndex:'tra_nom', flex:1},
            {text:'Paterno', dataIndex:'tra_pat'},
            {text:'Materno', dataIndex:'tra_mat'}
        ],
        //Buttons Crud
        height: 300,
        width: 600,
        tbar: [
            {
                text:'Nuevo',
                handler: function(){
                    form.getForm().reset();  
                    win.setTitle("Nuevo Trabajador");
                    win.show();               
                }
            },

            {
                text:'Modificar',
                handler: function(){
                    var sel = grid.getSelectionModel().getSelection()[0];

                    if(!sel){
                        Ext.Msg.alert("Error","Seleccione un registro");
                        return;
                    }
                    
                    win.setTitle("Modificar Trabajador");

                    form.getForm().loadRecord(sel);

                    win.show();
                }
            },

            {
                text:'Eliminar',
                handler: function(){
                    var sel = grid.getSelectionModel().getSelection()[0];

                    if(!sel){
                        Ext.Msg.alert("Error","Seleccione un registro");
                        return;
                    }

                    Ext.Ajax.request({
                        url:'backend/eliminar.php',
                        params:{ 
                            tra_ide: sel.data.tra_ide 
                        },

                        success:function(){
                            store.load(); 
                            Ext.Msg.alert("OK","Trabajador eliminado");
                        }
                    });
                }
            }
        ]
    });


    Ext.create('Ext.container.Viewport',{
        layout:'fit',
        items:[grid]
    });

});
