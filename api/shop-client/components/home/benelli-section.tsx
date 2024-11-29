import { Dictionary } from '@/lib/get-dictionary';
import React from 'react'

type Props = {
    dictionary: Dictionary;
  }

export default async function BenelliSection({ dictionary }: Props) {
    const home_dictionary = dictionary.home;
    return (
        <>
            <section className="pt-24 sm:pt-32  mb-24 sm:mb-32">
            <div className=" relative">
                {/* <Image className="absolute w-full h-full top-0 left-0 bg-cover bg-center bg-no-repeat opacity-80 bg-fixed" src={benelli} alt="" width={500} height={500} /> */}
                <div className="absolute w-full h-full top-0 left-0 bg-cover bg-center bg-no-repeat opacity-80 bg-fixed"
                 style={{ backgroundImage: `url(/benelli.png)` }}></div> 
                <div className="relative bg-gray-900 bg-opacity-50 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
                    <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
                        <h2
                            id="social-impact-heading"
                            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
                        >
                            <span className="block sm:inline">{home_dictionary.benelli_header}</span>
                        </h2>
                        <p className="mt-3 text-xl text-white">
                            {home_dictionary.benelli_description}
                        </p>
                        <a
                            href="https://www.benelli-moto.gr"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-8 block w-full rounded-md border border-transparent bg-white py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
                        >
                            {home_dictionary.benelli_link}
                        </a>
                    </div>
                </div>
                {/* <h1 className="text-white display-2 text-center relative">Parallax Header</h1> */}
            </div>
            </section>
        </>
    )
}

