const About = () => {
  return (
    <>
      <title>About - PageTurner</title>
      <section className="p-6 md:p-12 max-w-4xl mx-auto">
        <div className="about_banner text-center"></div>
        <h1 className="text-4xl font-bold mb-6 text-gray-800">About Us</h1>

        <p className="text-lg text-gray-700 mb-4">
          <strong>PageTurner Books</strong> is more than just an online
          bookstore — it's a community of readers, learners, and storytellers.
          Since our founding in 2021, we've been dedicated to making reading
          accessible and delightful for everyone.
        </p>

        <p className="text-lg text-gray-700 mb-4">
          Our curated collection spans fiction, non-fiction, academic,
          self-help, children's books, rare finds, and independent publications.
          We partner with both leading publishers and emerging authors to ensure
          our selection is fresh, diverse, and meaningful.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Why Choose Us?
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Wide range of titles in various genres.</li>
              <li>Competitive pricing with frequent discounts.</li>
              <li>Fast & reliable delivery nationwide.</li>
              <li>Support for independent authors and publishers.</li>
              <li>Dedicated customer support team.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Our Mission
            </h2>
            <p className="text-gray-700">
              We believe books change lives. Our mission is to inspire a
              lifelong love of reading by making quality books accessible to
              all, fostering education, imagination, and empathy one page at a
              time.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Join Our Journey
          </h2>
          <p className="text-gray-700">
            Whether you're a passionate reader, a curious learner, or a writer
            looking to share your story — we invite you to be part of the
            PageTurner family. Let’s turn the page to the next great chapter
            together!
          </p>
        </div>
      </section>
    </>
  );
};

export default About;
