'use client'

import { FormEvent, useState } from "react"
import Image from "next/image"
import send from  "../../public/send.svg"


export default function Chat() {

    type Message = {
        sender: string
        id: string
        msg: string
    }

    const defaultChat: Message[] = []

    const [chat, setChat] = useState(defaultChat)
    const [message, setMessage] = useState('')
    const [botTyping,setbotTyping] = useState(false)

    const rasaAPI = async function handleClick(name: string, msg: string) {
        

          await fetch('http://localhost:5005/webhooks/rest/webhook', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'charset':'UTF-8',
            },
            credentials: "same-origin",
            body: JSON.stringify({ "sender": name, "message": msg }),
        })
        .then(response => response.json())
        .then((response) => {
            if(response){
                const temp = response[0]
                const recipient_id = temp["recipient_id"]
                const recipient_msg = temp["text"]

                const response_temp = {sender: "bot", id : recipient_id, msg: recipient_msg}
                
                setbotTyping(false);

                setChat(chat => [...chat, response_temp])
            }
            else{
                window.alert("Please enter valid message");
            }
        }) 
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const name = "test";
        const request_temp = {sender : "user", id : name , msg : message}
        
        if(message !== ""){
            
            setChat(chat => [...chat, request_temp])
            setbotTyping(true)
            setMessage('')
            rasaAPI(name,message)
        }
        else{
            window.alert("Please enter valid message");
        }
        
    }
    

    

    return (
        <main className="text-white h-screen w-screen">
            <div className='flex flex-col bg-emerald-500 p-2 h-full w-full'>
                <div className='flex flex-col-reverse overflow-y-auto no-scrollbar h-full w-full  border-gray-500 bg-white border-b-0' >
                    {chat.toReversed().map((user,key) => (
                        <div className='flex flex-col p-4' key={key}>
                            {user.sender==='bot' ?
                                (
                                    
                                    <div className='self-start  rounded-lg w-3/4 p-2 bg-green-400'>
                                        <h6 className='text-xs'>{user.sender}</h6>
                                        <h5 className="botmsg p-2">{user.msg}</h5>
                                    </div>
                                
                                )
                                :(
                                    <div className="self-end  rounded-lg w-3/4 p-2 bg-blue-500">
                                        <h5 className="usermsg p-2 break-words">{user.msg}</h5>
                                    </div>
                                )
                            }
                        </div>
                    ))}
                </div>
                
                <form className='flex justify-between items-center bg-white p-4'  onSubmit={handleSubmit}>
                    <textarea rows={1} className=' w-5/6 h-14 rounded-lg  bg-slate-800 p-2 outline-none no-scrollbar resize-none' onChange={e => setMessage(e.target.value)} value={message}></textarea>

                    <button type="submit" className="flex justify-center items-center w-10 h-10 bg-blue-500  aspect-square rounded-full" >
                        <Image
                            alt=""
                            width={10}
                            height={10}
                            src={send}
                            className=' w-2/4 text-white'
                        />
                    </button>
                </form> 
            </div>
        </main>
    )
}