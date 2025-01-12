'use client';
import cn from 'clsx';
import Link from 'next/link';
import { FC, useState } from 'react';
import s from './i18n-widget.module.css';
import ClickOutside from '@/lib/click-outside';
import Image from 'next/image';
import greekIcon from '@/assets/images/flag-el.svg';
import usIcon from '@/assets/images/flag-en-us.svg';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n-config';
interface LOCALE_DATA {
  name: string;
  img: {
    file: any;
    alt: string;
  };
}

const LOCALES_MAP: Record<string, LOCALE_DATA> = {
  el: {
    name: 'Ελληνικά',
    img: {
      file: greekIcon,
      alt: 'Greek Flag'
    }
  },
  en: {
    name: 'English',
    img: {
      file: usIcon,
      alt: 'US Flag'
    }
  }
};

const I18nWidget: FC = () => {
  const [display, setDisplay] = useState(false);
  const { defaultLocale, locales } = i18n;
  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };
  const pathname = usePathname();

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  const locale = pathnameHasLocale ? pathname.split('/')[1] : defaultLocale;

  const options = locales?.filter((val) => val !== locale);
  
  const currentLocale = locale || defaultLocale;
  return (
    <ClickOutside active={display} onClick={() => setDisplay(false)}>
      <nav
        className={s.root}
        onClick={() => {
          setDisplay(!display);
        }}
      >
        <div className="relative flex items-center">
          <button className={s.button} aria-label="Language selector">
            <Image
              width="20"
              height="20"
              className="block w-5"
              src={LOCALES_MAP[currentLocale]?.img.file}
              alt={LOCALES_MAP[currentLocale]?.img.alt || 'No flag found'}
              unoptimized
            />
            {options && (
              <span className="ml-1 cursor-pointer">
                <ChevronRightIcon
                  //   className="h-4 text-black"
                  className={cn(s.icon, { [s.active as string]: display })}
                />
              </span>
            )}
          </button>
        </div>
        <div className="absolute right-0 top-0">
          {options?.length && display ? (
            <div className={s.dropdownMenu}>
              <ul className="w-14">
                {options.map((locale) => (
                  <li key={locale}>
                    <Link
                      href={redirectedPathName(locale)}
                      //   href={pathname}
                      //   locale={locale}
                      className={cn(s.item)}
                      onClick={() => {
                        setDisplay(false);
                      }}
                    >
                      <Image
                        alt=""
                        src={LOCALES_MAP[locale]?.img.file}
                        width="20"
                        height="20"
                        className="block w-6"
                      ></Image>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </nav>
    </ClickOutside>
  );
};

export default I18nWidget;
