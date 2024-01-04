import { connectMongoDB } from "@/lib/mongodb"
import {User} from "@/models/user";
import bcrypt from "bcryptjs"
import { NextRequest, NextResponse } from "next/server";
export async function POST(req:NextRequest){
    await connectMongoDB();
    try{

        const {name,email,password}=await req.json();
        
        const userExists:boolean|null= await User.findOne({email});
        
        if(userExists){
            throw new Error("User already exists.");
        }
        else{
            const hashedPassword= await bcrypt.hash(password,10)

            await User.create({name,email,password:hashedPassword})
            return NextResponse.json({message:"User Registration Sucessfull."},{status:501})
        }

    }catch(error){
        console.log("Error: ",error);
        return new Response(JSON.stringify(error), {status: 500})    }

}