import myUser from "../actions/getUser";
import getCurrUsersCourse from "../actions/getCurrUsersCourse";
import MyCourseClient from "./MyCourseClient";


interface IParams {
    courseId?:string
}

export default async function page({params}: {params:IParams}) {


    const currentUser = await myUser();

    if(!currentUser) {
        return "Page not accessible"
    }
    const courses = await getCurrUsersCourse()

    if(courses.length === 0) {
        return "No courses available to delete"
    }



  return (
    <div className="flex gap-6 px-12 py-8">
        {courses.map((item) => (
            <MyCourseClient
            data={item}
            currentUser={currentUser}
            key={item.id}
            />
        ))}
    </div>
  )
}