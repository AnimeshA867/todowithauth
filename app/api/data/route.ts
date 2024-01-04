import { connectMongoDB } from "@/lib/mongodb";
import Data from "@/models/data";
import { NextRequest, NextResponse } from "next/server";
import {User} from "@/models/user";
import { NextURL } from "next/dist/server/web/next-url";


export async function POST(req:any){
    await connectMongoDB();
    try{
        const {title,flag,email}=await req.json();
        const autherId= await User.findOne({email});

        await Data.create({title,flag,autherId})
        return NextResponse.json({message:"Data added successfully."},{status:200})
    }catch(error){
        console.log(error);
        return NextResponse.json({message:"Data adding failed."},{status:501})
    }
}


export async function GET(req:NextRequest){
    await connectMongoDB();

       try {
       const searchParams = req.nextUrl.searchParams
  const email = searchParams.get('email')
      
        console.log(email)
            // Find the user with the given email
            const user = await User.findOne({ email });

            if (user) {
                // If the user is found, find data with matching autherId
                const filteredData = await Data.find({ autherId: user._id });

                // Respond with the filtered data
                return NextResponse.json(filteredData,{status:201});
            } else {
                // Handle the case where the user is not found
                throw new Error("User not found.")
            }
        } catch (error) {
            // Handle other errors
            console.error(error);
            return NextResponse.json({message:"Internal Server Error"},{status:500})
        }

}

export async function DELETE(req:NextRequest){
    await connectMongoDB();
    const filter= req.nextUrl.searchParams.get('deleteall')

    await Data.deleteMany({flag:filter});
    
    return NextResponse.json({message:"Deleted all with filter."},{status:201})
}