import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class todoDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          {/* 변하지 않는 head 또는 script 는 이곳에 넣는다. */}
          {/* 예외 : 타이틀은 _app.js (nextjs 규칙) */}
          <meta httpEquiv="X-UA-Compatible" content="IE=EDGE" />
          {/* IE 캐시 방지 */}
          <meta httpEquiv="Pragma" content="no-cache" />
          <meta httpEquiv="Expires" content="-1" />
          <meta name="format-detection" content="telephone=no" />
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
