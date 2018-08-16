import Rcookie from 'react-cookies'
// import { parse, stringify } from 'query-string'
// import CONFIG from '../../../config/config'

export const setCookie = (value, key) => {
  // const { domain } = process.env
  const expires = new Date()
  expires.setDate(new Date().getDate() + 1)
  document.cookie = `${process.env.app}_${key}_${process.env.type}=${value}; path=/; expires=${expires};`
}

export const removeCookies = () => {
  const cookies = document.cookie.split(';')
  const { domain } = process.env
  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    const path = ['/', process.env.mainRoute]
    path.forEach((element) => {
      document.cookie = `${name} =;expires=Thu, 01 Jan 1970 00:00:00 GMT ; domain=${domain}; path=${element}`
    })
  }
}

export const getCookie = key => Rcookie.load(`${process.env.app}_${key}_${process.env.type}`)

export function apiCall (url, method, authReq = true, body = {}) {
  let obj = {}
  if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
    obj = {
      method,
      url,
      body
    }
  } else {
    obj = {
      method,
      url
    }
  }
  console.log('------------------', obj);
  // if (authReq) {
  //   return ({
  //     ...obj,
  //     headers: {
  //       Authorization: Rcookie.load(`${process.env.app}_accessToken_${process.env.type}`) ? Rcookie.load(`${process.env.app}_accessToken_${process.env.type}`) : '',
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': ''
  //     }
  //   })
  // }
  return ({
    ...obj,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function apiCallFetch (method, authReq = true, body = {}) {
  let obj = {}
  if (method === 'POST' || method === 'PUT' || method === 'DELETE') {
    obj = {
      method,
      body: JSON.stringify(body),
      credentials: 'same-origin',
    }
  } else {
    obj = {
      method,
    }
  }
  if (authReq) {
    return ({
      ...obj,
      headers: {
        Authorization: Rcookie.load(`${process.env.app}_accessToken_${process.env.type}`) ? Rcookie.load(`${process.env.app}_accessToken_${process.env.type}`) : '',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
  }
  return ({
    ...obj,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}

export function bookmarkStatusToggle (data, id, flag) {
  const DATA = JSON.parse(JSON.stringify(data))
  let activeItem = null
  const list = DATA.map(item => (item.doc_id === id ? (() => { activeItem = { ...item, bookmark: flag }; return activeItem })() : item))
  return {
    list,
    activeItem
  }
}

export function innoPattern (name, app) {
  function actionType (type) {
    if (app) {
      return `${app}_${name}_${type}`
    }
    return `${name}_${type}`
  }

  function createReducer (cases, defaultState = {}) {
    return function reducer (state = defaultState, action = {}) {
      if (state === undefined) return defaultState
      Object.keys(cases).forEach((caseName) => {
        if (action.type === caseName) {
          return cases[caseName](state, action)
        } return null
      })
      return state
    }
  }

  function createAction (type) {
    return function actionCreator (payload) {
      const action = {
        type
      }

      if (payload) action.payload = payload

      return action
    }
  }

  return {
    actionType,
    createReducer,
    createAction
  }
}

// export function getRedirectUrl (app, params = {}, backParams = {}, backUrlRequired = true) {
//   if (!backUrlRequired) {
//     return CONFIG[process.env.type.toUpperCase()][app].redirectUrl
//   }
//   if (app !== process.env.current) {
//     const backUrl = `${window.location.origin}${window.location.pathname}?${stringify({ ...parse(window.location.search), ...backParams })}`
//     return `${CONFIG[process.env.type.toUpperCase()][app].redirectUrl}?${stringify({ ...params, backUrl })}`
//   }
//   const { backUrl } = parse(window.location.search)
//   return `${CONFIG[process.env.type.toUpperCase()][app].redirectUrl}?${stringify({ ...params, backUrl })}`
// }

export function marshalAuthor(authorName, authorId) {
  let author = authorName.trim().replace(/ /g, '~')
  author = author.charAt(0) === '@' ? author : `@${author}`
  author = authorId ? `${author}::${authorId}` : author
  return author
}

export function unmarshalAuthor(authorStr) {
  return authorStr.trim().split('::')[0].replace('@', '').replace(/~/g, ' ');
}

export function authorFunc (iStr, isRemove, isModify) {
  const dictionary = JSON.parse(localStorage.getItem('dictionary'))
  if (iStr) {
    const _wordArray = iStr.replace(/\s\s+/g, ' ').split(' ')
    for (let i = 0; i < _wordArray.length; i += 1) {
      if (_wordArray[i][0] === '@') {
        if (isRemove) {
          _wordArray[i] = _wordArray[i].indexOf('::') !== -1 ? _wordArray[i].substr(0, _wordArray[i].indexOf('::')) : _wordArray[i]
          _wordArray[i] = _wordArray[i].replace(/~/g, '-')
        } else if (dictionary && dictionary[_wordArray[i]]) {
          if (dictionary[_wordArray[i]].author_id) {
            _wordArray[i] = `${dictionary[_wordArray[i]]['mod-name']}::${dictionary[_wordArray[i]].author_id}`
          } else {
            _wordArray[i] = dictionary[_wordArray[i]]['mod-name']
          }
        }
      } else if (isModify) {
        _wordArray[i] = _wordArray[i].replace(/-/g, ' ').replace(/ {2}/g, '-')
      }
    }
    return _wordArray.join(' ')
  }
  return ''
}

export function queryConcator (iStr, iId) {
  return `${iStr}::${iId}`
}

export function spaceReplacer (iStr, iReplacer) {
  return iStr.replace(/\s+/g, iReplacer)
}

export function convertObject (iKey, iObj) {
  let _tempObj = {}
  const _iObj = iObj
  if (localStorage.getItem('dictionary')) { _tempObj = JSON.parse(localStorage.getItem('dictionary')) } else { _tempObj = {} }
  const _tempNameForRender = spaceReplacer(iKey, '-')
  _iObj['mod-name'] = spaceReplacer(iKey, '~')
  _tempObj[_tempNameForRender] = _iObj
  localStorage.setItem('dictionary', JSON.stringify(_tempObj))
  return _tempObj
}

export const style = {
  style: {
    background: 'rgba(62, 62, 62, 0.9)',
    padding: 20,
    color: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 2px'
  },
  arrowStyle: {
    color: 'rgba(62, 62, 62, 0.9)',
    borderColor: false
  }
}

export function ucFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function generateTabsList (tabs, tabsMapping) {
  return tabs.map((tab) => {
    const matchingTab = tabsMapping.find(x => x.value === tab.value);
    if (matchingTab) {
      return { component: matchingTab.component, ...tab };
    }
    return null;
  }).filter(Boolean)
}
