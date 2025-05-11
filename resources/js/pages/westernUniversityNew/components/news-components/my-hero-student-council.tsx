const MyHeroStudentCouncil = () => {
    return (
      <div className="flex flex-col max-w-screen-xl mx-auto px-6 lg:px-0 lg:my-16">
        {/* Hero Image */}
        <div className="w-full">
          <img
            src="/assets/demo-images/StudentCouncil/Student_Council_Main_Officer.jpg"
            className="w-full object-cover aspect-[21/8]"
            alt="Student Council Main Officer"
          />
        </div>
  
        {/* Description Card */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 mt-10 lg:-mt-28">
          <div className="bg-background shadow-lg dark:shadow-foreground/10 rounded-xl max-w-screen-xl mx-auto p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1">
              <h3 className="text-3xl font-bold tracking-tight mb-4">Trusted by</h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                The WIS Student Council (WISSC) is a representative structure through which students can become involved in the affairs of the school, working in partnership with school management and staff, and parents for the benefit of the school and its students. The purpose of the student council shall be to represent the students of their school, and plan, and implement activities to benefit the student body, the school, and the local community. Students have a voice and a contribution to make to their school. It is important that they be given the opportunity to express their views on issues of concern to them in the school. It is equally important that they are listened to and encouraged to take an active part in promoting the aims and objectives of the school.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default MyHeroStudentCouncil;
  