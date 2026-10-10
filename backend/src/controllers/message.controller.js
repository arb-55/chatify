import Message from "../models/message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";

export const getAllContacts =async (req,res)=>{
    try{
        const loggedInUserId =req.user._id;
        const filteredUsers =await User.find({_id: { $ne: loggedInUserId }}).select("-password")

        res.status(200).json(filteredUsers);
    }catch(error){
        console.log("Error in getting all contacts: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const getMessageByUserId=async(req,res)=>{
    try{
        const myId=req.user._id;
        const {id:userToChatId}=req.params;

        //me and u
        //you send me the message
        //i send you the msg
        const messages= await Message.find({

            $or:[
                {senderId:myId , receiverId:userToChatId},
                {senderId:userToChatId , receiverId:myId},
            ]
        });

        res.status(200).json(messages);
    }catch(error){
        console.log("Error in getting messages: ", error.message);
    
    }
};
export const sendMessage= async(req,res)=>{
    try{
        const{text,image}=req.body;
        const{id:receiverId}=req.params;
        const senderId=req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse =await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }   
        

        const message=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });
        await message.save();
        res.status(201).json(message);
    }catch(error){
        console.log("Error in sending message: ", error.message);
    
    }
};
export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId }
            ],
        });
        const chatPartnersIds = [
            ...new Set(
                messages.map((msg) =>
                    msg.senderId.toString() === loggedInUserId.toString()
                        ? msg.receiverId.toString()
                        : msg.senderId.toString()
                )
            )
        ];
        const chatPartners = await User.find({ _id: { $in: chatPartnersIds } }).select("-password");
        res.status(200).json(chatPartners);
    } catch (error) {
        console.error("Error in getChatPartners:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
