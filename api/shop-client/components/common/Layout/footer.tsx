import React from 'react';
import { LINKS, SHOP_ENABLED } from '@/lib/constants';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
// import NewsLetter from '@components/common/NewsLetter';
// import useCustomer from '@vercel/commerce-local/customer/use-customer';
import { Dictionary } from '@/lib/get-dictionary';

const {
  link_privacy_policy,
  link_profile,
  link_services_dyno,
  link_services_racing_preparation,
  link_services_racing_support,
  link_services_storage,
  link_services_trackdays,
  link_services_transportation,
  link_tuning_electronics,
  link_tuning_engine,
  link_tuning_suspension
} = LINKS;

interface Props {
  dictionary: Pick<Dictionary, 'common'>;
}

export default function Footer({ dictionary }: Props) {
  //   const { data: customer } = useCustomer();
  const customer = null;
  const common_dictionary = dictionary.common;
  let useful = [
    { name: common_dictionary.privacy_policy, href: link_privacy_policy },
    { name: common_dictionary.profile, href: link_profile }
    //   { name: 'Returns & Exchanges', href: '#' },
    //   { name: 'Redeem a Gift Card', href: '#' },
  ];

  if (!customer) {
    useful = useful.slice(0, 1);
  }

  const footerNavigation = {
    services: [
      {
        name: common_dictionary.footer_services_race_prep,
        href: link_services_racing_preparation
      },
      {
        name: common_dictionary.footer_services_race_support,
        href: link_services_racing_support
      },
      {
        name: common_dictionary.footer_services_transportation,
        href: link_services_transportation
      },
      { name: common_dictionary.footer_services_storage, href: link_services_storage },
      { name: common_dictionary.footer_services_dyno, href: link_services_dyno },
      { name: common_dictionary.footer_services_trackdays, href: link_services_trackdays }
    ],
    tuning: [
      { name: common_dictionary.footer_tuning_engine, href: link_tuning_engine },
      { name: common_dictionary.footer_tuning_suspension, href: link_tuning_suspension },
      { name: common_dictionary.footer_tuning_electronics, href: link_tuning_electronics }
    ],
    shop: [
      { name: 'Bags', href: '#' },
      { name: 'Tees', href: '#' },
      { name: 'Objects', href: '#' },
      { name: 'Home Goods', href: '#' },
      { name: 'Accessories', href: '#' }
    ],
    company: [
      { name: 'Who we are', href: '#' },
      { name: 'Sustainability', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Terms & Conditions', href: '#' },
      { name: 'Privacy', href: '#' }
    ],
    useful,
    connect: [
      {
        name: 'Email',
        href: 'mailto:info@zen1one.gr <info@zen1one.gr>;'
      },
      {
        name: 'Facebook',
        href: 'https://www.facebook.com/people/ZenOne-Racing/100046373152702/'
      },
      {
        name: 'Youtube',
        href: 'https://www.youtube.com/channel/UCWbvJsdwc-LZVgvF5WxKs2A'
      }
    ]
  };

  return (
    <>
      <footer aria-labelledby="footer-heading" className="bg-gray-900 ">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="grid grid-cols-2 gap-8 xl:col-span-2">
              <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                <div>
                  <h3 className="text-sm font-medium text-white">
                    {common_dictionary.footer_services_header}
                  </h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.services.map((item) => (
                      <li key={item.name} className="text-sm">
                        <Link href={item.href} className="text-gray-300 hover:text-white">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Tuning</h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.tuning.map((item) => (
                      <li key={item.name} className="text-sm">
                        <Link href={item.href} className="text-gray-300 hover:text-white">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {SHOP_ENABLED && false && (
                  <div>
                    <h3 className="text-sm font-medium text-white">Shop</h3>
                    <ul role="list" className="mt-6 space-y-6">
                      {footerNavigation.shop.map((item) => (
                        <li key={item.name} className="text-sm">
                          <Link href={item.href} className="text-gray-300 hover:text-white">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {SHOP_ENABLED && false && (
                  <div>
                    <h3 className="text-sm font-medium text-white">Company</h3>
                    <ul role="list" className="mt-6 space-y-6">
                      {footerNavigation.company.map((item) => (
                        <li key={item.name} className="text-sm">
                          <Link href={item.href} className="text-gray-300 hover:text-white">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
                {SHOP_ENABLED && (
                  <div>
                    <h3 className="text-sm font-medium text-white">{common_dictionary.useful}</h3>
                    <ul role="list" className="mt-6 space-y-6">
                      {SHOP_ENABLED &&
                        footerNavigation.useful.map((item) => (
                          <li key={item.name} className="text-sm">
                            <Link href={item.href} className="text-gray-300 hover:text-white">
                              {item.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-medium text-white">
                    {common_dictionary.footer_connect}
                  </h3>
                  <ul role="list" className="mt-6 space-y-6">
                    {footerNavigation.connect.map((item) => (
                      <li key={item.name} className="text-sm">
                        <Link href={item.href} className="text-gray-300 hover:text-white">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-12 md:mt-16 xl:mt-0">
              <h3 className="text-sm font-medium text-white">{common_dictionary.footer_contact}</h3>
              <Link
                className="mt-6 flex items-center text-sm text-gray-300 "
                href="mailto:info@zen1one.gr <info@zen1one.gr>;"
              >
                <EnvelopeIcon className="h-4" />
                <span className="pl-2">info@zen1one.gr</span>
              </Link>
              <p className="mt-6 flex items-center text-sm text-gray-300 ">
                <PhoneIcon className="h-4" />
                <span className="pl-2">210-5561166</span>
              </p>
              <p className="mt-6 flex items-center text-sm text-gray-300 ">
                <PhoneIcon className="h-4" />
                <span className="pl-2"> 210-6454563 </span>
              </p>
              <Link
                className="mt-6 flex items-center text-sm text-gray-300 "
                href="https://www.google.com/maps/place/%CE%9B%CE%B5%CF%89%CF%86.+%CE%91%CE%BB%CE%AF%CE%BC%CE%BF%CF%85+76,+%CE%91%CF%81%CE%B3%CF%85%CF%81%CE%BF%CF%8D%CF%80%CE%BF%CE%BB%CE%B7+164+52/@37.908825,23.738453,16z/data=!4m5!3m4!1s0x14a1be74d8ceaeed:0xf50d0b6757f34193!8m2!3d37.9088253!4d23.7384527?hl=el-GR"
              >
                <MapPinIcon className="h-4" />
                <span className="pl-2"> {common_dictionary.footer_location}</span>
              </Link>
            </div>
            {SHOP_ENABLED && (
              <div></div>
              // <div className="mt-12 md:mt-16 xl:mt-0">
              //   <h3 className="text-sm font-medium text-white">
              //     Sign up for our newsletter
              //   </h3>
              //   <p className="mt-6 text-sm text-gray-300">
              //     The latest deals and savings, sent to your inbox weekly.
              //   </p>
              //   <form className="mt-2 flex sm:max-w-md">
              //     <label htmlFor="email-address" className="sr-only">
              //       Email address
              //     </label>
              //     <input
              //       id="email-address"
              //       type="text"
              //       autoComplete="email"
              //       required
              //       className="w-full min-w-0 appearance-none rounded-md border border-white bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
              //     />
              //     <div className="ml-4 flex-shrink-0">
              //       <button
              //         type="submit"
              //         className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              //       >
              //         Sign up
              //       </button>
              //     </div>
              //   </form>
              // </div>
            )}
          </div>

          <div className="border-t border-gray-800 py-10">
            <p className="text-sm text-gray-400">Copyright &copy; 2023 Zen1one Racing.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
