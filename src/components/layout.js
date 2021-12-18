import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"
import { useLocation } from '@reach/router'

const Layout = ({ isHomePage, children }) => {
  const {
    allWpPage: {
      edges
    },
    wp: {
      generalSettings: { title },
    },
  } = useStaticQuery(graphql`
    query LayoutQuery {
      allWpPage(sort: {fields: [title], order: ASC}) {
        edges {
          page:node {
            id
            title
            uri
          }
        }
      }
      wp {
        generalSettings {
          title
          description
        }
      }
    }
  `)

  const location = useLocation()

  return (
    <div className="global-wrapper" data-is-root-path={isHomePage}>
      <header className="global-header">
        {isHomePage ? (
          <h1 className="main-heading">
            <Link to="/">{parse(title)}</Link>
          </h1>
        ) : (
          <Link className="header-link-home" to="/">
            {title}
          </Link>
        )}
      </header>

      <main>{children}</main>

      <section id="sidebar">
        <div>
          <p className={`sidebarLink ${location.pathname=="/"&&"active"}`}>
            <Link href="/">Home</Link>
          </p>
          {edges.map(({page:{id, title, uri}}) => 
            <p className={`sidebarLink ${location.pathname==uri&&"active"}`} key={id}>
              <Link href={uri}>{title}</Link>
            </p>
          )}
        </div>
      </section>

      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
        {` `}
        And <a href="https://wordpress.org/">WordPress</a>
      </footer>
    </div>
  )
}

export default Layout
