// regular expression that pulls out user id from the cookie.
export function useUser() {
  // return { id: document.cookie.match(/userId=(?<id>[^;]+);?$/).groups.id }
  const match = document.cookie.match(/userId=(?<id>[^;]+);?$/);
  if (match === null) {
    return null;
  }
  return { id: match.groups.id };
}

