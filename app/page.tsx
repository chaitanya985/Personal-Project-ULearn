import Image from "next/image";
import SliderMain from "./(components)/SliderMain";
import getAllCourses from "./actions/getAllCourses";
import CourseComponent from "./(components)/CourseComponent";
import myUser from "./actions/getUser";


const images = [
  "/images/a.jpg",
  "/images/b.jpg",
]

interface HomeProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const courses = await getAllCourses(searchParams)
  const currentUser = await myUser();
  
  return (
    <main className="w-[100%]">
      <SliderMain images={images}/>

      <div>
        <h1 className="text-[36px] px-10">Courses</h1>
        <div className="flex flex-wrap px-8">
          {courses.map((item:any)=>(
            <CourseComponent
              key={item.id}
              data={item}
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
