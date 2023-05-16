import React from 'react';
import Header from './Header'; 

const CourseDetail = ({ course }) => {
    return (
        <div>
            <Header />
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {course.User.firstName} {course.User.lastName}</p>

                            {course.description.split('\n').map((para, index) => <p key={index}>{para}</p>)}
                            
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {course.materialsNeeded.split('\n').map((material, index) => <li key={index}>{material}</li>)}
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default CourseDetail;
