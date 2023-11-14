

export { default } from 'next-auth/middleware'
console.log('call middleware')

export const config = { matcher: ["/", "/dashboard/:path*"] }