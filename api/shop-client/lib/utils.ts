import { ReadonlyURLSearchParams } from 'next/navigation';
import { ENV_VARIABLES_SCHEMA } from './env';
import {
  ActiveCustomer,
  AddressType,
  FacetWithValues,
  SetHttpCookieType,
  ShippingAddress
} from './types';
import { setCookieServer } from './actions';

export const createUrl = (pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
  stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;

export const validateEnvironmentVariables = () => {
  return ENV_VARIABLES_SCHEMA.safeParse(process.env);
};

export const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export function formatPrice(value = 0, currency: string = 'EUR') {
  return new Intl.NumberFormat('el-GR', {
    style: 'currency',
    currency
  }).format(value / 100);
}

// export const groupFacetValues = (
//   search: SearchResponse,
//   activeFacetValueIds: string[]
// ): FacetWithValues[] => {
//   if (!search) {
//     return [];
//   }
//   const facetMap = new Map<string, FacetWithValues>();
//   for (const {
//     facetValue: { id, name, facet },
//     count
//   } of search.facetValues) {
//     if (count === search.totalItems) {
//       continue;
//     }
//     const facetFromMap = facetMap.get(facet.id);
//     const selected = (activeFacetValueIds || []).includes(id);
//     if (facetFromMap) {
//       facetFromMap.values.push({ id, name, selected });
//     } else {
//       facetMap.set(facet.id, {
//         id: facet.id,
//         name: facet.name,
//         open: true,
//         values: [{ id, name, selected }]
//       });
//     }
//   }
//   return Array.from(facetMap.values());
// };

export const enableDisableFacetValues = (_facedValues: FacetWithValues[], ids: string[]) => {
  const facetValueIds: string[] = [];
  const facedValues = _facedValues.map((facet) => {
    facet.values = facet.values.map((value) => {
      if (ids.includes(value.id)) {
        facetValueIds.push(value.id);
        value.selected = true;
      } else {
        value.selected = false;
      }
      return value;
    });
    return facet;
  });
  return { facedValues, facetValueIds };
};

export const changeUrlParamsWithoutRefresh = (term: string, facetValueIds: string[]) => {
  const f = facetValueIds.join('-');
  return window.history.pushState(
    '',
    '',
    `${window.location.origin}${window.location.pathname}?q=${term}${f ? `&f=${f}` : ''}`
  );
};

export const setCookie = (name: string, value: string, days: number) => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }

  const secureCookie = true // isEnvVariableEnabled('SECURE_COOKIE')
    ? ' Secure; SameSite=Strict;'
    : '';
  // const httpOnly = true ? ' HttpOnly;' : ''; // isEnvVariableEnabled('HTTPONLY_COOKIE')
  document.cookie = name + '=' + (value || '') + expires + `;${secureCookie} path=/; HttpOnly`;
};

export const setHttpCookie = async (data: SetHttpCookieType) => {
  await setCookieServer(data);
};

export const getCookie = (name: string) => {
  const keyValues = document.cookie.split(';');
  let result = '';
  keyValues.forEach((item) => {
    const [key, value] = item.split('=');
    if (key && value && key.trim() === name) {
      result = value;
    }
  });
  return result;
};

export const cleanUpParams = (params: Record<string, string>) => {
  if ('slug' in params && params.slug[params.slug.length - 1] === '/') {
    params.slug = params.slug.slice(0, params.slug.length - 1);
  }
  return params;
};

export const isEnvVariableEnabled = (envVariable: keyof typeof ENV_VARIABLES_SCHEMA) =>
  ENV_VARIABLES_SCHEMA[envVariable] === 'true';

export const isShippingAddressValid = (orderAddress: ShippingAddress): boolean =>
  !!(
    !!orderAddress &&
    orderAddress.fullName &&
    orderAddress.streetLine1 &&
    orderAddress.city &&
    orderAddress.province &&
    orderAddress.postalCode &&
    orderAddress.countryCode &&
    orderAddress.phoneNumber
  );

export const isActiveCustomerValid = (activeCustomer: ActiveCustomer): boolean =>
  !!(
    !!activeCustomer &&
    activeCustomer.emailAddress &&
    activeCustomer.firstName &&
    activeCustomer.lastName
  );

export const fullNameWithTitle = ({
  title,
  firstName,
  lastName
}: Pick<ActiveCustomer, 'title' | 'firstName' | 'lastName'>): string => {
  return [title, firstName, lastName].filter((x) => !!x).join(' ');
};

export const formatDateTime = (dateToConvert: Date) => {
  const result = new Date(dateToConvert).toISOString();
  const [date, time] = result.split('T');
  if (!date || !time) {
    return '';
  }
  const [hour, minutes] = time.split(':');
  const orderedDate = date.split('-').reverse().join('-');
  return `${orderedDate} ${hour}:${minutes}`;
};

export const ischeckout = (url: string) => url.indexOf('/checkout/') >= 0;

// export const normalizeAddress = (address: Address): AddressType => {
//   return {
//     firstName: (address?.fullName ? address?.fullName.split(' ')[0] : '') as string,
//     lastName: (address?.fullName ? address?.fullName.split(' ')[1] : '') as string,
//     company: address?.company || '',
//     streetNumber: address?.streetLine1 || '',
//     city: address?.city || '',
//     province: address?.province || '',
//     postalCode: address?.postalCode || '',
//     country: address?.country?.code || '',
//     phoneNumber: address?.phoneNumber || ''
//   };
// };

export const getCountryCode = (country: string) => {
  const countryObj = countries.find((c) => c.label === country);
  return countryObj?.value;
};

export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const countries = [
  {
    value: 'GR',
    label: 'greece'
  },
  {
    value: 'IT',
    label: 'italy'
  }
];

export const countries2 = [
  {
    value: 'AF',
    label: 'Afghanistan'
  },
  {
    value: 'AX',
    label: 'Åland Islands'
  },
  {
    value: 'AL',
    label: 'Albania'
  },
  {
    value: 'DZ',
    label: 'Algeria'
  },
  {
    value: 'AS',
    label: 'American Samoa'
  },
  {
    value: 'AD',
    label: 'Andorra'
  },
  { value: 'AO', label: 'Angola' },
  {
    value: 'AI',
    label: 'Anguilla'
  },
  {
    value: 'AG',
    label: 'Antigua and Barbuda'
  },
  {
    value: 'AR',
    label: 'Argentina'
  },
  {
    value: 'AM',
    label: 'Armenia'
  },
  { value: 'AW', label: 'Aruba' },
  {
    value: 'AU',
    label: 'Australia'
  },
  {
    value: 'AT',
    label: 'Austria'
  },
  {
    value: 'AZ',
    label: 'Azerbaijan'
  },
  {
    value: 'BS',
    label: 'Bahamas'
  },
  {
    value: 'BH',
    label: 'Bahrain'
  },
  {
    value: 'BD',
    label: 'Bangladesh'
  },
  {
    value: 'BB',
    label: 'Barbados'
  },
  {
    value: 'BY',
    label: 'Belarus'
  },
  {
    value: 'BE',
    label: 'Belgium'
  },
  {
    value: 'BZ',
    label: 'Belize'
  },
  { value: 'BJ', label: 'Benin' },
  {
    value: 'BM',
    label: 'Bermuda'
  },
  {
    value: 'BT',
    label: 'Bhutan'
  },
  {
    value: 'BO',
    label: 'Bolivia (Plurinational State of)'
  },
  {
    value: 'BQ',
    label: 'Bonaire, Sint Eustatius and Saba'
  },
  {
    value: 'BA',
    label: 'Bosnia and Herzegovina'
  },
  {
    value: 'BW',
    label: 'Botswana'
  },
  {
    value: 'BV',
    label: 'Bouvet Island'
  },
  {
    value: 'BR',
    label: 'Brazil'
  },
  {
    value: 'IO',
    label: 'British Indian Ocean Territory'
  },
  {
    value: 'BN',
    label: 'Brunei Darussalam'
  },
  {
    value: 'BG',
    label: 'Bulgaria'
  },
  {
    value: 'BF',
    label: 'Burkina Faso'
  },
  {
    value: 'BI',
    label: 'Burundi'
  },
  {
    value: 'CV',
    label: 'Cabo Verde'
  },
  {
    value: 'KH',
    label: 'Cambodia'
  },
  {
    value: 'CM',
    label: 'Cameroon'
  },
  {
    value: 'CA',
    label: 'Canada'
  },
  {
    value: 'KY',
    label: 'Cayman Islands'
  },
  {
    value: 'CF',
    label: 'Central African Republic'
  },
  { value: 'TD', label: 'Chad' },
  { value: 'CL', label: 'Chile' },
  { value: 'CN', label: 'China' },
  {
    value: 'CX',
    label: 'Christmas Island'
  },
  {
    value: 'CC',
    label: 'Cocos (Keeling) Islands'
  },
  {
    value: 'CO',
    label: 'Colombia'
  },
  {
    value: 'KM',
    label: 'Comoros'
  },
  { value: 'CG', label: 'Congo' },
  {
    value: 'CD',
    label: 'Congo (Democratic Republic of the)'
  },
  {
    value: 'CK',
    label: 'Cook Islands'
  },
  {
    value: 'CR',
    label: 'Costa Rica'
  },
  {
    value: 'CI',
    label: "Côte d'Ivoire"
  },
  {
    value: 'HR',
    label: 'Croatia'
  },
  { value: 'CU', label: 'Cuba' },
  {
    value: 'CW',
    label: 'Curaçao'
  },
  {
    value: 'CY',
    label: 'Cyprus'
  },
  {
    value: 'CZ',
    label: 'Czechia'
  },
  {
    value: 'DK',
    label: 'Denmark'
  },
  {
    value: 'DJ',
    label: 'Djibouti'
  },
  {
    value: 'DM',
    label: 'Dominica'
  },
  {
    value: 'DO',
    label: 'Dominican Republic'
  },
  {
    value: 'EC',
    label: 'Ecuador'
  },
  { value: 'EG', label: 'Egypt' },
  {
    value: 'SV',
    label: 'El Salvador'
  },
  {
    value: 'GQ',
    label: 'Equatorial Guinea'
  },
  {
    value: 'ER',
    label: 'Eritrea'
  },
  {
    value: 'EE',
    label: 'Estonia'
  },
  {
    value: 'SZ',
    label: 'Eswatini'
  },
  {
    value: 'ET',
    label: 'Ethiopia'
  },
  {
    value: 'FK',
    label: 'Falkland Islands (Malvinas)'
  },
  {
    value: 'FO',
    label: 'Faroe Islands'
  },
  { value: 'FJ', label: 'Fiji' },
  {
    value: 'FI',
    label: 'Finland'
  },
  {
    value: 'FR',
    label: 'France'
  },
  {
    value: 'GF',
    label: 'French Guiana'
  },
  {
    value: 'PF',
    label: 'French Polynesia'
  },
  {
    value: 'TF',
    label: 'French Southern Territories'
  },
  { value: 'GA', label: 'Gabon' },
  {
    value: 'GM',
    label: 'Gambia'
  },
  {
    value: 'GE',
    label: 'Georgia'
  },
  {
    value: 'DE',
    label: 'Germany'
  },
  { value: 'GH', label: 'Ghana' },
  {
    value: 'GI',
    label: 'Gibraltar'
  },
  {
    value: 'GR',
    label: 'Greece'
  },
  {
    value: 'GL',
    label: 'Greenland'
  },
  {
    value: 'GD',
    label: 'Grenada'
  },
  {
    value: 'GP',
    label: 'Guadeloupe'
  },
  { value: 'GU', label: 'Guam' },
  {
    value: 'GT',
    label: 'Guatemala'
  },
  {
    value: 'GG',
    label: 'Guernsey'
  },
  {
    value: 'GN',
    label: 'Guinea'
  },
  {
    value: 'GW',
    label: 'Guinea-Bissau'
  },
  {
    value: 'GY',
    label: 'Guyana'
  },
  { value: 'HT', label: 'Haiti' },
  {
    value: 'HM',
    label: 'Heard Island and McDonald Islands'
  },
  {
    value: 'VA',
    label: 'Holy See'
  },
  {
    value: 'HN',
    label: 'Honduras'
  },
  {
    value: 'HK',
    label: 'Hong Kong'
  },
  {
    value: 'HU',
    label: 'Hungary'
  },
  {
    value: 'IS',
    label: 'Iceland'
  },
  {
    value: 'IN',
    label: 'India'
  },
  {
    value: 'ID',
    label: 'Indonesia'
  },
  {
    value: 'IR',
    label: 'Iran (Islamic Republic of)'
  },
  { value: 'IQ', label: 'Iraq' },
  {
    value: 'IE',
    label: 'Ireland'
  },
  {
    value: 'IM',
    label: 'Isle of Man'
  },
  {
    value: 'IL',
    label: 'Israel'
  },
  {
    value: 'IT',
    label: 'Italy'
  },
  {
    value: 'JM',
    label: 'Jamaica'
  },
  {
    value: 'JP',
    label: 'Japan'
  },
  {
    value: 'JE',
    label: 'Jersey'
  },
  {
    value: 'JO',
    label: 'Jordan'
  },
  {
    value: 'KZ',
    label: 'Kazakhstan'
  },
  {
    value: 'KE',
    label: 'Kenya'
  },
  {
    value: 'KI',
    label: 'Kiribati'
  },
  {
    value: 'KP',
    label: "Korea (Democratic People's Republic of)"
  },
  {
    value: 'KR',
    label: 'Korea (Republic of)'
  },
  {
    value: 'KW',
    label: 'Kuwait'
  },
  {
    value: 'KG',
    label: 'Kyrgyzstan'
  },
  {
    value: 'LA',
    label: "Lao People's Democratic Republic"
  },
  {
    value: 'LV',
    label: 'Latvia'
  },
  {
    value: 'LB',
    label: 'Lebanon'
  },
  {
    value: 'LS',
    label: 'Lesotho'
  },
  {
    value: 'LR',
    label: 'Liberia'
  },
  {
    value: 'LY',
    label: 'Libya'
  },
  {
    value: 'LI',
    label: 'Liechtenstein'
  },
  {
    value: 'LT',
    label: 'Lithuania'
  },
  {
    value: 'LU',
    label: 'Luxembourg'
  },
  {
    value: 'MO',
    label: 'Macao'
  },
  {
    value: 'MK',
    label: 'Macedonia (the former Yugoslav Republic of)'
  },
  {
    value: 'MG',
    label: 'Madagascar'
  },
  {
    value: 'MW',
    label: 'Malawi'
  },
  {
    value: 'MY',
    label: 'Malaysia'
  },
  {
    value: 'MV',
    label: 'Maldives'
  },
  { value: 'ML', label: 'Mali' },
  {
    value: 'MT',
    label: 'Malta'
  },
  {
    value: 'MH',
    label: 'Marshall Islands'
  },
  {
    value: 'MQ',
    label: 'Martinique'
  },
  {
    value: 'MR',
    label: 'Mauritania'
  },
  {
    value: 'MU',
    label: 'Mauritius'
  },
  {
    value: 'YT',
    label: 'Mayotte'
  },
  {
    value: 'MX',
    label: 'Mexico'
  },
  {
    value: 'FM',
    label: 'Micronesia (Federated States of)'
  },
  {
    value: 'MD',
    label: 'Moldova (Republic of)'
  },
  {
    value: 'MC',
    label: 'Monaco'
  },
  {
    value: 'MN',
    label: 'Mongolia'
  },
  {
    value: 'ME',
    label: 'Montenegro'
  },
  {
    value: 'MS',
    label: 'Montserrat'
  },
  {
    value: 'MA',
    label: 'Morocco'
  },
  {
    value: 'MZ',
    label: 'Mozambique'
  },
  {
    value: 'MM',
    label: 'Myanmar'
  },
  {
    value: 'NA',
    label: 'Namibia'
  },
  {
    value: 'NR',
    label: 'Nauru'
  },
  {
    value: 'NP',
    label: 'Nepal'
  },
  {
    value: 'NL',
    label: 'Netherlands'
  },
  {
    value: 'NC',
    label: 'New Caledonia'
  },
  {
    value: 'NZ',
    label: 'New Zealand'
  },
  {
    value: 'NI',
    label: 'Nicaragua'
  },
  {
    value: 'NE',
    label: 'Niger'
  },
  {
    value: 'NG',
    label: 'Nigeria'
  },
  { value: 'NU', label: 'Niue' },
  {
    value: 'NF',
    label: 'Norfolk Island'
  },
  {
    value: 'MP',
    label: 'Northern Mariana Islands'
  },
  {
    value: 'NO',
    label: 'Norway'
  },
  { value: 'OM', label: 'Oman' },
  {
    value: 'PK',
    label: 'Pakistan'
  },
  {
    value: 'PW',
    label: 'Palau'
  },
  {
    value: 'PS',
    label: 'Palestine, State of'
  },
  {
    value: 'PA',
    label: 'Panama'
  },
  {
    value: 'PG',
    label: 'Papua New Guinea'
  },
  {
    value: 'PY',
    label: 'Paraguay'
  },
  { value: 'PE', label: 'Peru' },
  {
    value: 'PH',
    label: 'Philippines'
  },
  {
    value: 'PN',
    label: 'Pitcairn'
  },
  {
    value: 'PL',
    label: 'Poland'
  },
  {
    value: 'PT',
    label: 'Portugal'
  },
  {
    value: 'PR',
    label: 'Puerto Rico'
  },
  {
    value: 'QA',
    label: 'Qatar'
  },
  {
    value: 'RE',
    label: 'Réunion'
  },
  {
    value: 'RO',
    label: 'Romania'
  },
  {
    value: 'RU',
    label: 'Russian Federation'
  },
  {
    value: 'RW',
    label: 'Rwanda'
  },
  {
    value: 'BL',
    label: 'Saint Barthélemy'
  },
  {
    value: 'SH',
    label: 'Saint Helena, Ascension and Tristan da Cunha'
  },
  {
    value: 'KN',
    label: 'Saint Kitts and Nevis'
  },
  {
    value: 'LC',
    label: 'Saint Lucia'
  },
  {
    value: 'MF',
    label: 'Saint Martin (French part)'
  },
  {
    value: 'PM',
    label: 'Saint Pierre and Miquelon'
  },
  {
    value: 'VC',
    label: 'Saint Vincent and the Grenadines'
  },
  {
    value: 'WS',
    label: 'Samoa'
  },
  {
    value: 'SM',
    label: 'San Marino'
  },
  {
    value: 'ST',
    label: 'Sao Tome and Principe'
  },
  {
    value: 'SA',
    label: 'Saudi Arabia'
  },
  {
    value: 'SN',
    label: 'Senegal'
  },
  {
    value: 'RS',
    label: 'Serbia'
  },
  {
    value: 'SC',
    label: 'Seychelles'
  },
  {
    value: 'SL',
    label: 'Sierra Leone'
  },
  {
    value: 'SG',
    label: 'Singapore'
  },
  {
    value: 'SX',
    label: 'Sint Maarten (Dutch part)'
  },
  {
    value: 'SK',
    label: 'Slovakia'
  },
  {
    value: 'SI',
    label: 'Slovenia'
  },
  {
    value: 'SB',
    label: 'Solomon Islands'
  },
  {
    value: 'SO',
    label: 'Somalia'
  },
  {
    value: 'ZA',
    label: 'South Africa'
  },
  {
    value: 'GS',
    label: 'South Georgia and the South Sandwich Islands'
  },
  {
    value: 'SS',
    label: 'South Sudan'
  },
  {
    value: 'ES',
    label: 'Spain'
  },
  {
    value: 'LK',
    label: 'Sri Lanka'
  },
  {
    value: 'SD',
    label: 'Sudan'
  },
  {
    value: 'SR',
    label: 'Suriname'
  },
  {
    value: 'SJ',
    label: 'Svalbard and Jan Mayen'
  },
  {
    value: 'SE',
    label: 'Sweden'
  },
  {
    value: 'CH',
    label: 'Switzerland'
  },
  {
    value: 'SY',
    label: 'Syrian Arab Republic'
  },
  {
    value: 'TW',
    label: 'Taiwan, Province of China'
  },
  {
    value: 'TJ',
    label: 'Tajikistan'
  },
  {
    value: 'TZ',
    label: 'Tanzania, United Republic of'
  },
  {
    value: 'TH',
    label: 'Thailand'
  },
  {
    value: 'TL',
    label: 'Timor-Leste'
  },
  { value: 'TG', label: 'Togo' },
  {
    value: 'TK',
    label: 'Tokelau'
  },
  {
    value: 'TO',
    label: 'Tonga'
  },
  {
    value: 'TT',
    label: 'Trinidad and Tobago'
  },
  {
    value: 'TN',
    label: 'Tunisia'
  },
  {
    value: 'TR',
    label: 'Turkey'
  },
  {
    value: 'TM',
    label: 'Turkmenistan'
  },
  {
    value: 'TC',
    label: 'Turks and Caicos Islands'
  },
  {
    value: 'TV',
    label: 'Tuvalu'
  },
  {
    value: 'UG',
    label: 'Uganda'
  },
  {
    value: 'UA',
    label: 'Ukraine'
  },
  {
    value: 'AE',
    label: 'United Arab Emirates'
  },
  {
    value: 'GB',
    label: 'United Kingdom'
  },
  {
    value: 'US',
    label: 'United States of America'
  },
  {
    value: 'UM',
    label: 'United States Minor Outlying Islands'
  },
  {
    value: 'UY',
    label: 'Uruguay'
  },
  {
    value: 'UZ',
    label: 'Uzbekistan'
  },
  {
    value: 'VU',
    label: 'Vanuatu'
  },
  {
    value: 'VE',
    label: 'Venezuela (Bolivarian Republic of)'
  },
  {
    value: 'VN',
    label: 'Viet Nam'
  },
  {
    value: 'VG',
    label: 'Virgin Islands (British)'
  },
  {
    value: 'VI',
    label: 'Virgin Islands (U.S.)'
  },
  {
    value: 'WF',
    label: 'Wallis and Futuna'
  },
  {
    value: 'EH',
    label: 'Western Sahara'
  },
  {
    value: 'YE',
    label: 'Yemen'
  },
  {
    value: 'ZM',
    label: 'Zambia'
  },
  {
    value: 'ZW',
    label: 'Zimbabwe'
  }
];

// transform items and keep only code and name
