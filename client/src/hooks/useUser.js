// regular expression that pulls out user id from the cookie.
export function useUser() {
    return { id: document.cookie.match(/userId=(?<id>[^;]+);?$/).groups.id }
  }