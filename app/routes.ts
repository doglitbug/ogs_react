import {type RouteConfig, index, route, prefix} from "@react-router/dev/routes";

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
    route("user", "routes/user.tsx"),
    route("profile", "routes/profile.tsx"),
    route("login", "routes/login.tsx"),
    route("logout", "routes/logout.tsx"),
    route("about", "routes/about.tsx"),
] satisfies RouteConfig;
