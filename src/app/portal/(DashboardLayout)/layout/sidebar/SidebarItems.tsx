import React from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import {getSession} from "next-auth/react";

const SidebarItems = async({ toggleMobileSidebar }: any) => {
  const pathname = usePathname();
  const pathDirect = pathname;
  const session = await getSession();
  return (
   session? <Box sx={{ px: 3 }}>
       <List sx={{ pt: 0 }} className="sidebarNav" component="div">
           {Menuitems.map((item) => {
               if(item?.authorities){
                   if(session?.user?.authorities?.some(author=>item?.authorities?.includes(author.authority))){
                       // {/********SubHeader**********/}
                       if (item.subheader) {
                           return <NavGroup item={item} key={item.subheader} />;

                           // {/********If Sub Menu**********/}
                           /* eslint no-else-return: "off" */
                       } else {
                           return (
                               <NavItem
                                   item={item}
                                   key={item.id}
                                   pathDirect={pathDirect}
                                   onClick={toggleMobileSidebar}
                               />
                           );
                       }
                   }

               }else{
                   // {/********SubHeader**********/}
                   if (item.subheader) {
                       return <NavGroup item={item} key={item.subheader} />;

                       // {/********If Sub Menu**********/}
                       /* eslint no-else-return: "off" */
                   } else {
                       return (
                           <NavItem
                               item={item}
                               key={item.id}
                               pathDirect={pathDirect}
                               onClick={toggleMobileSidebar}
                           />
                       );
                   }
               }

           })}
       </List>
   </Box>:<></>
  );
};
export default SidebarItems;
