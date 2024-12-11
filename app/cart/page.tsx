import CourseComponent from "../(components)/CourseComponent";
import getBasketItem from "../actions/getBasketItem";
import myUser from "../actions/getUser";

export default async function page() {
    const courses = await getBasketItem();
    const currentUser = await myUser();

    return (
        <div>
            <div className="p-12 flex gap-2 flex-wrap">
                {courses.map((item:any)=>(
                    <CourseComponent
                    key={item.id}
                    currentUser={currentUser}
                    data={item}
                    />
                ))}
            </div>
        </div>
    )
}