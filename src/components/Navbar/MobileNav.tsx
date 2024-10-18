"use client";

import React from 'react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  { route: "/", label: "Home", imgURL: "/icons/home.svg" },
  { route: "/about", label: "About", imgURL: "/icons/about.svg" },
  { route: "/services", label: "Services", imgURL: "/icons/services.svg" },
  { route: "/contact", label: "Contact", imgURL: "/icons/contact.svg" },
];

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <section className='w-full max-w-[264px]'>
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/assets/person.png"
            width={36}
            height={36}
            alt='hamburger'
            className='cursor-pointer rounded-full sm:hidden'
          />
        </SheetTrigger>
        <SheetContent side="left" className='border-none bg-gray-600'>
          <Link 
            href="/"
            className='flex items-center gap-1'
          >
            
            <p className='text-[26px] font-extrabold text-white'>health care</p>
          </Link>
          <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
            <SheetClose asChild>
              <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                {links.map((link) => {
                  const isActive = pathname === link.route;
                  return (
                    <SheetClose asChild key={link.route}>
                      <Link
                        href={link.route}
                        className={cn('flex gap-4 items-center p-4 rounded-lg w-full max-w-60', {
                          'bg-blue-1': isActive,
                        })}
                      >
                        <Image
                          src={link.imgURL}
                          alt={link.label}
                          width={20}
                          height={20}
                        />
                        <p className='font-semibold'>{link.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
