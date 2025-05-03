import {type RouteConfig, index, route, prefix, layout} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    ...prefix("garage", [
        index("routes/garage/index.tsx"),
        route(":garageId", "routes/garage/show.tsx"),
    ]),
    ...prefix("item", [
        route(":itemId", "routes/item/show.tsx"),
    ]),
    route("search", "routes/search.tsx"),

    layout("routes/ProtectedRoute.tsx", [
        route("profile", "routes/profile.tsx"),
        route("profile/edit", "routes/profile-edit.tsx"),
        route("logout", "routes/logout.tsx"),
    ]),
    route("login", "routes/login.tsx"),
    route("register", "routes/register.tsx"),
    route("about", "routes/about.tsx"),
] satisfies RouteConfig;
