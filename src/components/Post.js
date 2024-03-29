import Head from 'next/head'
import PageTitle from '@/components/PageTitle'
import tinytime from 'tinytime'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'
import Header, { TailwindMark } from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import smallCard from '@/img/twitter-card-small.jpg'
import React, { useState, useEffect } from 'react'

const postDateTemplate = tinytime('{dddd}, {MMMM} {DD}, {YYYY}')


export default function Post({ meta, children, posts }) {
  const router = useRouter()
  useEffect(() => {
    let script = document.createElement("script");
    let anchor = document.getElementById("inject-comments-for-uterances");
    script.setAttribute("src", "https://utteranc.es/client.js");
    script.setAttribute("crossorigin","anonymous");
    script.setAttribute("async", true);
    script.setAttribute("repo", "frnkst/bytesonly.com");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute( "theme", "github-light");
    anchor.appendChild(script);
  })

  if (meta.private) {
    return (
      <>
        <SectionContainer>
          <main>
            <article className="py-16">
              <Head>
                <title>{meta.title} – Bytesonly</title>
                <meta name="twitter:site" content="@tailwindcss" />
                <meta name="twitter:creator" content="@tailwindcss" />
                <meta name="twitter:title" content={`${meta.title} – Bytesonly.com`} />
                <meta name="twitter:description" content={meta.description} />
                {meta.image ? (
                  <>
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta
                      name="twitter:image"
                      content={`https://blog.tailwindcss.com${meta.image}`}
                    />
                  </>
                ) : (
                  <>
                    <meta name="twitter:card" content="summary" />
                    <meta
                      name="twitter:image"
                      content={`https://blog.tailwindcss.com${smallCard}`}
                    />
                  </>
                )}
                <meta
                  property="og:url"
                  content={`https://blog.tailwindcss.com${router.pathname}`}
                />
                <meta property="og:type" content="article" />
                <meta property="og:title" content={`${meta.title} – Bytesonly.com`} />
                <meta property="og:description" content={meta.description} />
                <meta property="og:image" content={`https://blog.tailwindcss.com${meta.image}`} />
                <meta name="description" content={meta.description}></meta>
              </Head>
              <header className="">
                <div className="text-center">
                  <div className="flex justify-center">
                    <Link href="/">
                      <a className="inline-flex">
                        <span className="sr-only">All posts</span>
                        <TailwindMark className="h-12 w-12" />
                      </a>
                    </Link>
                  </div>
                  <dl className="mt-4 space-y-10">
                    <div>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium text-gray-500">
                        <time dateTime={meta.date}>
                          {postDateTemplate.render(new Date(meta.date))}
                        </time>
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-1">
                    <h1 className="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
                      {meta.title.replace(/ ([^ ]+)$/, '\u00A0$1')}
                    </h1>
                  </div>
                  <dl className="mt-4">
                    <dt className="sr-only">Authors</dt>
                    <dd>
                      <ul className="flex items-center justify-center">
                        {meta.authors.map((author) => (
                          <li key={author.twitter} className="flex items-center space-x-2">
                            <img src={author.avatar} alt="" className="w-8 h-8 rounded-full" />
                            <dl className="text-sm font-medium whitespace-no-wrap">
                              <dt className="sr-only">Name</dt>
                              <dd className="text-gray-900">{author.name}</dd>
                            </dl>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </dl>
                </div>
              </header>
              <div className="mt-12">
                <div className="prose mx-auto">
                  <MDXProvider>{children}</MDXProvider>
                </div>
              </div>
            </article>
          </main>
        </SectionContainer>
      </>
    )
  }

  const postIndex = posts.findIndex((post) => post.link === router.pathname)
  const previous = posts[postIndex + 1]
  const next = posts[postIndex - 1]

  return (
    <>
      <SectionContainer>
        <Header />
      </SectionContainer>
      <SectionContainer>
        <main>
          <article className="xl:divide-y xl:divide-gray-200">
            <Head>
              <title>{meta.title} – bytesonly.com</title>
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:site" content="@bytesonly" />
              <meta name="twitter:creator" content="@bytesonly" />
              <meta name="twitter:title" content={`${meta.title} – Bytesonly`} />
              <meta name="twitter:description" content={meta.description} />
              <meta name="twitter:image" content={`https://blog.tailwindcss.com${meta.image}`} />
              <meta property="og:url" content={`https://blog.tailwindcss.com${router.pathname}`} />
              <meta property="og:type" content="article" />
              <meta property="og:title" content={`${meta.title} – Bytesonly`} />
              <meta property="og:description" content={meta.description} />
              <meta property="og:image" content={`https://blog.tailwindcss.com${meta.image}`} />
              <meta name="description" content={meta.description}></meta>
            </Head>
            <header className="pt-6 xl:pb-10">
              <div className="space-y-1 text-center">
                <dl className="space-y-10">
                  <div>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base leading-6 font-medium text-gray-500">
                      <time dateTime={meta.date}>
                        {postDateTemplate.render(new Date(meta.date))}
                      </time>
                    </dd>
                  </div>
                </dl>
                <div>
                  <PageTitle>{meta.title}</PageTitle>
                </div>
              </div>
            </header>
            <div
              className="divide-y xl:divide-y-0 divide-gray-200 xl:grid xl:grid-cols-4 xl:gap-x-6 pb-16 xl:pb-20"
              style={{ gridTemplateRows: 'auto 1fr' }}
            >
              <dl className="pt-6 pb-10 xl:pt-11 xl:border-b xl:border-gray-200">
                <dt className="sr-only">Authors</dt>
                <dd>
                  <ul className="flex justify-center xl:block space-x-8 sm:space-x-12 xl:space-x-0 xl:space-y-8">
                    {meta.authors.map((author) => (
                      <li key={author.twitter} className="flex items-center space-x-2">
                        <img src={author.avatar} alt="" className="w-10 h-10 rounded-full" />
                        <dl className="text-sm font-medium whitespace-no-wrap">
                          <dt className="sr-only">Name</dt>
                          <dd className="text-gray-900">{author.name}</dd>
                          <dt className="sr-only">Twitter</dt>
                          <dd>
                            <a
                              href={`https://twitter.com/${author.twitter}`}
                              className="text-teal-600 hover:text-teal-700"
                            >
                              @{author.twitter}
                            </a>
                          </dd>
                        </dl>
                      </li>
                    ))}
                  </ul>
                </dd>
              </dl>
              <div className="divide-y divide-gray-200 xl:pb-0 xl:col-span-3 xl:row-span-2">
                <div className="max-w-none pt-10 pb-8">
                  <MDXProvider>{children}</MDXProvider>
                </div>
                <div id="inject-comments-for-uterances"></div>

                {meta.footer && (
                  <div className="pt-6 pb-16" dangerouslySetInnerHTML={{ __html: meta.footer }} />
                )}
                {!meta.footer && meta.discussion && (
                  <div className="pt-6 pb-16">
                    <p>
                      Want to talk about this post?{' '}
                      <a
                        href={meta.discussion}
                        className="font-medium text-teal-600 hover:text-teal-700"
                      >
                        Discuss this on GitHub &rarr;
                      </a>
                    </p>
                                      </div>
                )}
              </div>
              <footer className="text-sm font-medium divide-y divide-gray-200 xl:col-start-1 xl:row-start-2">
                {(next || previous) && (
                  <div className="space-y-8 py-8">
                    {next && (
                      <div>
                        <h2 className="text-xs leading-5 tracking-wide uppercase text-gray-500">
                          Next Article
                        </h2>
                        <div className="text-teal-600 hover:text-teal-700">
                          <Link href={next.link}>
                            <a>{next.title}</a>
                          </Link>
                        </div>
                      </div>
                    )}
                    {previous && (
                      <div>
                        <h2 className="text-xs leading-5 tracking-wide uppercase text-gray-500">
                          Previous Article
                        </h2>
                        <div className="text-teal-600 hover:text-teal-700">
                          <Link href={previous.link}>
                            <a>{previous.title}</a>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="pt-8">
                  <Link href="/">
                    <a className="text-teal-600 hover:text-teal-700 flex">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>Back to the blog</a>
                  </Link>
                </div>
              </footer>
            </div>
          </article>
        </main>
      </SectionContainer>
    </>
  )
}
