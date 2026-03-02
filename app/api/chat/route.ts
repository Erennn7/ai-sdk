import {streamText,UIMessage,convertToModelMessages} from "ai"
import { google } from "@ai-sdk/google"


export async function POST(req:Request){
    try{
        const {messages}:{ messages : UIMessage[]} = await req.json();

        const result = streamText({
            model:google('gemini-2.5-flash'),
            messages:await convertToModelMessages(messages),
        }) 
        // convertToModelMessages removes all unnecessary chat data
        //  like timestamps and formats it acc to the agent in usee
        return result.toUIMessageStreamResponse();
    }catch(error){
        console.log("Error streaming chat completion",error);
        return new Response("Failed to stream chat completion",{status:500})
    }
}