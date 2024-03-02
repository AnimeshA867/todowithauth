import { connectMongoDB } from "@/lib/mongodb";
    import Data from "@/models/data";
import { NextRequest, NextResponse } from "next/server";
export async function PUT(request:any, {params}:{params:{id:String}}){
    try{
        console.log("THis put fuctnion")
        const {id}= params;
        console.log(id)
        const {title, flag}=await request.json();
        
        await connectMongoDB();
        await Data.findByIdAndUpdate(id,{title,flag});
        return NextResponse.json({message:"Topic Updated."},{status:200})
    }catch(error){
        return NextResponse.json({message:"Error updating."},{status:501})
    }
}

export async function GET(req:any,{params}:{params:{id:String}}){
    
    await connectMongoDB();
    
    try{
        const {id}=params;

        const data=await Data.findById(id)
        if(data){
            return NextResponse.json(data,{status:200})
        }
        else{
            throw new Error("Unable to get the data.")
        }
    }catch(error){
        console.log(error);
        return NextResponse.json({message:"Unable to get the data."},{status:404})
    }
    
}


export async function DELETE(req:any,{params}:{params:{id:String}}){
    await connectMongoDB();
    
    const {id}= params
    

    await Data.findByIdAndDelete(id);
    
    return NextResponse.json({message:"Task Deleted."},{status:200})
}