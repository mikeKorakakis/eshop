import React from 'react'
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import { LanguageProps } from '@/types'
import { getDictionary } from '@/lib/get-dictionary'
import ContactForm from './contact-form'

export default async function Contact({params: {lng}}: LanguageProps) {
  
 const dictionary = await  getDictionary(lng)
 const contact_dictionary = dictionary.contact

  return (
    <>
      <div className="relative isolate bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="relative px-6 pt-24 pb-10 sm:pt-32 lg:static lg:pt-28 lg:pb-20 lg:px-8">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
                <svg
                  className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                      width={200}
                      height={200}
                      x="100%"
                      y={-1}
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M130 200V.5M.5 .5H200" fill="none" />
                    </pattern>
                  </defs>
                  <rect
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                    fill="white"
                  />
                  <svg
                    x="100%"
                    y={-1}
                    className="overflow-visible fill-gray-50"
                  >
                    <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                  </svg>
                  <rect
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                    fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                {contact_dictionary.contact}
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                {contact_dictionary.contact_p1}
              </p>
              <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Telephone</span>
                    <BuildingOffice2Icon
                      className="h-7 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.google.com/maps/place/University+of+West+Attica/@38.0025235,23.6723134,17z/data=!3m1!4b1!4m6!3m5!1s0x14a13ba48d426f81:0xbe82f5519cbcb53d!8m2!3d38.0025235!4d23.6748883!16s%2Fg%2F11ggj3f3rj?hl=en&entry=ttu&g_ep=EgoyMDI0MTIwNC4wIKXMDSoASAFQAw%3D%3D"
                    >
                      <span className="ml-4">{contact_dictionary.address}</span>
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Telephone</span>
                    <PhoneIcon
                      className="h-7 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd>
                    <a
                      className="hover:text-gray-900"
                      href="tel:+30 (210) 5561166"
                    >
                      +30 (210) 5561166, 210-6454563
                    </a>
                  </dd>
                </div>
                {/* <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Telephone</span>
                    <PrinterIcon
                      className="h-7 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd>
                    <span
                      className="hover:text-gray-900"
                    >
                      +30 (210) 5561166
                    </span>
                  </dd>
                </div> */}
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Telephone</span>
                    <EnvelopeIcon
                      className="h-7 w-6 text-gray-400"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd>
                    <a
                      className="hover:text-gray-900"
                      href="mailto:info@zen1one.gr"
                    >
                      info@uniwa.gr
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
         <ContactForm dictionary={dictionary}/>
        </div>
        <section className="text-gray-600 body-font relative">
          <div className="absolute inset-0 bg-gray-300">
            <iframe
			 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.911552347915!2d23.67231337645748!3d38.00252347192882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a13ba48d426f81%3A0xbe82f5519cbcb53d!2sUniversity%20of%20West%20Attica!5e0!3m2!1sen!2sgr!4v1733551179929!5m2!1sen!2sgr" 
			 allowFullScreen={true} 
              width="100%"
              height="100%"
              // style="border:0;"
              // className="h-80"
              loading="lazy"
            ></iframe>
          </div>
          <div className="container px-5 py-48 mx-auto flex"></div>
        </section>
      </div>
      <div>
        {/* <HeroSection text={t('contact')!} /> */}
        {/* <HeroSection /> */}

        {/* <div className="absolute mt-2">
          <BreadCrumps
            navigation={[
              { name: t('common:home')!, href: '/' },
              { name: t('common:services'), href: '#' },
            ]}
          />
        </div> */}
      </div>
    </>
  )
}


