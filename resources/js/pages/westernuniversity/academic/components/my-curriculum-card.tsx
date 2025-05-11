import { Link } from '@inertiajs/react';

export function MyCurriculumCard() {
  const cards = [
    {
      title: 'Quality Education',
      description:
        'Access to quality teachers; Use of quality learning materials and professional development; Quality education is education that focuses on.',
      image: 'assets/demo-images/Quotes1.jpg',
    },
    {
      title: 'Student Engagement',
      description:
        'Creating a learning environment that encourages students to actively participate and stay motivated throughout their educational journey.',
      image: 'assets/demo-images/Quotes1.jpg',
    },
    {
      title: 'Inclusive Learning',
      description:
        'Providing equal learning opportunities for all students regardless of background, ability, or needs.',
      image: 'assets/demo-images/Quotes1.jpg',
    },
  ];

  return (
    <div className="bg-gray-100 py-16">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {cards.map((card, index) => (
            <div
              key={index}
              className="hover:shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full aspect-[4/5] object-cover rounded-2xl"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-700">{card.title}</h3>
                <p className="mt-4 text-gray-600 text-base leading-relaxed">
                  {card.description}
                </p>
                <div className="mt-8">
                  <Link
                    href="#"
                    className="inline-block border-2 border-gray-700 text-gray-700 text-base font-medium px-8 py-3 rounded-md hover:bg-gray-700 hover:text-white transition-colors duration-200"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
