import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <style>{`
              table * {
                text-align: left;
                vertical-align: top;
                padding: 2px;
              }
              nav {
                padding-bottom: 20px;
              }
              .error {
                color: red;
              }
      `}
      </style>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
      </nav>
    </header>
    {children}
    <footer>

    </footer>
  </div>
);

export default Layout;
