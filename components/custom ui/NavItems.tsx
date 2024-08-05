import {
    Bell,
    BriefcaseBusiness,
    Home,
    MessageCircleMore,
    Users
} from "lucide-react";
import Link from "next/link";
import React from "react";

interface NavItems {
    src: string,
    icon: JSX.Element,
    label: string
}


const navItems: NavItems[] = [
    {
        src: '/',
        icon: < Home />,
        label: "Home"
    },
    {
        src: '/network',
        icon: <Users />,
        label: "My Network"
    },
    {
        src: '/job',
        icon: <BriefcaseBusiness />,
        label: "Jobs"
    },
    {
        src: '/message',
        icon: <MessageCircleMore />,
        label: "Messaging"
    },
    {
        src: '/notification',
        icon: <Bell />,
        label: "Notification"
    },
]

const NavItems = () => {
    return (
        <div className="flex gap-8">
            {
                navItems.map((navItems, index) => {
                    return (
                        <div
                            className="flex flex-col items-center cursor-pointer text-gray-700 hover:text-red-500"
                            key={index}
                        >
                            <span>
                                {navItems.icon}
                            </span>
                            <Link
                                className="text-xs"
                                href={navItems.src}
                            >
                                {navItems.label}
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default NavItems