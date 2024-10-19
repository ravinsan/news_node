import Menu from "../models/menu.model.js";

export const menulist = async (req, res) =>{
    try{
          const menu = await Menu.find().sort({ createdAt: -1 });

          return res.status(200).json({success: true, message:"Menu Records has been successfully get.", data: menu});
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}

export const menuStore = async (req, res) => {
      const {name, slug, url, parent_id, order, icon, status} = req.body;

    try{
         const data = {
             name: name,
             slug: slug,
             url: url,
             parent_id: parent_id,
             order: order,
             icon: icon,
             status: status
         }

         const menu = await Menu.create(data);

         if(!menu) return res.status(400).json({message: "Menu not created"});
         
         return res.status(200).json({success: true, message:"Menu has been successfully created.", data: menu});
    }
    catch(err){
        return res.status(500).json({message: err.message});   
    }
}