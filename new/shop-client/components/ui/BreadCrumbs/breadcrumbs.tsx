import Link from 'next/link'
import React from 'react'
import clsx from 'clsx'

interface Props {
  navigation: { name: string; href?: string }[]
}

export default function BreadCrumbs({ navigation }: Props) {
  return (
    <>
 
      <div className="bg-transparent pt-6 ">
        {/* <div className="bg-transparent 2xl:ml-24 xl:ml-12 pl-8 pt-6"> */}
        <div>
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-gray-400 "
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                </svg>
                <span className="sr-only">Home</span>
              </Link>
            </li>
            {navigation.map((item, i) => (
              <li key={item.name}>
                <div className="flex items-center">
                  {i !== 0 && (
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-400 hover:text-gray-700 flex-none"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                  <Link
                    href={item.href ? item.href : '#'}
                    className={clsx("ml-1 text-sm font-medium text-gray-700 hover:text-gray-700 md:ml-2", i == navigation.length -1 && "sm:w-fit w-24 truncate " )}
                  >
                    {item.name}
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
      {/* <nav className="flex 2xl:ml-24 xl:ml-12 pl-8 pt-6" aria-label="Breadcrumb">
      <ol role="list" className="flex space-x-4 rounded-md bg-white px-6 shadow">
        <li className="flex">
          <div className="flex items-center">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {navigation.map((page) => (
          <li key={page.name} className="flex">
            <div className="flex items-center">
              <svg
                className="h-full w-6 flex-shrink-0 text-gray-200"
                viewBox="0 0 24 44"
                preserveAspectRatio="none"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
              </svg>
              <Link
                 href={page.href ? page.href: "#"}
                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                // aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav> */}
    </>
  )
}
