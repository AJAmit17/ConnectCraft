import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhook",

    "/question/:id",
    "/api/question/:id",

    "/tags",
    "/api/tags/",
    "/tags/:id",
    "/api/tags/:id",

    "/profile/:id",
    "/api/profile/:id",

    "/community",
    "/api/community",

    "/experiments",
    "/api/experiments",
    "/experiments/:id",
    "/api/experiments/:id",
  ],
  ignoredRoutes: [
    "/api/webhook",
  ]
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
