// const timelineData = [
//     { title: '2003', image: '/assets/demo-images/02TimelineIcons/2003.jpg',
//       short1:'Western International School ',
//       description: 'The first Western campus was located in Toul Kourk District and was established on 1 September, 2003, with 262 enrolled Grade 1-12 students. The school ' },
//       { title: '2004', image: '/assets/demo-images/02TimelineIcons/2004.jpg',
//         short1:'K-East Campus (Toul Kork District)',
//         description: 'WIS First Kindergarten Campus ' },
//       { title: '2005', image: '/assets/demo-images/02TimelineIcons/2005.jpg',
//         short1:'Boeungtrabek 1 Campus',
//       },
//       { title: '2006', image: '/assets/demo-images/02TimelineIcons/2006.jpg',
//         short1:'Plaza Campus (Toul Kork District)',
//         description: 'Siem Reap Campus The first Western campus branch outside of Phnom Penh'
//       },
//       { title: '2007', image: '/assets/demo-images/02TimelineIcons/2007.jpg',
//         short1:'De Castle Campus (Toul Kork District)',
//       },
//       { title: '2008', image: '/assets/demo-images/02TimelineIcons/2008.jpg',
//         short1:'TV9 Campus',
//       },
//       { title: '2009', image: '/assets/demo-images/02TimelineIcons/2009.jpg',
//         short1:'K-West Campus',
//       },
//       { title: '2010', image: '/assets/demo-images/02TimelineIcons/2010.jpg',
//         short1:'K-South Campus, East Campus & North Campus',
//       },
//       { title: '2011', image: '/assets/demo-images/02TimelineIcons/2011.jpg',
//         short1:'Antenna Campus',
//       },
//       { title: '2012', image: '/assets/demo-images/02TimelineIcons/2012.jpg',
//         short1:'Northwest Campus & Southwest Campus (Sensok District)',
//       },
//       { title: '2013', image: '/assets/demo-images/02TimelineIcons/2013.jpg',
//         short1:'Takhmao Campus (Kandal District)',
//       },
//       { title: '2014', image: '/assets/demo-images/02TimelineIcons/2014.jpg',
//         short1:'Sunway Campus',
//       },
//       { title: '2015', image: '/assets/demo-images/02TimelineIcons/2015.jpg',
//         short1:'Southwest 2A (Sensok District)',
        
//       },
//       { title: '2016', image: '/assets/demo-images/02TimelineIcons/2016.jpg',
//         short1:'Boeung Chhouk (Sensok District)',
//         description: 'Sihanoukville Campus (Sihanoukville Province)'

//       },
//       { title: '2017', image: '/assets/demo-images/02TimelineIcons/2017.jpg',
//         short1:'Southwest 2B (Sensok District) ',
//         short2:'Beoungtrabek 2 (Chamkarmorn District)',
//       },
//       { title: '2018', image: '/assets/demo-images/02TimelineIcons/2018.jpg',
//         short1:'Doung Ngeap ',
//         short2:'(Sensok District)',
//       },
//       { title: '2019', image: '/assets/demo-images/02TimelineIcons/2019.jpg',
//         short1:'Stadium Main Campus & Toul Sangke Campus',
//       },
//       { title: '2020', image: '/assets/demo-images/02TimelineIcons/2020.jpg',
//         short1:'Chamka Doung Campus',
//       },
//       { title: '2021', image: '/assets/demo-images/02TimelineIcons/2021.jpg',
//         short1:'Boeung Kak Campus',
//       },
//       { title: '2022', image: '/assets/demo-images/02TimelineIcons/2022.jpg',
//         short1:'Chak Angre Campus',
//       },
//       { title: '2023', image: '/assets/demo-images/02TimelineIcons/2023.jpg',
//         short1:'Veal Sbov Campus',
//       },
//   ];
  
  const MyTimeLine = ({timelineData}) => {
    return (
      <div className="container mx-auto px-4 py-16 font-now-alt-regular">
      <h2 className="text-center text-4xl sm:text-5xl font-now-alt-bold text-red-700 mb-16">
        TimeLine
      </h2>

      <div className="relative wrap overflow-hidden">
        {/* Middle Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-red-700/50"></div>

        {timelineData?.children?.map((item,index) => {
          const isLeft = item.id % 2 === 0;

          return (
            <div
              key={item.code}
              className={`mb-20 flex flex-col lg:flex-row items-center justify-between w-full relative ${
                isLeft ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Spacer */}
              <div className="hidden lg:block w-5/12"></div>

              {/* Timeline Dot */}
              <div className="z-20 flex items-center justify-center w-12 h-12 rounded-full bg-red-800 shadow-xl absolute lg:static left-1/2 transform -translate-x-1/2 lg:translate-x-0">
                <span className="text-white font-bold">{index + 1}</span>
              </div>

              {/* Content Box */}
              <div className="w-full lg:w-5/12 mt-10 lg:mt-0 bg-gray-900 rounded-2xl shadow-xl px-6 py-6 lg:px-8 lg:py-6 flex flex-col lg:flex-row gap-6">
                {isLeft ? (
                  <>
                    <div className="text-white flex-1">
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-lg font-semibold mb-2 whitespace-pre-line">{item.short_description}</p>
                      <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.long_description }}></p>
                    </div>
                    <div className="flex-1 ">
                    {item?.images?.map((item, index) => (
                        <img
                            key={item.id}
                            src={`/assets/images/pages/thumb/${item.image}`}
                            alt={`Our Vision Image ${index + 1}`}
                             className="w-full aspect-square object-cover rounded-2xl"
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-1 ">
                    {item?.images?.map((item, index) => (
                        <img
                            key={item.id}
                            src={`/assets/images/pages/thumb/${item.image}`}
                            alt={`Our Vision Image ${index + 1}`}
                             className="w-full aspect-square object-cover rounded-2xl"
                        />
                      ))}
                    </div>
                    <div className="text-white flex-1">
                      <h3 className="text-xl font-bold mb-1 whitespace-pre-line">{item.title}</h3>
                      <p className="text-lg font-semibold mb-2">{item.short_description}</p>
                      
                      <p className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: item.long_description }}></p>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    );
  };
  
  export default MyTimeLine;
  