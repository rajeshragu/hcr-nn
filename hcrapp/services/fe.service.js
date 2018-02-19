// Saving the context of this module inside the _the variable
_this = this;

exports.sendElements = async function(){
    try{
        let outputData = [
            {
              'address': {
                label: 'Address',
                value: '',
                type: 'textarea',
                rows: 2,
                cols: 10,
                validation: {
                  required: false
                }
              },
              'mobile': {
                label: 'Mobile',
                value: '',
                type: 'text',
                validation: {
                  required: true
                }
              }
            }
        ];

        return outputData;
    }catch(e){      
        // return a Error message describing the reason     
        throw Error("Error while generating output in service.")
    }    
}