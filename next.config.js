/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        NEXTAUTH_URL:"https://danhgiacamquan.online",
        NEXTAUTH_SECRET:"abc"
    },
    reactStrictMode:"false",
    output: "standalone",
}

module.exports = nextConfig
