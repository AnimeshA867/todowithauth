import mongoose , {Mongoose, Schema, models} from 'mongoose';

const dataSchema = new Schema({
    
    title:{
        type:String,
        required:true,
    },
    flag:{
        type:String,
        required:true,
    },
   
    autherId:{
        type:mongoose.Schema.Types.ObjectId,
        
        
    }

},
{timestamps:true})

const Data = models.Data||mongoose.model("Data",dataSchema);

export default Data;