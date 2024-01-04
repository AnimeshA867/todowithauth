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

export async function GET(req:NextRequest,{params}:{params:any}){
    const {id}=params;
    await connectMongoDB();
    try{

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
    const {id}= params

    await Data.findByIdAndDelete(id);
    
    return NextResponse.json({message:"Task Deleted."},{status:201})
}