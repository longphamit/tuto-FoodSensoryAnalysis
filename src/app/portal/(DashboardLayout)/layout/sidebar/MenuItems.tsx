import {
    IconAperture,
    IconCopy,
    IconFile,
    IconLayoutDashboard,
    IconLogin,
    IconMoodHappy,
    IconQuestionMark,
    IconStack,
    IconTypography,
    IconUserPlus,
} from "@tabler/icons-react";

import {uniqueId} from "lodash";

const Menuitems: MenuItem[] = [
    {
        navlabel: true,
        subheader: "Trang chủ",
    },
    {
        id: uniqueId(),
        title: "Quiz",
        icon: IconStack,
        href: "/portal/pages/quizs",
    },
    {
        id: uniqueId(),
        title: "Quản lý tài khoản",
        icon: IconStack,
        authorities: ["ROLE_ADMIN"],
        href: "/portal/pages/accounts",
    },
    {
        navlabel: true,
        subheader: "Auth",
    },
    {
        id: uniqueId(),
        title: "Logout",
        icon: IconLogin,
        href: "/portal/signout",
    },
];

interface MenuItem {
  id?: string;
  subheader?: string; // Có thể undefined
  authorities?: string[]; // Có thể undefined, kiểu mảng của authorities
  title?: string; // Tiêu đề của mục, không giới hạn cụ thể
  navlabel?: boolean; // Đặt kiểu là boolean để xác định mục có phải là nhãn điều hướng không
  href?: string; // Đường dẫn href có thể undefined nếu không phải mục có liên kết
  icon?: any; // Kiểu của icon, để kiểu any nếu không rõ loại cụ thể
}

export default Menuitems;
