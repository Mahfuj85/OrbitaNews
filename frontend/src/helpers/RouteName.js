export const RouteIndex = "/";
export const RouteSignIn = "/sign-in";
export const RouteSignUp = "/sign-up";
export const RouteProfile = "/profile";
export const RouteAbout = "/about";
export const RouteContact = "/contact";

export const RouteDashboard = "/dashboard";
export const RouteDashboardHome = "/dashboard/home";
export const RouteComments = "/dashboard/comments";
export const RouteAuthorNews = "/dashboard/author-news";
export const RouteAdminNews = "/dashboard/admin-news";
export const RouteCategoryDetails = "/dashboard/categories";
export const RouteUsers = "/dashboard/users";
export const RouteAddCategory = "/dashboard/category/add";
export const RouteEditCategory = (category_id) => {
  if (category_id) {
    return `/dashboard/category/edit/${category_id}`;
  } else {
    return `/dashboard/category/edit/:category_id`;
  }
};

export const RouteNews = "/news";
export const RouteAddNews = "/dashboard/news/add";

export const RouteDashboardEditNews = (newsId) => {
  if (newsId) {
    return `/dashboard/news/edit/${newsId}`;
  } else {
    return `/dashboard/news/edit/:newsId`;
  }
};

export const RouteNewsDetails = (category, slug) => {
  if (!category || !slug) {
    return "/news/:category/:slug";
  } else {
    return `/news/${category}/${slug}`;
  }
};

export const RouteNewsByCategory = (category) => {
  if (!category) {
    return "/news/:category";
  } else {
    return `/news/${category}`;
  }
};

export const RouteSearch = (q) => {
  if (q) {
    return `/search?q=${q}`;
  }
  return `/search`;
};
// here q is for query. If q has a truthy value, then It returns a string like: "/search?q=shoes" (if q = "shoes"). If q is falsy, then It returns "/search" (without a query string).
