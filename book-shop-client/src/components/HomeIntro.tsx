import collectionImg from "../assets/collection.png";
import delivery from "../assets/deliverypng.png";
import trust from "../assets/trust.png";

const HomeIntro = () => {
  const items = [
    {
      title: "Curated Collection",
      desc: "Handpicked books across genres for readers of every kind.",
      img: "../assets/collection.png",
    },
    {
      title: "Fast & Safe Delivery",
      desc: "Nationwide delivery with secure packaging and tracking.",
      img: "/images/deliverybike.png", // replace later
    },
    {
      title: "Trusted by Thousands",
      desc: "Over 10,000 happy readers and growing every day.",
      img: "/images/trust.png", // replace later
    },
  ];
  return (
    <section className="px-6 py-12 bg-gray-50 text-gray-800">
      {/* Welcome Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Welcome to <span className="text-orange-500">PageTurner</span>
        </h1>
        <p className="text-lg leading-relaxed">
          At PageTurner, we believe every great journey begins with a good book.
          Whether you're a casual reader or a passionate bibliophile, our
          carefully curated collection offers something for everyone — from
          timeless classics to the latest bestsellers.
        </p>
        <p className="mt-4 text-base text-gray-600">
          With a user-friendly platform, secure checkout, and fast delivery,
          we’re here to make your reading experience seamless and enjoyable.
          Discover, explore, and fall in love with reading all over again —
          right here at PageTurner.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Curated Collection",
            desc: "Handpicked books across genres for readers of every kind.",
            img: collectionImg,
          },
          {
            title: "Fast & Safe Delivery",
            desc: "Nationwide delivery with secure packaging and tracking.",
            img: delivery, 
          },
          {
            title: "Trusted by Thousands",
            desc: "Over 10,000 happy readers and growing every day.",
            img: trust, 
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition-all text-center"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-16 h-16 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeIntro;
