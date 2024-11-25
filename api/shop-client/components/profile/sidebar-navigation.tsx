"use client"
import { Dictionary } from "@/lib/get-dictionary";
import { HomeIcon, KeyIcon, ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
    dictionary: Dictionary
}


export default function SidebarNavigation({dictionary}: Props) {
    const common_dictionary = dictionary.common;
    const profile_dictionary = dictionary.profile;
    const pathname = usePathname();
    const slug = pathname.split('/').pop();
    const subNavigation = [
        {
          name: common_dictionary.profile,
          icon: UserCircleIcon,
          current: slug === 'profile' || slug === '',
          href: '/profile/profile'
        },
        {
          name: profile_dictionary.addresses,
          icon: HomeIcon,
          current: slug === 'addresses',
          href: '/profile/addresses'
        },
        {
          name: profile_dictionary.password,
          icon: KeyIcon,
          current: slug === 'password',
          href: '/profile/password'
        },
        {
          name: profile_dictionary.orders,
          icon: ShoppingCartIcon,
          current: slug === 'orders',
          href: '/profile/orders'
        }
      ];
    return (
        <nav className="space-y-1">
                {subNavigation.map((item) => (
                  <Link
                    href={item.href}
                    key={item.name}
                    // onClick={() => item.onClick()}
                    className={clsx(
                      'cursor-pointer',
                      item.current
                        ? 'border-red-500 bg-red-50 text-red-700 hover:bg-red-50 hover:text-red-700'
                        : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                      'group flex items-center border-l-4 px-3 py-2 text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    <item.icon
                      className={clsx(
                        item.current
                          ? 'text-red-500 group-hover:text-red-500'
                          : 'text-gray-400 group-hover:text-gray-500',
                        '-ml-1 mr-3 h-6 w-6 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    <span className="truncate">{item.name}</span>
                  </Link>
                ))}
              </nav>
    )
}