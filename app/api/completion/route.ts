import {generateText} from "ai"
import {google} from "@ai-sdk/google"
import { error } from "console";

export async function POST(req: Request){
    try{
        const {prompt} = await req.json();

        const {text} = await generateText({
            model: google('gemini-2.5-flash'),
            prompt,
        })

        return Response.json({text});
    }catch(err){
        console.log("Error while generating text", err);
        return Response.json({err : "Failed to generate text"},{status:500});
    }
}