import Link from "next/link"

import { Icons } from "./Icons"
import { buttonVariants } from "./ui/Button"
import { getAuthSession } from "@/lib/auth"
import UserAccountNav from "./UserAccountNav"
import SearchBar from "./SearchBar"

const Navbar = async () => {

  const session = await getAuthSession()

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* logo */}
        <Link href="/" className="flex gap-2 items-center">
          <Icons.logo className="w-8 h-8 sm:h-6 sm:w-6" />
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            Okapi
          </p>
        </Link>

        {/* search bar */}
        {/* <SearchBar /> */}

        {/* links */}
        <div className="container max-w-4xl mx-auto flex items-center justify-between gap-2 mt-2">
          <Link href="/r/art" className="text-zinc-500 text-sm">art</Link>
          <Link href="/r/cats" className="text-zinc-500 text-sm">cats</Link>
          <Link href="/r/games" className="text-zinc-500 text-sm">games</Link>
          <Link href="/r/lol" className="text-zinc-500 text-sm">lol</Link>
          <Link href="/r/music" className="text-zinc-500 text-sm">music</Link>
          <Link href="/r/news" className="text-zinc-500 text-sm">news</Link>
          <Link href="/r/photos" className="text-zinc-500 text-sm">photos</Link>
          <Link href="/r/science" className="text-zinc-500 text-sm">science</Link>
          <Link href="/r/stonks" className="text-zinc-500 text-sm">stonks</Link>
          <Link href="/r/etc" className="text-zinc-500 text-sm">etc</Link>
        </div>

        {session?.user ? (
          <UserAccountNav user={session.user} />
        ) : (
          <Link href="/sign-in" className={buttonVariants()}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar