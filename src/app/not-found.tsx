export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-white bg-white/3 backdrop-blur-sm">
      <h1 className="md:text-4xl text-2xl font-bold mb-4">404 - Not Found</h1>
      <p className="md:text-lg text-base text-gray-300">ベッドの下を探しましたが、見つかりませんでした。</p>
      <blockquote className="mt-24 md:max-w-xl max-w-[90%] text-sm text-gray-400 border-l-4 border-gray-600 pl-4 italic">
        <p>
          独自の 404 ページをデザインすることは、適度に行うのであれば良いことです。 404 ページをユーモアや思いやりのあるものにすることは自由ですが、ユーザーを混乱させないようにしてください。
        </p>
        <footer className="mt-2 text-xs text-gray-500">
          <a
            href="https://developer.mozilla.org/ja/docs/Web/HTTP/Status/404"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-300"
          >
            MDN Web Docs, HTTP 404
          </a>
          {" "}— CC BY-SA 2.5
        </footer>
      </blockquote>
    </main>
  );
}