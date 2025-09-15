import { createClient } from "@supabase/supabase-js";

const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqbHp4enltbXdtaHFycnhsdW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4MzU2MTIsImV4cCI6MjA3MzQxMTYxMn0.wjWLZJmMslHUjg2vJFl_GQ3PKYKeo_vdhlQByRHUe1A";
const supabaseUrl = "https://bjlzxzymmwmhqrrxlunp.supabase.co";

const supabase = createClient(supabaseUrl, anonKey); //connecting to supabase...

export default function mediaUpload(file){
    return new Promise((resolve, reject) => {
       if(file == null){
        reject("No file selected");
       } else {
        const timestamp = new Date().getTime();
        const fileName =  timestamp + file.name;

        supabase.storage.from("images").upload(fileName, file, {
            upsert: false,
            cacheControl: '3600',
        }).then(
            ()=>{
                const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
                
                resolve(publicUrl);
            }
        ).catch(
            ()=>{
                reject("An error occured")
            }
        )
       }
    });
}

  