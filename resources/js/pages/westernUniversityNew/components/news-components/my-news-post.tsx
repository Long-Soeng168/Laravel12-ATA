import React from 'react';
import { CalendarClock } from 'lucide-react';

const posts = [
  {
    image: 'assets/demo-images/banner5.jpg',
    title: 'Liberal Arts Colleges Rankings',
    description:
      'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
    date: '2 days ago',
  },
  {
    image: 'assets/demo-images/banner3.jpg',
    title: 'Ways Parents and Counselors Can Help Students Earn Scholarships',
    description:
      'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
    date: '2 days ago',
  },
  {
    image: 'assets/demo-images/banner3.jpg',
    title: 'Ways Parents and Counselors Can Help Students Earn Scholarships',
    description:
      'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
    date: '2 days ago',
  },
  {
    image: 'assets/demo-images/banner4.jpg',
    title: 'Ways Parents and Counselors Can Help Students Earn Scholarships',
    description:
      'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
    date: '2 days ago',
  },
  {
    image: 'assets/demo-images/banner3.jpg',
    title: 'Liberal Arts Colleges Rankings',
    description:
      'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
    date: '2 days ago',
  },
  {
    image: 'assets/demo-images/banner3.jpg',
    title: 'Liberal Arts Colleges Rankings',
    description:
      'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
    date: '2 days ago',
  },
  {
    image: 'assets/demo-images/banner5.jpg',
    title: 'Liberal Arts Colleges Rankings',
    description:
      'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
    date: '2 days ago',
  },
  {
    image: 'assets/demo-images/banner3.jpg',
    title: 'Ways Parents and Counselors Can Help Students Earn Scholarships',
    description:
      'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
    date: '2 days ago',
  },
  {
    image: 'assets/demo-images/banner3.jpg',
    title: 'Ways Parents and Counselors Can Help Students Earn Scholarships',
    description:
      'Liberal Arts Colleges emphasize undergraduate education and award at least half of their degrees in the liberal arts fields of study.',
    date: '2 days ago',
  },
];

const MyNewPost = () => {
  return (
    <div className="mx-auto min-h-screen max-w-screen-xl bg-white px-4 py-16 text-center sm:px-8">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <div
            key={index}
            className="overflow-hidden border border-gray-200 bg-white shadow-lg transition hover:scale-[1.01] hover:cursor-pointer"
          >
            <img
              src={post.image}
              alt={post.title}
              width={400}
              height={250}
              className="aspect-video w-full object-cover"
            />
            <div className="p-4 text-start">
              <h2 className="text-xl font-bold text-red-700">{post.title}</h2>
              <p className="my-4 text-sm text-gray-500">{post.description}</p>
              <div className="mt-3 flex items-center text-sm text-blue-950">
                <CalendarClock className="mr-2 h-4 w-4  text-blue-950" />
                <span>{post.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyNewPost;
