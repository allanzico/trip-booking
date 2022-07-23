import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => { 
    const [chatMember, setChatMember] = useState([]);
    return <ChatContext.Provider  value={{ chatMember, setChatMember}} > 
        {children}
    </ChatContext.Provider>
}

export const ChatState = () => {
    return useContext(ChatContext);
}

export default ChatProvider;