import redirect from "./redirect";
import { setCookie, getCookie, removeCookie } from "./session";

export const signIn = async (accessToken) => {
  // TODO
  /*const error = validateCredentials(email, password);
  if (error) {
    return error;
  }

  const res = await authenticate(email, password);
  if (!res.jwt) {
    return res;
  }*/

  setCookie("jwt", accessToken);
  redirect("/");
  return null;
};

export const signOut = (ctx = {}) => {
  if (process.browser) {
    removeCookie("jwt");
    redirect("/login", ctx);
  }
};

export const getJwt = ctx => {
  return getCookie("jwt", ctx.req);
};

export const isAuthenticated = ctx => !!getJwt(ctx);

export const redirectIfAuthenticated = ctx => {
  if (isAuthenticated(ctx)) {
    redirect("/", ctx);
    return true;
  }
  return false;
};

export const redirectIfNotAuthenticated = ctx => {
  if (!isAuthenticated(ctx)) {
    redirect("/login", ctx);
    return true;
  }
  return false;
};