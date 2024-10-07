import React, { useState, useEffect } from "react";
import Menuitems from "./MenuItems";
import { usePathname } from "next/navigation";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { getSession } from "next-auth/react";

const SidebarItems = ({ toggleMobileSidebar }: any) => {
    const [session, setSession] = useState<any>(null);
    const pathname = usePathname();
    const pathDirect = pathname;

    const fetchSession = async () => {
        const session = await getSession();
        setSession(session);
    };

    useEffect(() => {

        fetchSession();
    }, []);

    if (!session) {
        return null; // Có thể hiển thị một loading spinner ở đây nếu cần
    }

    return (
        <Box sx={{ px: 3 }}>
            <List sx={{ pt: 0 }} className="sidebarNav" component="div">
                {Menuitems.map((item) => {
                    if (item?.authorities) {
                        if (session?.user?.authorities?.some((author: { authority: string; }) => item?.authorities?.includes(author.authority))) {
                            // {/********SubHeader**********/}
                            if (item.subheader) {
                                return <NavGroup item={item} key={item?.subheader} />;
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
                    } else {
                        // {/********SubHeader**********/}
                        if (item.subheader) {
                            return <NavGroup item={item} key={item.subheader} />;
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
        </Box>
    );
};

export default SidebarItems;
