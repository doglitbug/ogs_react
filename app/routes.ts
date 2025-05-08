import {type RouteConfig, index, route, prefix, layout} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    ...prefix("garage", [
        index("routes/garages.tsx"),
        route(":garageId", "routes/garage.tsx"),
        route(":garageId/edit", "routes/garage-edit.tsx"),
        route("new", "routes/garage-new.tsx")
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
    route("register", "routes/profile-new.tsx"),
    route("about", "routes/about.tsx"),
] satisfies RouteConfig;
