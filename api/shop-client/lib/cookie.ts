import Cookies from 'js-cookie'

export const getCookie = async (cookiename: string, cookiestring: string) => {
  var name = cookiename + '='
  var decodedCookie = decodeURIComponent(cookiestring)
  var ca = decodedCookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]!
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}
export const setCookie = (cookiename: string, cookievalue: string) => {
  Cookies.set(cookiename, cookievalue, { expires: 365 })
}

export const deleteCookie = (cookiename: string) => {
    Cookies.remove(cookiename)
}
