import { connectMongoDB } from "@/lib/mongodb";
    import Data from "@/models/data";
import { NextRequest, NextResponse } from "next/server";
export async function PUT(request:any, {params}:{params:any}){
    const {id}= params;
    const {title, flag}=await request.json();

    await connectMongoDB();
    await Data.findByIdAndUpdate(id,{title,flag});
    return NextResponse.json({message:"Topic Updated."},{status:200})
}

export async function GET({params}:{params:any}){
    
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
    }
    
}


export async function DELETE({params}){
    await connectMongoDB();
    console.log(params);
    const {id}= params
    

    await Data.findByIdAndDelete(id);
    
    return NextResponse.json({message:"Task Deleted."},{status:201})
}