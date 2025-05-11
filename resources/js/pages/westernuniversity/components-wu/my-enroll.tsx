const MyEnroll = ({enrollYourChild}:{enrollYourChild:any}) => (
    <div className="flex items-center justify-center pt-12 pb-16 md:pt-16">
        <div className="mx-auto w-full max-w-screen-2xl px-6 xl:px-0">
            <h2 className="mt-3 text-center text-3xl tracking-tight text-[#244494] md:text-5xl">{enrollYourChild.title}</h2>
          <div className="mx-auto mt-12 grid max-w-full grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4">

      {
        enrollYourChild?.children?.map((item)=>(
          <div key={item.id} className="flex flex-col items-center">
              <div className="flex h-32 w-32 items-center justify-center rounded-full border border-[#2c318a] bg-gray-100">
                {
                  item?.images?.map((img)=>(
                  <img
                    src={`/assets/images/pages/thumb/${img.image}`}
                    alt="Graduates"
                    className="w-20 transition-all duration-500 hover:scale-110"
                />))
                }
                  
              </div>
              {/* <p className="mt-4 text-2xl font-bold text-red-600">97%</p>
              <div className="mx-auto my-1 h-0.5 w-7 bg-gray-200"></div> */}
              <p className="mt-4 text-sm text-[#244494] sm:text-base">{item.title}</p>
          </div>
        ))
      }
      </div>

           
        </div>
    </div>
);

export default MyEnroll;
